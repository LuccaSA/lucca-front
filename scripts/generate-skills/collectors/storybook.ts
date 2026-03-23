import { Config, StorybookDocsEntry, StorybookGroup, StorybookStory } from '../types';

export async function fetchStorybookIndex(config: Config): Promise<Map<string, StorybookGroup>> {
	console.log('📚 Fetching Storybook index...');

	const res = await fetch(config.storybook.indexUrl);
	if (!res.ok) {
		throw new Error(`Storybook index HTTP ${res.status}: ${config.storybook.indexUrl}`);
	}

	const data = await res.json();
	const entries: any[] = Object.values(data.entries || {});

	console.log(`  ${entries.length} Storybook entries found`);

	return groupStoriesByComponent(entries, config.storybook.baseUrl);
}

function groupStoriesByComponent(entries: any[], baseUrl: string): Map<string, StorybookGroup> {
	const groups = new Map<string, StorybookGroup>();

	for (const entry of entries) {
		const { title, type, id, importPath, componentPath, name } = entry;

		// Documentation stories only (not QA)
		if (!title?.startsWith('Documentation/')) continue;

		// "Documentation/Actions/Button/Angular/AI"    → segment before "/Angular"
		// "Documentation/Overlays/Tooltip/Basic"       → segment before the generic suffix (→ "Tooltip")
		// "Documentation/Forms/Time/Duration Picker/Angular Form" → segment before "Angular Form" (→ "Duration Picker")
		// "Documentation/Forms/Date/Calendar"          → last segment (→ "Calendar")
		const parts: string[] = title.split('/');
		if (parts.length < 3) continue;

		// Generic suffixes indicating the last segment is a variant/framework, not the component name
		const GENERIC_SUFFIX_RE = /^(basic|html|css|html&css|htmlcss|docs?|vertical|horizontal|progress|dashed|checked|outlined|angular.*)$/i;

		const angularIdx = parts.indexOf('Angular');
		let componentName: string;
		if (angularIdx > 0) {
			// Standard case: ".../ComponentName/Angular[/StoryVariant]"
			componentName = parts[angularIdx - 1].trim();
		} else if (parts.length > 3 && GENERIC_SUFFIX_RE.test(parts[parts.length - 1].trim())) {
			// Non-standard case: ".../ComponentName/Variant" (Tooltip/Basic, Timelines/Vertical, Duration Picker/Angular Form…)
			componentName = parts[parts.length - 2].trim();
		} else {
			// Docs or single-story: last segment = component name
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
			// Keep the first docs entry as the canonical URL
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
				componentPath,
				framework: importPath?.includes('/angular/') ? 'angular' : 'html-css',
			} as StorybookStory);
		}
	}

	return groups;
}

function normalizeName(name: string): string {
	return name
		.toLowerCase()
		.replace(/^pr-/, '') // in case a story has the pr- prefix
		.replace(/\s*\(v\d+[\d.]*\)\s*/g, '')
		.replace(/[^\w\s-]/gu, '')
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '');
}
