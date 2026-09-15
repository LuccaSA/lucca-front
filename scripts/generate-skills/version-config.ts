/**
 * Version configuration and resolution for the generate-skills pipeline.
 *
 * Maps Lucca Front versions to their data source URLs:
 * - ZeroHeight release IDs (per minor version)
 * - Storybook URLs (per fix/patch version)
 * - Git tags for source code access
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { VersionConfig } from './types';

// ─── ZeroHeight release IDs (per minor) ──────────────────────────────────────
//
// The map lives in `zh-release-ids.json` (writable, so the pre-flight guard can persist an ID the
// operator supplies). Each "major.minor" → its ZeroHeight release ID, which pins the ZH design
// content: `prisme.lucca.io/<token>/v/<releaseId>/p/<page>.md` is immutable, so a pinned minor is
// fully reproducible — regenerating it any time yields the same guidelines.
//
// A minor ABSENT from the map resolves to `zhReleaseId === null` → the URL drops `/v/<id>/` and
// fetches the CURRENT ("latest") content, a moving target. Safe ONLY while that minor is the newest
// published version (npm + ZeroHeight ship in lockstep). Regenerating an OLDER, unpinned minor would
// pull "latest" (= a newer version) and silently corrupt its design sections — which is exactly what
// the pre-flight guard (zh-release-guard.ts) blocks: it refuses to (re)generate a superseded minor
// until its ID is pinned.
//
// How to obtain a release ID (it is opaque — NOT derivable from git/npm/repo):
//   1. ZeroHeight MCP `list-releases` (the source used to seed this map on 2026-04-28); or
//   2. the prisme version switcher — selecting a release puts its ID in the URL as `/v/<releaseId>/`.
// The public ZH API (`/api/styleguide/<id>/releases`) requires an auth token, so a plain web fetch
// cannot recover it. See README → "IDs de release ZeroHeight (ZH_RELEASE_IDS)".
//
// Key format: "major.minor".
const ZH_RELEASE_IDS_PATH = path.join(__dirname, 'zh-release-ids.json');

function loadZhReleaseIds(): Record<string, number> {
	try {
		return JSON.parse(fs.readFileSync(ZH_RELEASE_IDS_PATH, 'utf-8'));
	} catch {
		return {};
	}
}

// In-memory cache, loaded once. Mutated by addZhReleaseId so resolveVersion sees IDs added mid-run.
const ZH_RELEASE_IDS: Record<string, number> = loadZhReleaseIds();

/** Returns the known "major.minor" → release ID map (live in-memory copy). */
export function getZhReleaseIds(): Record<string, number> {
	return { ...ZH_RELEASE_IDS };
}

/** Pins a minor's ZeroHeight release ID: updates the in-memory map AND persists to the JSON file. */
export function addZhReleaseId(minorKey: string, releaseId: number): void {
	ZH_RELEASE_IDS[minorKey] = releaseId;
	const sorted = Object.fromEntries(
		Object.keys(ZH_RELEASE_IDS)
			.sort((a, b) => {
				const [aMaj, aMin] = a.split('.').map(Number);
				const [bMaj, bMin] = b.split('.').map(Number);
				return bMaj - aMaj || bMin - aMin;
			})
			.map((k) => [k, ZH_RELEASE_IDS[k]]),
	);
	fs.writeFileSync(ZH_RELEASE_IDS_PATH, JSON.stringify(sorted, null, '\t') + '\n');
}

const ZH_STYLEGUIDE_TOKEN = '94310e217';

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Parses a version string like "21.2.1" or "v21.2.1" into components.
 */
export function parseVersion(versionStr: string): { major: number; minor: number; patch: number } | null {
	const match = versionStr.match(/^v?(\d+)\.(\d+)\.(\d+)$/);
	if (!match) return null;
	return {
		major: parseInt(match[1], 10),
		minor: parseInt(match[2], 10),
		patch: parseInt(match[3], 10),
	};
}

/**
 * Parses a minor version string like "21.2" (or "v21.2") into components.
 * Full patch versions ("21.2.1") are rejected — the pipeline generates per minor.
 */
export function parseMinor(versionStr: string): { major: number; minor: number } | null {
	const match = versionStr.match(/^v?(\d+)\.(\d+)$/);
	if (!match) return null;
	return { major: parseInt(match[1], 10), minor: parseInt(match[2], 10) };
}

