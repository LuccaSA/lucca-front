import { StorybookDocsEntry, StorybookGroup, StorybookStory, VersionConfig } from '../types';

/**
 * Fetches the Storybook index.json for a specific version and groups stories by component.
 *
 * @param version — Resolved version config with storybookBaseUrl
 */
export async function fetchStorybookIndex(version: VersionConfig): Promise<Map<string, StorybookGroup>> {
	const indexUrl = `${version.storybookBaseUrl}/index.json`;
	console.log(`📚 Fetching Storybook index for ${version.tag}...`);

	const res = await fetch(indexUrl);
	if (!res.ok) {
		throw new Error(`Storybook index HTTP ${res.status}: ${indexUrl}`);
	}

	const data = await res.json();
	const entries: any[] = Object.values(data.entries || {});

	console.log(`  ${entries.length} Storybook entries found`);

	return groupStoriesByComponent(entries, version.storybookBaseUrl);
}

function groupStoriesByComponent(entries: any[], baseUrl: string): Map<string, StorybookGroup> {
	const groups = new Map<string, StorybookGroup>();

	for (const entry of entries) {
		const { title, type, id, importPath, name } = entry;

		if (!title?.startsWith('Documentation/')) continue;

		const parts: string[] = title.split('/');
		if (parts.length < 3) continue;

		const GENERIC_SUFFIX_RE = /^(basic|html|css|html&css|htmlcss|docs?|vertical|horizontal|progress|dashed|checked|outlined|angular.*)$/i;

		// Find the framework segment index to get the component name before it
		const angularIdx = parts.indexOf('Angular');
		const htmlCssIdx = parts.findIndex((p) => /^HTML[&\s]*CSS$/i.test(p));
		const frameworkIdx = angularIdx > 0 ? angularIdx : htmlCssIdx > 0 ? htmlCssIdx : -1;

		let componentName: string;
		if (frameworkIdx > 0) {
			componentName = parts[frameworkIdx - 1].trim();
		} else if (parts.length > 3 && GENERIC_SUFFIX_RE.test(parts[parts.length - 1].trim())) {
			componentName = parts[parts.length - 2].trim();
		} else {
			componentName = parts[parts.length - 1].trim();
		}
		const key = normalizeName(componentName);
		const category = parts[1].trim();

		if (!groups.has(key)) {
			groups.set(key, {
				storybookName: componentName,
				slug: key,
				category,
				stories: [],
				docsEntry: null,
			});
		}

		const group = groups.get(key)!;

		if (type === 'docs') {
			if (!group.docsEntry) {
				group.docsEntry = {
					id,
					title,
					url: `${baseUrl}/?path=/docs/${id}`,
				} as StorybookDocsEntry;
			}
		} else if (type === 'story') {
			group.stories.push({
				id,
				name,
				title,
				url: `${baseUrl}/?path=/story/${id}`,
				importPath,
				framework: importPath?.includes('/angular/') ? 'angular' : 'html-css',
			} as StorybookStory);
		}
	}

	return groups;
}

function normalizeName(name: string): string {
	return name
		.toLowerCase()
		.replace(/^pr-/i, '')
		.replace(/\s*\(v\d+[\d.]*\)\s*/g, '')
		.replace(/[^\w\s-]/gu, '')
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '');
}
