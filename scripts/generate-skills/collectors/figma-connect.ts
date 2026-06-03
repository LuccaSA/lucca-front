/**
 * Figma Code Connect context collector.
 *
 * Fetches structured component metadata (variant properties, descendant tree)
 * from the Figma REST API. This data feeds `*.figma.md` files.
 *
 * UNVERSIONED — Figma has no release concept; we snapshot the current state
 * at generation time. Output goes to `references/components/<slug>/`.
 *
 * Uses the Figma REST API `GET /v1/files/:key/nodes` with the component node IDs,
 * then parses the componentPropertyDefinitions for variant options.
 */

import { FigmaDesignTokens, FigmaProperty } from '../types';

const FIGMA_API_BASE = 'https://api.figma.com/v1';

/**
 * Process-wide cache of fetched node responses, keyed by `fileKey:nodeId`.
 * Figma is unversioned, so the same node is requested once per version (15×) during a
 * full run — the cache collapses that to a single network call and keeps link emission
 * consistent across versions. A failed fetch is NOT cached, so a later version can retry.
 */
const figmaCache = new Map<string, FigmaDesignTokens | null>();

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Fetches a Figma URL, retrying on 429 (Too Many Requests) with backoff that honours the
 * `Retry-After` header. Returns the final Response (caller handles non-429 errors).
 */
async function figmaFetch(url: string, token: string, maxRetries = 6): Promise<Response> {
	for (let attempt = 0; ; attempt++) {
		const response = await fetch(url, { headers: { 'X-Figma-Token': token } });
		if (response.status !== 429 || attempt >= maxRetries) return response;

		const retryAfter = Number(response.headers.get('retry-after'));
		const backoffMs = retryAfter > 0 ? retryAfter * 1000 : Math.min(1000 * 2 ** attempt, 30000);
		console.warn(`  ⏳ Figma 429 — retry ${attempt + 1}/${maxRetries} in ${Math.round(backoffMs / 1000)}s`);
		await sleep(backoffMs);
	}
}

interface FigmaNodeResponse {
	nodes: Record<
		string,
		{
			document: {
				name: string;
				type: string;
				componentPropertyDefinitions?: Record<
					string,
					{
						type: string;
						defaultValue: string;
						variantOptions?: string[];
					}
				>;
			};
		}
	>;
}

/**
 * Fetches Figma design tokens for a component.
 *
 * @param fileKey — Figma file key (e.g. "PQEOcUF9CYfKNqaejAGLWP")
 * @param nodeId — Node ID of the component set (e.g. "6854:42773")
 * @param token — Figma Personal Access Token
 */
export async function fetchFigmaDesignTokens(fileKey: string, nodeId: string, token: string): Promise<FigmaDesignTokens | null> {
	const cacheKey = `${fileKey}:${nodeId}`;
	if (figmaCache.has(cacheKey)) return figmaCache.get(cacheKey)!;

	const url = `${FIGMA_API_BASE}/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId)}`;

	const response = await figmaFetch(url, token);

	if (!response.ok) {
		if (response.status === 404) {
			figmaCache.set(cacheKey, null); // definitive: node doesn't exist, don't retry
		} else {
			// transient (429 exhausted, 5xx…): do NOT cache, let a later version retry
			console.warn(`  ⚠️  Figma API error for node ${nodeId}: ${response.status} ${response.statusText}`);
		}
		return null;
	}

	const data = (await response.json()) as FigmaNodeResponse;
	const nodeData = data.nodes[nodeId];

	if (!nodeData?.document) {
		console.warn(`  ⚠️  Figma node ${nodeId} not found in response`);
		figmaCache.set(cacheKey, null); // definitive: node absent from a 200 response
		return null;
	}

	const doc = nodeData.document;
	const propDefs = doc.componentPropertyDefinitions;

	const result: FigmaDesignTokens = {
		componentName: doc.name,
		nodeId,
		properties: propDefs
			? Object.entries(propDefs).map(([name, def]) => ({
					name: cleanPropertyName(name),
					type: mapFigmaType(def.type),
					variantOptions: def.variantOptions ?? undefined,
				}))
			: [],
	};

	figmaCache.set(cacheKey, result);
	return result;
}

/**
 * Fetches Figma tokens for multiple node IDs (e.g. when a component has aliases).
 * Merges properties from all nodes, deduplicating by name.
 */
export async function fetchFigmaDesignTokensMulti(
	fileKey: string,
	nodeIds: string[],
	token: string,
): Promise<FigmaDesignTokens | null> {
	if (nodeIds.length === 0) return null;

	// Batch request — Figma API supports comma-separated IDs
	const url = `${FIGMA_API_BASE}/files/${fileKey}/nodes?ids=${nodeIds.map(encodeURIComponent).join(',')}`;

	const response = await fetch(url, {
		headers: { 'X-Figma-Token': token },
	});

	if (!response.ok) {
		console.warn(`  ⚠️  Figma API error: ${response.status} ${response.statusText}`);
		return null;
	}

	const data = (await response.json()) as FigmaNodeResponse;
	const allProperties = new Map<string, FigmaProperty>();
	let componentName = '';

	for (const nodeId of nodeIds) {
		const nodeData = data.nodes[nodeId];
		if (!nodeData?.document) continue;

		if (!componentName) componentName = nodeData.document.name;

		const propDefs = nodeData.document.componentPropertyDefinitions;
		if (!propDefs) continue;

		for (const [name, def] of Object.entries(propDefs)) {
			const cleanName = cleanPropertyName(name);
			if (!allProperties.has(cleanName)) {
				allProperties.set(cleanName, {
					name: cleanName,
					type: mapFigmaType(def.type),
					variantOptions: def.variantOptions ?? undefined,
				});
			}
		}
	}

	if (!componentName) return null;

	return {
		componentName,
		nodeId: nodeIds[0],
		properties: [...allProperties.values()],
	};
}

/**
 * Clean Figma property names.
 * Figma appends "#123:456" suffixes to disambiguate properties — strip them.
 */
function cleanPropertyName(name: string): string {
	return name.replace(/#[\d:]+$/, '').trim();
}

function mapFigmaType(figmaType: string): FigmaProperty['type'] {
	switch (figmaType) {
		case 'VARIANT':
			return 'VARIANT';
		case 'TEXT':
			return 'TEXT';
		case 'INSTANCE_SWAP':
			return 'INSTANCE_SWAP';
		case 'BOOLEAN':
			return 'BOOLEAN';
		default:
			return 'VARIANT';
	}
}