/** A generation target: one minor, resolved to its latest stable patch. */
export interface MinorResolution {
	/** VersionConfig of the LATEST stable patch of the minor — what references/ documents. */
	version: VersionConfig;
	/** "major.minor", e.g. "21.2". */
	minorKey: string;
	/** ALL stable published patch tags of the minor, ascending (e.g. ["v21.2.0", "v21.2.1", …]).
	 * Phantom tags never published to npm are excluded by listStableTags (UNPUBLISHED_TAGS). */
	patchTags: string[];
	/** Technical minors covered by this minor (see TECHNICAL_MINORS), with their published patch
	 * tags. Their patches > .0 get a fixes/ file in THIS minor's skill. Empty for most minors. */
	technicalMinors: TechnicalMinorPatches[];
}

/**
 * Resolves a minor ("21.2") to its latest stable patch tag + the full patch tag list.
 * Throws if the minor has no stable tag in git.
 */
export function resolveMinorVersion(minorStr: string): MinorResolution {
	const parsed = parseMinor(minorStr);
	if (!parsed) {
		throw new Error(`Invalid minor version format: "${minorStr}". Expected "M.m" (e.g. "21.2") — the pipeline generates one skill per minor.`);
	}
	const { major, minor } = parsed;
	const patchTags = listStableTags(major).filter((t) => parseVersion(t)!.minor === minor);
	if (patchTags.length === 0) {
		throw new Error(`No stable git tag found for minor ${major}.${minor} (expected tags like v${major}.${minor}.0).`);
	}
	const latestTag = patchTags[patchTags.length - 1];
	const minorKey = `${major}.${minor}`;
	return {
		version: resolveVersion(latestTag),
		minorKey,
		patchTags,
		technicalMinors: technicalMinorsCoveredBy(minorKey).map((t) => ({
			...t,
			patchTags: listStableTags(major).filter((tag) => parseVersion(tag)!.minor === parseMinor(t.minorKey)!.minor),
		})),
	};
}

/**
 * Resolves a full VersionConfig for a given version string.
 *
 * @param versionStr — e.g. "21.2.1" or "v21.2.1"
 * @returns VersionConfig with all resolved URLs and IDs
 */
export function resolveVersion(versionStr: string): VersionConfig {
	const parsed = parseVersion(versionStr);
	if (!parsed) {
		throw new Error(`Invalid version format: "${versionStr}". Expected "M.m.p" or "vM.m.p".`);
	}

	const { major, minor, patch } = parsed;
	const tag = `v${major}.${minor}.${patch}`;
	const minorKey = `${major}.${minor}`;

	const zhReleaseId = ZH_RELEASE_IDS[minorKey] ?? null;
	const storybookBaseUrl = `https://lucca-front.lucca.io/${tag}/storybook`;

	return {
		tag,
		major,
		minor,
		patch,
		zhReleaseId,
		storybookBaseUrl,
	};
}

/**
 * Returns the ZeroHeight .md URL for a component page in a specific version.
 *
 * @param pagePath — e.g. "098404-button"
 * @param zhReleaseId — ZeroHeight release ID (null = latest)
 */
export function getZeroHeightUrl(pagePath: string, zhReleaseId: number | null): string {
	if (zhReleaseId !== null) {
		return `https://prisme.lucca.io/${ZH_STYLEGUIDE_TOKEN}/v/${zhReleaseId}/p/${pagePath}.md`;
	}
	return `https://prisme.lucca.io/${ZH_STYLEGUIDE_TOKEN}/p/${pagePath}.md`;
}

/** Numeric comparison of two version tags ("v21.2.3" or "21.2.3"). */
export function compareTags(a: string, b: string): number {
	const pa = parseVersion(a);
	const pb = parseVersion(b);
	if (!pa || !pb) return 0;
	return pa.major - pb.major || pa.minor - pb.minor || pa.patch - pb.patch;
}

const stableTagCache = new Map<number, string[]>();

/**
 * Tags that exist in git but were NEVER published to npm (phantom releases). They must not
 * produce a skill, a fix file, or a changelog entry: their changes actually ship with the
 * NEXT published patch, which is where the walk attributes them once the phantom is skipped.
 * Add any future tag that never reached npm.
 */
const UNPUBLISHED_TAGS = new Set(['v21.1.5', 'v21.2.3']);

