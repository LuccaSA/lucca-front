import { Config, FigmaComponent, FigmaGroup } from '../types';

const FIGMA_API = 'https://api.figma.com/v1';

export async function fetchFigmaComponents(config: Config): Promise<FigmaComponent[]> {
	const { token, fileKey, nodeId } = config.figma;

	console.log('📐 Récupération des composants Figma...');

	// Vérification du nœud de départ
	const startNodeKey = nodeId.replace('-', ':');
	const nodeRes = await figmaFetch(`${FIGMA_API}/files/${fileKey}/nodes?ids=${encodeURIComponent(startNodeKey)}`, token);
	const startNode = nodeRes.nodes?.[startNodeKey];
	if (startNode) {
		console.log(`  Nœud de départ : "${startNode.document?.name}" (${nodeId})`);
	} else {
		console.warn(`  ⚠️  Nœud ${nodeId} introuvable — vérifiez config.figma.nodeId`);
	}

	// Récupération de tous les composants du fichier
	const data = await figmaFetch(`${FIGMA_API}/files/${fileKey}/components`, token);
	const components: any[] = data.meta?.components || [];

	console.log(`  ${components.length} composants trouvés dans Figma`);

	return components.map((comp) => ({
		id: comp.key,
		nodeId: comp.node_id,
		name: comp.name,
		description: comp.description || '',
		pageName: comp.containing_frame?.pageName || '',
		sectionName: comp.containing_frame?.name || '',
		componentSetName: comp.containing_frame?.containingStateGroup?.name || comp.containing_frame?.name || comp.name,
		nodeUrl: `https://www.figma.com/design/${fileKey}?node-id=${comp.node_id.replace(':', '-')}`,
	}));
}

export function groupFigmaComponentsBySet(components: FigmaComponent[]): Map<string, FigmaGroup> {
	const groups = new Map<string, FigmaGroup>();

	for (const comp of components) {
		const key = comp.componentSetName.split('/')[0].trim();

		if (!groups.has(key)) {
			groups.set(key, {
				figmaName: key,
				slug: key,
				components: [],
				nodeUrl: comp.nodeUrl,
				description: comp.description,
			});
		}

		const group = groups.get(key)!;
		group.components.push(comp);

		if (!group.description && comp.description) {
			group.description = comp.description;
		}
	}

	return groups;
}

export function normalizeName(name: string): string {
	return name
		.replace(/^pr-/i, '') // strip le préfixe Prisme "pr-"
		.replace(/\s*\(v\d+[\d.]*\)\s*/g, '') // strip les versions "(v19.3)", "(v21.0)"
		.replace(/\s*\(\d+\)\s*/g, '') // strip les dimensions "(1600)", "(360)", "(768)"
		.replace(/\s*🧪.*$|🧩.*$|🎨.*$|🎉.*$|🚧.*$/u, '') // strip les emojis de statut en fin
		.replace(/([a-z])([A-Z])/g, '$1 $2') // split CamelCase : "AppLayout" → "App Layout"
		.replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2') // split acronymes : "HTMLPage" → "HTML Page"
		.toLowerCase()
		.replace(/[^\w\s-]/gu, '') // strip les autres caractères spéciaux
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '');
}

async function figmaFetch(url: string, token: string): Promise<any> {
	const res = await fetch(url, {
		headers: { 'X-Figma-Token': token },
	});

	if (!res.ok) {
		const body = await res.text();
		throw new Error(`Figma API ${res.status} sur ${url}: ${body}`);
	}

	return res.json();
}
