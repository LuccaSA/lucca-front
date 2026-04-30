import fs from 'fs';
import path from 'path';
import { normalizeName } from '../collectors/figma';
import { ComponentMap, ComponentMapEntry, ComponentMapValue, FigmaGroup, FigmaOnlyEntry, MatchResult, MatchedEntry, StorybookGroup, StorybookOnlyEntry } from '../types';

export const MAP_PATH = path.join(__dirname, '..', 'component-map.json');

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function loadComponentMap(): ComponentMap {
	if (!fs.existsSync(MAP_PATH)) return {};
	try {
		const raw = fs.readFileSync(MAP_PATH, 'utf-8').replace(/^\uFEFF/, '');
		return JSON.parse(raw);
	} catch {
		return {};
	}
}

function saveComponentMap(map: ComponentMap): void {
	// Sort keys alphabetically for a readable diff
	const sorted = Object.fromEntries(Object.entries(map).sort(([a], [b]) => a.localeCompare(b)));
	fs.writeFileSync(MAP_PATH, JSON.stringify(sorted, null, 2) + '\n', 'utf-8');
}

// ─── Main matching ──────────────────────────────────────────────────────────────

export function matchComponents(figmaGroups: Map<string, FigmaGroup>, storybookGroups: Map<string, StorybookGroup>, componentMap: ComponentMap): MatchResult {
	const matched: MatchedEntry[] = [];
	const figmaOnly: FigmaOnlyEntry[] = [];

	for (const [figmaKey, figmaData] of figmaGroups) {
		if (!(figmaKey in componentMap)) {
			// New Figma component with no entry in the map
			figmaOnly.push({ slug: figmaKey, figma: figmaData, reason: 'new' });
			continue;
		}

		const sbValue = componentMap[figmaKey];

		if (!sbValue) {
			// Intentionally unmapped (null in the map)
			figmaOnly.push({ slug: figmaKey, figma: figmaData, reason: 'unmapped' });
			continue;
		}

		// Supports both formats: string "button" or object { slug: "button", storybook: "..." }
		// and arrays for the 1-to-n case
		const normalizeEntry = (v: string | ComponentMapEntry): string | null => (typeof v === 'object' && v !== null && !Array.isArray(v) ? v.slug : (v as string));
		const rawSlugs = Array.isArray(sbValue) ? sbValue : [sbValue as string | ComponentMapEntry];
		const slugs = rawSlugs.map(normalizeEntry).filter(Boolean) as string[];
		const primarySlug = slugs[0];

		if (!storybookGroups.has(primarySlug)) {
			figmaOnly.push({ slug: figmaKey, figma: figmaData, reason: `storybook-not-found:${primarySlug}` });
			continue;
		}

		const entry: MatchedEntry = {
			slug: primarySlug,
			figma: figmaData,
			storybook: storybookGroups.get(primarySlug),
		};

		// Additional Storybook groups (1-to-n case)
		const additional = slugs
			.slice(1)
			.filter((s) => storybookGroups.has(s))
			.map((s) => storybookGroups.get(s)!);
		if (additional.length > 0) entry.additionalStorybook = additional;

		// extraStories: additional story groups whose source code should be included in the prompt
		const extraStorySlugs: string[] = [];
		for (const raw of rawSlugs) {
			if (typeof raw === 'object' && raw !== null && !Array.isArray(raw) && raw.extraStories) {
				for (const title of raw.extraStories) {
					// Normalize the title to its Storybook slug (same logic as the collector)
					const parts = title.split('/');
					const angularIdx = parts.indexOf('Angular');
					const componentName = angularIdx > 0 ? parts[angularIdx - 1].trim() : parts[parts.length - 1].trim();
					const xSlug = componentName
						.toLowerCase()
						.replace(/\s+/g, '-')
						.replace(/[^a-z0-9-]/g, '');
					if (xSlug && !extraStorySlugs.includes(xSlug)) extraStorySlugs.push(xSlug);
				}
			}
		}
		if (extraStorySlugs.length > 0) {
			const extraGroups = extraStorySlugs.filter((s) => storybookGroups.has(s)).map((s) => storybookGroups.get(s)!);
			if (extraGroups.length > 0) entry.additionalStorybook = [...(entry.additionalStorybook ?? []), ...extraGroups];
		}

		// Related stories by substring match
		const related: (StorybookGroup & { sbSlug: string })[] = [];
		for (const [sbKey, sbData] of storybookGroups) {
			if (slugs.includes(sbKey)) continue;
			if ((sbKey.includes(primarySlug) && primarySlug.length >= 3) || (primarySlug.includes(sbKey) && sbKey.length >= 3)) {
				related.push({ sbSlug: sbKey, ...sbData });
			}
		}
		if (related.length > 0) entry.relatedStorybook = related;

		matched.push(entry);
	}

	// Storybook stories with no matching Figma component
	const usedSlugs = new Set(matched.map((m) => m.slug));
	const storybookOnly: StorybookOnlyEntry[] = [];
	for (const [sbKey, sbData] of storybookGroups) {
		if (!usedSlugs.has(sbKey)) {
			storybookOnly.push({ slug: sbKey, storybook: sbData });
		}
	}

	return { matched, figmaOnly, storybookOnly };
}

