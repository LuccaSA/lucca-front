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
	const url = `${FIGMA_API_BASE}/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId)}`;

	const response = await fetch(url, {
		headers: {
			'X-Figma-Token': token,
		},
	});

	if (!response.ok) {
		if (response.status === 404) return null;
		console.warn(`  ⚠️  Figma API error for node ${nodeId}: ${response.status} ${response.statusText}`);
		return null;
	}

	const data = (await response.json()) as FigmaNodeResponse;
	const nodeData = data.nodes[nodeId];

	if (!nodeData?.document) {
		console.warn(`  ⚠️  Figma node ${nodeId} not found in response`);
		return null;
	}

	const doc = nodeData.document;
	const propDefs = doc.componentPropertyDefinitions;

	if (!propDefs) {
		return {
			componentName: doc.name,
			nodeId,
			properties: [],
		};
	}

	const properties: FigmaProperty[] = Object.entries(propDefs).map(([name, def]) => ({
		name: cleanPropertyName(name),
		type: mapFigmaType(def.type),
		variantOptions: def.variantOptions ?? undefined,
	}));

	return {
		componentName: doc.name,
		nodeId,
		properties,
	};
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
