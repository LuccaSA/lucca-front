import { Config, StorybookDocsEntry, StorybookGroup, StorybookStory } from '../types';

export async function fetchStorybookIndex(config: Config): Promise<Map<string, StorybookGroup>> {
	console.log("📚 Récupération de l'index Storybook...");

	const res = await fetch(config.storybook.indexUrl);
	if (!res.ok) {
		throw new Error(`Storybook index HTTP ${res.status}: ${config.storybook.indexUrl}`);
	}

	const data = await res.json();
	const entries: any[] = Object.values(data.entries || {});

	console.log(`  ${entries.length} entrées Storybook trouvées`);

	return groupStoriesByComponent(entries, config.storybook.baseUrl);
}

function groupStoriesByComponent(entries: any[], baseUrl: string): Map<string, StorybookGroup> {
	const groups = new Map<string, StorybookGroup>();

	for (const entry of entries) {
		const { title, type, id, importPath, componentPath, name } = entry;

		// Uniquement les stories Documentation (pas QA)
		if (!title?.startsWith('Documentation/')) continue;

		// "Documentation/Actions/Button/Angular/AI"    → segment avant "/Angular"
		// "Documentation/Overlays/Tooltip/Basic"       → segment avant le suffixe générique (→ "Tooltip")
		// "Documentation/Forms/Time/Duration Picker/Angular Form" → segment avant "Angular Form" (→ "Duration Picker")
		// "Documentation/Forms/Date/Calendar"          → dernier segment (→ "Calendar")
		const parts: string[] = title.split('/');
		if (parts.length < 3) continue;

		// Suffixes génériques qui indiquent que le dernier segment est un variant/framework, pas le composant
		const GENERIC_SUFFIX_RE = /^(basic|html|css|html&css|htmlcss|docs?|vertical|horizontal|progress|dashed|checked|outlined|angular.*)$/i;

		const angularIdx = parts.indexOf('Angular');
		let componentName: string;
		if (angularIdx > 0) {
			// Cas standard : ".../ComponentName/Angular[/StoryVariant]"
			componentName = parts[angularIdx - 1].trim();
		} else if (parts.length > 3 && GENERIC_SUFFIX_RE.test(parts[parts.length - 1].trim())) {
			// Cas non-standard : ".../ComponentName/Variant" (Tooltip/Basic, Timelines/Vertical, Duration Picker/Angular Form…)
			componentName = parts[parts.length - 2].trim();
		} else {
			// Docs ou single-story : dernier segment = nom du composant
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
			// On garde la première entrée docs comme URL canonique
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
		.replace(/^pr-/, '') // au cas où une story aurait le préfixe pr-
		.replace(/\s*\(v\d+[\d.]*\)\s*/g, '')
		.replace(/[^\w\s-]/gu, '')
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '')
		.replace(/-+/g, '-')
		.replace(/^-|-$/g, '');
}
