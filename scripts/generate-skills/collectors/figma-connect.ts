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
import { TransientFetchError } from './fetch-failures';

const FIGMA_API_BASE = 'https://api.figma.com/v1';
/**
 * Figma's REST rate limit is per-time-window (requests/min) and stateful, not a concurrent-
 * connection cap — so throttling by concurrency alone doesn't prevent 429s. The reliable recipe:
 *   • serialize (1 in-flight) + a minimum interval between request starts → stay under the quota;
 *   • honour the server's Retry-After and retry generously → survive the whole throttling window.
 * Every node then eventually succeeds within the run (output complete & reproducible). All three
 * are overridable via env for tuning.
 */
const MAX_RETRIES = Math.max(1, Number(process.env.FIGMA_MAX_RETRIES) || 10);
const MAX_CONCURRENT = Math.max(1, Number(process.env.FIGMA_MAX_CONCURRENT) || 1);
const MIN_INTERVAL_MS = Number(process.env.FIGMA_MIN_INTERVAL_MS) || 200;

/**
 * Process-wide cache of fetched node responses, keyed by `fileKey:nodeId`.
 * Figma is unversioned, so the same node is requested once per version (15×) during a
 * full run — the cache collapses that to a single network call and keeps link emission
 * consistent across versions. A failed fetch is NOT cached, so a later version can retry.
 */
const figmaCache = new Map<string, FigmaDesignTokens | null>();

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// ── Throttle: cap concurrency AND space request starts by a minimum interval ─────
let active = 0;
const waiters: (() => void)[] = [];
let nextAllowedStart = 0;

async function acquire(): Promise<void> {
	if (active < MAX_CONCURRENT) {
		active++;
	} else {
		await new Promise<void>((resolve) => waiters.push(resolve));
		active++;
	}
	// Pace request starts: never fire two within MIN_INTERVAL_MS of each other.
	const now = Date.now();
	const wait = Math.max(0, nextAllowedStart - now);
	nextAllowedStart = Math.max(now, nextAllowedStart) + MIN_INTERVAL_MS;
	if (wait > 0) await sleep(wait);
}
function release(): void {
	active--;
	waiters.shift()?.();
}

interface FigmaResult {
	ok: boolean;
	json?: any;
	status?: string;
	reason?: string;
}

/**
 * One throttled Figma request. Retries 429 / 5xx / network errors with backoff (honouring
 * `Retry-After`). Returns the parsed JSON on success, or a failure when retries are exhausted.
 * A non-retryable HTTP status (e.g. 403) is returned as a failure too (caller decides).
 */
async function figmaRequest(url: string, token: string): Promise<FigmaResult> {
	let lastStatus = 'unknown';
	let lastReason = '';

	for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
		await acquire();
		let response: Response;
		try {
			response = await fetch(url, { headers: { 'X-Figma-Token': token } });
		} catch (err: any) {
			release();
			lastStatus = 'network';
			lastReason = err?.message ?? 'fetch failed';
			if (attempt >= MAX_RETRIES) break;
			console.warn(`  ⏳ Figma réseau — retry ${attempt + 1}/${MAX_RETRIES}`);
			await sleep(Math.min(1000 * 2 ** attempt, 30000));
			continue;
		}
		release();

		if (response.ok) return { ok: true, json: await response.json() };

		lastStatus = String(response.status);
		lastReason = response.statusText || 'HTTP error';

		const retryable = response.status === 429 || response.status >= 500;
		if (!retryable || attempt >= MAX_RETRIES) return { ok: false, status: lastStatus, reason: lastReason };

		const retryAfter = Number(response.headers.get('retry-after'));
		const backoffMs = retryAfter > 0 ? retryAfter * 1000 : Math.min(1000 * 2 ** attempt, 30000);
		console.warn(`  ⏳ Figma ${response.status} — retry ${attempt + 1}/${MAX_RETRIES} in ${Math.round(backoffMs / 1000)}s`);
		await sleep(backoffMs);
	}

	return { ok: false, status: lastStatus, reason: lastReason };
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

	const res = await figmaRequest(url, token);

	if (!res.ok) {
		if (res.status === '404') {
			figmaCache.set(cacheKey, null); // definitive: node doesn't exist, don't retry
			return null;
		}
		// transient (429/5xx/network exhausted) or non-retryable error: NOT cached, surfaced as a failure
		throw new TransientFetchError(res.status ?? 'unknown', `Figma node ${nodeId}: ${res.reason ?? 'erreur'} (après ${MAX_RETRIES} retries)`);
	}

	const data = res.json as FigmaNodeResponse;
	const nodeData = data.nodes[nodeId];

	if (!nodeData?.document) {
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
