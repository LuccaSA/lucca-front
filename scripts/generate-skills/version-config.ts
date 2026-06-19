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
 * Lists the **stable** release git tags for a major (e.g. v21.0.0 … v21.2.4), ascending.
 * Excludes pre-releases (-rc, -experimental, -split, …). Sourced from git, cached per major.
 * Used to walk the real release history for the per-component changelog.
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
			.filter((t) => /^v\d+\.\d+\.\d+$/.test(t)); // stable only
	} catch {
		tags = [];
	}
	tags.sort(compareTags);
	stableTagCache.set(major, tags);
	return tags;
}

/**
 * Returns all known ZeroHeight release IDs.
 * Useful for listing available versions.
 */
export function getKnownMinorVersions(): string[] {
	return Object.keys(ZH_RELEASE_IDS).sort((a, b) => {
		const [aMaj, aMin] = a.split('.').map(Number);
		const [bMaj, bMin] = b.split('.').map(Number);
		return bMaj - aMaj || bMin - aMin;
	});
}

/**
 * Finds the closest available version for a requested version.
 * Used for fallback when an exact patch version isn't generated yet.
 *
 * @param requestedVersion — e.g. "21.2.3"
 * @param availableVersions — list of generated version strings, e.g. ["21.2.1", "21.1.4"]
 * @returns The best matching version string, or null if no match
 */
export function findClosestVersion(requestedVersion: string, availableVersions: string[]): string | null {
	const requested = parseVersion(requestedVersion);
	if (!requested) return null;

	const parsed = availableVersions
		.map((v) => ({ raw: v, ...parseVersion(v)! }))
		.filter((v) => v.major !== undefined)
		.sort((a, b) => b.major - a.major || b.minor - a.minor || b.patch - a.patch);

	// 1. Exact match
	const exact = parsed.find((v) => v.major === requested.major && v.minor === requested.minor && v.patch === requested.patch);
	if (exact) return exact.raw;

	// 2. Same minor, closest patch (prefer lower or equal patch)
	const sameMinor = parsed.filter((v) => v.major === requested.major && v.minor === requested.minor);
	const lowerPatch = sameMinor.filter((v) => v.patch <= requested.patch);
	if (lowerPatch.length > 0) return lowerPatch[0].raw;
	if (sameMinor.length > 0) return sameMinor[sameMinor.length - 1].raw;

	// 3. Same major, closest minor (prefer lower or equal minor)
	const sameMajor = parsed.filter((v) => v.major === requested.major);
	const lowerMinor = sameMajor.filter((v) => v.minor <= requested.minor);
	if (lowerMinor.length > 0) return lowerMinor[0].raw;
	if (sameMajor.length > 0) return sameMajor[sameMajor.length - 1].raw;

	// 4. Closest major
	if (parsed.length > 0) return parsed[0].raw;

	return null;
}