// ─── Technical minors (no skill of their own) ────────────────────────────────
//
// A technical minor is a published npm release whose `.0` patch has ONE purpose: framework
// compatibility (e.g. 21.4.0 = Angular 22 support before the 22.0 major) — no API change, no
// codemod, no documentation change, and typically no ZeroHeight release of its own (Prisme moves
// straight to the next major). The pattern recurs before every major. Generating a full skill for
// it would duplicate ~440 identical files and, without a ZH release ID, would pull "latest" design
// content (= the next major) — so it is NOT generated.
//
// Instead, the covering minor's skill absorbs it:
//   - `<tech>.0` is documented as equivalent to the covering minor's latest patch;
//   - every later patch (`<tech>.1`, `<tech>.2`…) is the trunk continuing to ship fixes AND small
//     API additions before the major. Those are NOT neutral (21.4.1/21.4.2 added inputs, icons,
//     CSS vars…), so each gets a `fixes/<tech-M-m-p>.md` in the covering minor's skill, generated
//     from git exactly like the covering minor's own fixes (resolveMinorVersion exposes the
//     technical patch tags on MinorResolution.technicalMinors).
//   - the covering minor's SKILL.md and the aggregate router declare the technical minor, and the
//     coherence guard lets a project on ANY listed `<tech>.x` patch through.
//
// Key format: "major.minor" (the technical minor) → its covering minor + human-readable reason.
export interface TechnicalMinorInfo {
	/** The documented minor whose skill covers this technical release (e.g. "21.3"). */
	coveredBy: string;
	/** Short reason shown in the generated SKILL.md (e.g. "compatibilité Angular 22"). */
	reason: string;
}

/** A technical minor resolved against git: its info + every published stable patch tag, ascending. */
export interface TechnicalMinorPatches extends TechnicalMinorInfo {
	/** "major.minor" of the technical minor, e.g. "21.4". */
	minorKey: string;
	/** e.g. ["v21.4.0", "v21.4.1", "v21.4.2"]. Patches > .0 each get a fixes/ file. */
	patchTags: string[];
}

const TECHNICAL_MINORS: Record<string, TechnicalMinorInfo> = {
	'21.4': { coveredBy: '21.3', reason: 'compatibilité Angular 22' },
};

/** Info of a technical minor ("21.4"), or null if the minor is a regular documented one. */
export function getTechnicalMinor(minorKey: string): TechnicalMinorInfo | null {
	return TECHNICAL_MINORS[minorKey] ?? null;
}

/** Technical minors covered by a given documented minor ("21.3" → [{ minorKey: "21.4", … }]). */
export function technicalMinorsCoveredBy(minorKey: string): Array<TechnicalMinorInfo & { minorKey: string }> {
	return Object.entries(TECHNICAL_MINORS)
		.filter(([, info]) => info.coveredBy === minorKey)
		.map(([key, info]) => ({ minorKey: key, ...info }));
}

/**
 * Lists the **stable, published** release git tags for a major (e.g. v21.0.0 … v21.2.4), ascending.
 * Excludes pre-releases (-rc, -experimental, -split, …) and phantom tags never published to npm
 * (UNPUBLISHED_TAGS). Sourced from git, cached per major.
 * Used to walk the real release history for the per-component changelog and the per-patch fixes.
 */
export function listStableTags(major: number): string[] {
	const cached = stableTagCache.get(major);
	if (cached) return cached;

	let tags: string[] = [];
	try {
		const out = execSync(`git tag -l 'v${major}.*'`, { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
		tags = out
			.split('\n')
			.map((t) => t.trim())
			.filter((t) => /^v\d+\.\d+\.\d+$/.test(t)) // stable only
			.filter((t) => !UNPUBLISHED_TAGS.has(t));
	} catch {
		tags = [];
	}
	tags.sort(compareTags);
	stableTagCache.set(major, tags);
	return tags;
}


/** Majors that have at least one stable, published tag — descending. Cached, one git call. */
let stableMajorsCache: number[] | null = null;

function listStableMajors(): number[] {
	if (stableMajorsCache) return stableMajorsCache;

	let majors: number[] = [];
	try {
		const out = execSync(`git tag -l 'v*'`, { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
		majors = [
			...new Set(
				out
					.split('\n')
					.map((t) => t.trim())
					.filter((t) => /^v\d+\.\d+\.\d+$/.test(t))
					.filter((t) => !UNPUBLISHED_TAGS.has(t))
					.map((t) => parseVersion(t)!.major),
			),
		].sort((a, b) => b - a);
	} catch {
		majors = [];
	}
	stableMajorsCache = majors;
	return majors;
}

/**
 * Last stable tag of the newest major **strictly below** `major` (e.g. 22 → `v21.3.1`), or null
 * when none exists (the first documented major).
 *
 * The per-component changelog needs it as a baseline: without it, the tag-walk starts with an
 * empty API and the first tag of the major reads as "Composant introduit" for every component
 * that in fact predates it. Harmless while a major held 18 tags and the false line was buried
 * under real history; blatant on `v22.0.0`, where it was the only line on 119 of 128 pages.
 *
 * Reads the majors that actually have tags rather than stepping down one by one, so a gap in the
 * numbering costs nothing and cannot silently drop the baseline.
 */
export function previousMajorLastStableTag(major: number): string | null {
	const previous = listStableMajors().find((m) => m < major);
	if (previous === undefined) return null;
	return listStableTags(previous).at(-1) ?? null;
}
