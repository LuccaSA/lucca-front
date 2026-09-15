import { StorybookDocsEntry, StorybookGroup, StorybookStory, VersionConfig } from '../types';
import { fetchWithTimeout } from './http';

/**
 * Fetches the Storybook index.json for a specific version and groups stories by component.
 *
 * @param version — Resolved version config with storybookBaseUrl
 */
export async function fetchStorybookIndex(version: VersionConfig): Promise<Map<string, StorybookGroup>> {
	const indexUrl = `${version.storybookBaseUrl}/index.json`;
	console.log(`📚 Fetching Storybook index for ${version.tag}...`);

	const res = await fetchWithTimeout(indexUrl);
	if (!res.ok) {
		throw new Error(`Storybook index HTTP ${res.status}: ${indexUrl}`);
	}

	const data = await res.json();
	const entries: any[] = Object.values(data.entries || {});

	console.log(`  ${entries.length} Storybook entries found`);

	return groupStoriesByComponent(entries, version.storybookBaseUrl);
}

const GENERIC_SUFFIX_RE = /^(basic|html|css|html&css|htmlcss|docs?|vertical|horizontal|progress|dashed|checked|outlined|angular.*)$/i;

/**
 * Index of the segment of a Storybook title that names the component.
 *
 * Shared by the grouping and by `restrictToStoryFamily`, which must agree on where a family
 * starts: reading `storybookPath` as a plain prefix instead cut `data-table` down from 30 stories
 * to 1, because the map records the full title of one story
 * (`Documentation/Listings/Data table/Angular/Basic`), not the family root.
 */
function componentSegmentIndex(parts: string[]): number {
	const angularIdx = parts.indexOf('Angular');
	const htmlCssIdx = parts.findIndex((p) => /^HTML[&\s]*CSS$/i.test(p));
	const frameworkIdx = angularIdx > 0 ? angularIdx : htmlCssIdx > 0 ? htmlCssIdx : -1;

	if (frameworkIdx > 0) return frameworkIdx - 1;
	if (parts.length > 3 && GENERIC_SUFFIX_RE.test(parts[parts.length - 1].trim())) return parts.length - 2;
	return parts.length - 1;
}

function groupStoriesByComponent(entries: any[], baseUrl: string): Map<string, StorybookGroup> {
	const groups = new Map<string, StorybookGroup>();

	for (const entry of entries) {
		const { title, type, id, importPath, name } = entry;

		if (!title?.startsWith('Documentation/')) continue;

		const parts: string[] = title.split('/');
		if (parts.length < 3) continue;

		const componentIdx = componentSegmentIndex(parts);
		const componentName = parts[componentIdx].trim();
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
				};
			}
		} else if (type === 'story') {
			const { framework, confident } = classifyFramework(importPath, parts);
			group.stories.push({
				id,
				name,
				title,
				url: `${baseUrl}/?path=/story/${id}`,
				importPath,
				framework,
				frameworkConfident: confident,
			});
		}
	}

	return groups;
}

/**
 * Decides whether a story documents the Angular API or the raw HTML/CSS one.
 *
 * The Storybook index carries no story source, so only two signals are available here — and both
 * can be absent. A story file living directly under its component folder (neither `angular/` nor
 * `html&css/`) whose title has no framework segment is NOT html-css by default: that assumption is
 * what filed Angular stories under `## HTML/CSS` and concatenated their TypeScript imports into
 * the SCSS block. Such a story is returned as `confident: false` so that `resolveStoryFrameworks()`
 * (story-source.ts) can settle it from the file contents.
 */
export function classifyFramework(
	importPath: string | undefined,
	titleParts: string[],
): { framework: 'angular' | 'html-css'; confident: boolean } {
	// Tier 1 — story folder layout. Authoritative whenever the split is in place.
	if (importPath) {
		if (importPath.includes('/angular/')) return { framework: 'angular', confident: true };
		if (/\/html\s*&\s*css\//i.test(importPath)) return { framework: 'html-css', confident: true };
	}

	// Tier 2 — framework segment of the Storybook title (`Documentation/Overlays/Dialog/Angular`).
	for (const part of titleParts) {
		const p = part.trim();
		if (/^Angular$/i.test(p)) return { framework: 'angular', confident: true };
		if (/^HTML[&\s]*CSS$/i.test(p)) return { framework: 'html-css', confident: true };
	}

	// Tier 3 — undecidable from the index. Kept as the historical default, flagged as a guess.
	return { framework: 'html-css', confident: false };
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

/**
 * Narrows a Storybook group to the story family the component map declares.
 *
 * `groupStoriesByComponent` keys a group on the component segment of the title, so two unrelated
 * families whose last-but-one segment happens to match collapse into one. That is how the
 * `checkbox` page came to document `Documentation/Forms/FiltersPills/Checkbox/Angular` — a filter
 * pill — under `## Angular`, next to the real `Documentation/Forms/Checkbox/Basic` markup, with a
 * Storybook link pointing at neither.
 *
 * Opt-in: only a `storybookFamily` declared in `component-metadata.json` narrows a group. Collapsing
 * several families of the *same* component is the useful default — `Documentation/Forms/Date2/DateInput`
 * and `Documentation/Forms/Fields/DateInput/Angular` both belong on the `dateinput` page — so filtering
 * on the auto-discovered docs title instead would discard legitimate stories.
 *
 * The declared value is cut at the component segment, the same rule the grouping uses, rather than
 * taken as a literal prefix: `Documentation/Actions/Button/Angular` keeps its HTML&CSS siblings.
 *
 * If the filter would leave nothing, the group is returned untouched and a warning is printed: a
 * `storybookPath` that has drifted must not silently empty a page.
 */
export function restrictToStoryFamily(group: StorybookGroup | null, storybookFamily: string | undefined, slug: string): StorybookGroup | null {
	if (!group || !storybookFamily) return group;

	const parts = storybookFamily.split('/').map((p) => p.trim());
	if (parts.length < 2) return group;
	const root = parts.slice(0, componentSegmentIndex(parts) + 1).join('/');
	if (!root) return group;

	const belongs = (title: string) => title === root || title.startsWith(`${root}/`);
	const stories = group.stories.filter((s) => belongs(s.title));
	if (stories.length === 0) {
		if (group.stories.length > 0) {
			console.warn(`   ⚠️  ${slug} : storybookFamily "${storybookFamily}" ne correspond à aucune story du groupe — filtre ignoré`);
		}
		return group;
	}
	if (stories.length === group.stories.length) return group;

	const dropped = group.stories.length - stories.length;
	console.log(`   ↳ ${slug} : ${dropped} story(ies) hors famille "${root}" écartée(s)`);
	return {
		...group,
		stories,
		docsEntry: group.docsEntry && belongs(group.docsEntry.title) ? group.docsEntry : null,
	};
}
