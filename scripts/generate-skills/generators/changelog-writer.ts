/**
 * Per-component changelog writer.
 *
 * Builds a cumulative, per-component changelog as a **structural API diff** between consecutive
 * stable release tags (sourced from git, layout-agnostic), up to the target version. Versions
 * with no API change are omitted. An optional ZeroHeight prose section is appended as a
 * "release notes" layer.
 *
 * Output is written by skill-writer's `writeChangelog` to:
 *   <version>/references/components/<slug>/<slug>.changelog.md
 *
 * NOTE: a per-entry commit/compare link (escape hatch) is intentionally deferred — v1 is the
 * structural diff only.
 */

import { PackageAPI, VersionConfig } from '../types';
import { extractPackageAPI } from '../collectors/ast-extractor';
import { diffPackageApi } from '../collectors/api-diff';
import { resolveVersion, listStableTags, compareTags } from '../version-config';

/** Run-level cache: each (ngPackage, selectors, tag) API is extracted once, reused across target versions. */
const apiCache = new Map<string, PackageAPI | null>();

function getApi(ngPackage: string, tag: string, selectorFilter?: string[]): PackageAPI | null {
	const key = `${ngPackage}|${(selectorFilter ?? []).join(',')}@${tag}`;
	const cached = apiCache.get(key);
	if (cached !== undefined) return cached;

	let api: PackageAPI | null = null;
	try {
		api = extractPackageAPI(ngPackage, resolveVersion(tag), true, selectorFilter); // silent: tag-walk misses are expected (component not yet introduced)
	} catch {
		api = null;
	}
	apiCache.set(key, api);
	return api;
}

export interface ChangelogInput {
	slug: string;
	/** ng package name, or null for CSS-only components (no API to diff). */
	ngPackage: string | null;
	/** Restrict the diff to these selectors (scope one component out of a multi-component package). */
	ngSelectors?: string[];
	version: VersionConfig;
	/** Optional ZeroHeight prose changelog (release-notes layer). */
	zhProse?: string | null;
}

/**
 * Builds the cumulative per-component changelog markdown, or null if there is nothing to write
 * (no API history and no ZH prose).
 */
export function buildComponentChangelog(input: ChangelogInput): string | null {
	const { slug, ngPackage, ngSelectors, version, zhProse } = input;

	const entries: { version: string; lines: string[] }[] = [];

	if (ngPackage) {
		// Real stable release tags of this major, up to (and including) the target version.
		const tags = listStableTags(version.major).filter((t) => compareTags(t, version.tag) <= 0);

		let prevApi: PackageAPI | null = null;
		let seen = false;
		for (const tag of tags) {
			const api = getApi(ngPackage, tag, ngSelectors);
			if (!api && !seen) continue; // component not introduced yet at this tag

			const delta = diffPackageApi(prevApi, api);
			if (delta.lines.length > 0) {
				entries.push({ version: tag.replace(/^v/, ''), lines: delta.lines });
			}
			prevApi = api;
			if (api) seen = true;
		}
	}

	if (entries.length === 0 && !(zhProse && zhProse.trim())) return null;

	let md = `# ${slug} — Changelog\n\n`;

	if (entries.length > 0) {
		md += `> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à \`${version.tag}\`. Les versions sans changement d'API sont omises.\n\n`;
		// Newest first.
		for (const e of entries.reverse()) {
			md += `## ${e.version}\n\n${e.lines.join('\n')}\n\n`;
		}
	} else if (ngPackage) {
		md += `_Aucun changement d'API détecté sur l'historique stable jusqu'à ${version.tag}._\n\n`;
	}

	if (zhProse && zhProse.trim()) {
		md += `## Notes de release (ZeroHeight)\n\n${zhProse.trim()}\n`;
	}

	return md;
}
