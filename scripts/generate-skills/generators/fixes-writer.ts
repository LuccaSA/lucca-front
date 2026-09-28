/**
 * Per-patch fixes writer.
 *
 * A minor skill's `references/` documents the LATEST published patch of the minor. To keep the
 * full patch-level information (invariant: no information loss vs the per-patch layout), each
 * published patch > x.y.0 gets a `fixes/<M-m-p>.md` describing its delta vs the previous
 * published patch, from deterministic sources only:
 *
 *   1. structural API diff per component (same machinery as the cumulative changelog);
 *   2. shared enumerated type deltas (e.g. LuccaIcon gaining members — invisible to the API
 *      diff because the input's declared type name does not change);
 *   3. codemods introduced by the patch (schematics collection diff);
 *   4. full git diff of the story sources (`stories/` at the repo root) — additions AND
 *      deletions carry their content, so nothing is lost for a project pinned on an older patch;
 *   5. the patch-exact Storybook URL.
 *
 * API *description* changes are not diffed here: descriptions come from story argTypes, so they
 * are already visible in the story-source diff (4).
 *
 * Known approximation: the component list is the one discovered at the minor's latest patch. A
 * component REMOVED mid-minor would not appear in the API section (its removal and content are
 * still captured by the story-source diff). Never observed to date (component counts are
 * monotonic within a minor).
 */

import { execSync } from 'child_process';
import { PackageAPI, VersionConfig } from '../types';
import { diffPackageApi } from '../collectors/api-diff';
import { collectionAt } from '../collectors/schematics';
import { getApiAtTag } from './changelog-writer';
import { cleanFixesDirectory, writeFixFile } from './skill-writer';

export interface FixesComponent {
	slug: string;
	ngPackage: string | null;
	ngSelectors?: string[];
}

export interface FixesInput {
	/** VersionConfig of the minor's latest patch (the skill being generated). */
	version: VersionConfig;
	/** All published patch tags of the minor, ascending (from resolveMinorVersion). */
	patchTags: string[];
	/** Components discovered at the latest patch (slug + ngPackage for the API diff). */
	components: FixesComponent[];
}

/**
 * Writes one fixes/<M-m-p>.md per published patch > x.y.0 of the minor.
 * Returns the number of fix files written.
 */
export function writeFixes(skillsDir: string, input: FixesInput): { written: number } {
	const { version, patchTags, components } = input;
	cleanFixesDirectory(skillsDir, version);

	let written = 0;
	for (let i = 1; i < patchTags.length; i++) {
		const prevTag = patchTags[i - 1];
		const currTag = patchTags[i];
		const md = buildFixMd(prevTag, currTag, components);
		const patchVersion = currTag.replace(/^v/, '');
		writeFixFile(skillsDir, version, patchVersion, md);
		written++;
	}
	return { written };
}

function buildFixMd(prevTag: string, currTag: string, components: FixesComponent[]): string {
	const prev = prevTag.replace(/^v/, '');
	const curr = currTag.replace(/^v/, '');
	const date = tagDate(currTag);

	let md = `# Fix ${curr} — correctifs vs ${prev}\n\n`;
	md += `> Correctifs livrés par le patch \`${curr}\`${date ? ` (publié le ${date})` : ''}. `;
	md += `La documentation de cette skill (\`references/\`) reflète le **dernier** patch de la mineure : `;
	md += `si votre projet est sur un patch **antérieur** à \`${curr}\`, les correctifs ci-dessous ne sont **pas** dans votre version.\n`;
	md += `> Storybook exact de ce patch : https://lucca-front.lucca.io/${currTag}/storybook\n\n`;

	const sections: string[] = [];

	const codemods = renderNewCodemods(prevTag, currTag);
	if (codemods) sections.push(codemods);

	const { apiSection, prevApis, currApis } = renderApiDiffs(prevTag, currTag, components);
	if (apiSection) sections.push(apiSection);

	const types = renderSharedTypeDiffs(prevApis, currApis);
	if (types) sections.push(types);

	const stories = renderStoriesDiff(prevTag, currTag);
	if (stories) sections.push(stories);

	if (sections.length === 0) {
		md += `_Aucun changement détecté sur les sources suivies (API, types partagés, codemods, stories). `;
		md += `Le patch peut ne contenir que des correctifs internes (SCSS, comportement) sans impact sur l'API documentée._\n`;
		return md;
	}

	return md + sections.join('\n');
}

/** Committer date (YYYY-MM-DD) of the tagged commit — deterministic from git. */
function tagDate(tag: string): string | null {
	try {
		return execSync(`git log -1 --format=%cs ${tag}`, { encoding: 'utf-8' }).trim() || null;
	} catch {
		return null;
	}
}

// ─── Codemods ─────────────────────────────────────────────────────────────────

function renderNewCodemods(prevTag: string, currTag: string): string | null {
	const prev = collectionAt(prevTag);
	const curr = collectionAt(currTag);
	const added = [...curr.keys()].filter((n) => !prev.has(n)).sort((a, b) => a.localeCompare(b));
	const removed = [...prev.keys()].filter((n) => !curr.has(n)).sort((a, b) => a.localeCompare(b));
	if (added.length === 0 && removed.length === 0) return null;

	let md = `## Codemods\n\n`;
	if (added.length > 0) {
		md += `| Codemod | Commande | Effet |\n|---------|----------|-------|\n`;
		for (const n of added) {
			md += `| ${n} | \`ng generate @lucca-front/ng:${n}\` | ${curr.get(n) || '_(pas de description)_'} |\n`;
		}
		md += `\n`;
	}
	for (const n of removed) {
		md += `- ❌ Codemod retiré : \`${n}\` — ${prev.get(n) || '_(pas de description)_'}\n`;
	}
	if (removed.length > 0) md += `\n`;
	return md;
}