// ─── Bootstrap (--init-map) ─────────────────────────────────────────────────────

function levenshtein(a: string, b: string): number {
	const m = a.length;
	const n = b.length;
	const dp: number[] = Array.from({ length: n + 1 }, (_, i) => i);
	for (let j = 1; j <= m; j++) {
		let prev = dp[0];
		dp[0] = j;
		for (let i = 1; i <= n; i++) {
			const temp = dp[i];
			dp[i] = a[j - 1] === b[i - 1] ? prev : 1 + Math.min(prev, dp[i], dp[i - 1]);
			prev = temp;
		}
	}
	return dp[n];
}

const STRIP_SUFFIXES = ['section', 'page', 'full', 'wrapper', 'list', 'container', 'item', 'row', 'group', 'block', 'panel', 'standalone'];
const STRIP_PREFIXES = ['assets', 'template'];

function stripVariants(slug: string): string {
	for (const suffix of STRIP_SUFFIXES) {
		if (slug !== suffix && slug.endsWith(suffix)) {
			const s = slug.slice(0, slug.length - suffix.length);
			if (s.length >= 2) return s;
		}
	}
	for (const prefix of STRIP_PREFIXES) {
		if (slug !== prefix && slug.startsWith(prefix)) {
			const s = slug.slice(prefix.length);
			if (s.length >= 2) return s;
		}
	}
	return slug;
}

function suggestStorybookSlug(figmaKey: string, storybookGroups: Map<string, StorybookGroup>): string | null {
	const normalizedKey = normalizeName(figmaKey);
	const strippedKey = stripVariants(normalizedKey);

	if (storybookGroups.has(normalizedKey)) return normalizedKey;
	if (strippedKey !== normalizedKey && storybookGroups.has(strippedKey)) return strippedKey;

	let bestKey: string | null = null;
	let bestDist = Infinity;
	for (const [k] of storybookGroups) {
		const d = levenshtein(normalizedKey, k);
		if (d <= 2 && d < bestDist) {
			bestDist = d;
			bestKey = k;
		}
	}
	if (!bestKey && strippedKey !== normalizedKey) {
		for (const [k] of storybookGroups) {
			const d = levenshtein(strippedKey, k);
			if (d <= 2 && d < bestDist) {
				bestDist = d;
				bestKey = k;
			}
		}
	}
	return bestKey ?? null;
}

function buildMapEntry(slug: string | null, storybookGroups: Map<string, StorybookGroup>): ComponentMapValue {
	if (!slug) return null;
	const group = storybookGroups.get(slug);
	if (!group) return { slug }; // unknown slug, store it anyway
	// Exact title from the docs entry (e.g. "Documentation/Actions/Button")
	// Strip the last segment (/Button Docs) to keep the common prefix
	const docsTitle = group.docsEntry?.title;
	const storybook = docsTitle ? docsTitle.replace(/\/[^/]+$/, '') : `${group.category}/${group.storybookName}`;
	return { slug, storybook };
}

export function refreshMap(figmaGroups: Map<string, FigmaGroup>, storybookGroups: Map<string, StorybookGroup>): { added: number; removed: number } {
	const map = loadComponentMap();
	const currentKeys = new Set(figmaGroups.keys());
	let added = 0;
	let removed = 0;

	// Remove keys no longer present in Figma
	for (const key of Object.keys(map)) {
		if (!currentKeys.has(key)) {
			delete map[key];
			console.log(`  🗑  "${key}" removed (no longer in Figma)`);
			removed++;
		}
	}

	// Add new keys
	for (const [figmaKey] of figmaGroups) {
		if (figmaKey in map) continue;
		const slug = suggestStorybookSlug(figmaKey, storybookGroups);
		map[figmaKey] = buildMapEntry(slug, storybookGroups);
		const label = slug ? `"${figmaKey}" → "${slug}"` : `"${figmaKey}" → null (must be mapped manually)`;
		console.log(`  ➕ ${label}`);
		added++;
	}

	saveComponentMap(map);
	return { added, removed };
}

export function resetMap(figmaGroups: Map<string, FigmaGroup>, storybookGroups: Map<string, StorybookGroup>): number {
	const map: ComponentMap = {};

	for (const [figmaKey] of figmaGroups) {
		const slug = suggestStorybookSlug(figmaKey, storybookGroups);
		map[figmaKey] = buildMapEntry(slug, storybookGroups);
	}

	saveComponentMap(map);
	return Object.keys(map).length;
}