// ─── API structural diff ──────────────────────────────────────────────────────

function renderApiDiffs(
	prevTag: string,
	currTag: string,
	components: FixesComponent[],
): { apiSection: string | null; prevApis: (PackageAPI | null)[]; currApis: (PackageAPI | null)[] } {
	const prevApis: (PackageAPI | null)[] = [];
	const currApis: (PackageAPI | null)[] = [];
	const blocks: string[] = [];

	for (const c of [...components].sort((a, b) => a.slug.localeCompare(b.slug))) {
		if (!c.ngPackage) {
			prevApis.push(null);
			currApis.push(null);
			continue;
		}
		const prevApi = getApiAtTag(c.ngPackage, prevTag, c.ngSelectors);
		const currApi = getApiAtTag(c.ngPackage, currTag, c.ngSelectors);
		prevApis.push(prevApi);
		currApis.push(currApi);

		const delta = diffPackageApi(prevApi, currApi);
		if (delta.lines.length === 0) continue;

		let block = `### ${c.slug}\n\n${delta.lines.join('\n')}\n`;
		// No-loss rule: a component removed by this patch embeds its last known API surface,
		// not just the removal notice.
		if (prevApi && !currApi) {
			block += `\nDernière API connue (à \`${prevTag.replace(/^v/, '')}\`) :\n\n`;
			block += renderApiSnapshot(prevApi);
		}
		blocks.push(block);
	}

	if (blocks.length === 0) return { apiSection: null, prevApis, currApis };
	return {
		apiSection: `## API (diff structurel)\n\n${blocks.join('\n')}\n`,
		prevApis,
		currApis,
	};
}

/** Terse snapshot of a package API (selectors + member names/types), for removal embeds. */
function renderApiSnapshot(api: PackageAPI): string {
	let md = '';
	for (const cls of api.apis) {
		md += `- \`${cls.className}\` (${cls.kind}, selectors : ${cls.selectors.map((s) => `\`${s}\``).join(', ') || '—'})\n`;
		for (const i of cls.inputs) md += `  - input \`${i.bindingName}\` : ${i.type}${i.required ? ' (requis)' : ''}${i.default ? ` = ${i.default}` : ''}\n`;
		for (const o of cls.outputs) md += `  - output \`${o.bindingName}\` : ${o.type}\n`;
		for (const m of cls.models) md += `  - model \`${m.bindingName}\` : ${m.type}${m.required ? ' (requis)' : ''}\n`;
	}
	return md;
}

// ─── Shared enumerated types ──────────────────────────────────────────────────

/** typeName → set of expanded string-literal values, gathered from every component API. */
function collectTypeValues(apis: (PackageAPI | null)[]): Map<string, Set<string>> {
	const map = new Map<string, Set<string>>();
	for (const api of apis) {
		if (!api) continue;
		for (const cls of api.apis) {
			for (const input of cls.inputs) {
				if (!input.expandedValues || !input.expandedTypeName) continue;
				const set = map.get(input.expandedTypeName) ?? new Set<string>();
				for (const v of input.expandedValues) set.add(v);
				map.set(input.expandedTypeName, set);
			}
		}
	}
	return map;
}

function renderSharedTypeDiffs(prevApis: (PackageAPI | null)[], currApis: (PackageAPI | null)[]): string | null {
	const prev = collectTypeValues(prevApis);
	const curr = collectTypeValues(currApis);
	const names = [...new Set([...prev.keys(), ...curr.keys()])].sort((a, b) => a.localeCompare(b));

	const blocks: string[] = [];
	for (const name of names) {
		const prevValues = prev.get(name) ?? new Set<string>();
		const currValues = curr.get(name) ?? new Set<string>();
		const added = [...currValues].filter((v) => !prevValues.has(v)).sort((a, b) => a.localeCompare(b));
		const removed = [...prevValues].filter((v) => !currValues.has(v)).sort((a, b) => a.localeCompare(b));
		if (added.length === 0 && removed.length === 0) continue;

		let block = `### ${name}\n\n`;
		if (added.length > 0) block += added.map((v) => `+ \`${v}\``).join('\n') + '\n';
		if (removed.length > 0) block += removed.map((v) => `- \`${v}\` (retiré)`).join('\n') + '\n';
		blocks.push(block);
	}

	if (blocks.length === 0) return null;
	return `## Types partagés\n\n${blocks.join('\n')}\n`;
}

// ─── Story sources ────────────────────────────────────────────────────────────

/**
 * Full git diff of the story sources between the two tags. Deletions carry the removed content
 * (standard unified diff), so a project on the older patch keeps access to what disappeared.
 */
function renderStoriesDiff(prevTag: string, currTag: string): string | null {
	let diff: string;
	try {
		diff = execSync(`git diff ${prevTag} ${currTag} -- stories`, { encoding: 'utf-8', maxBuffer: 50 * 1024 * 1024 });
	} catch {
		return null;
	}
	if (!diff.trim()) return null;

	let md = `## Stories (sources)\n\n`;
	md += `Diff complet des sources de stories (\`stories/\`) entre \`${prevTag}\` et \`${currTag}\`. `;
	md += `Les suppressions embarquent le contenu supprimé.\n\n`;
	md += '````diff\n' + diff.trimEnd() + '\n````\n';
	return md;
}
