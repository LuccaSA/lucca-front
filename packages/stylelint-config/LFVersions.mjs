import * as os from 'node:os';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

let LFVersions = null;

/**
 * Normalise a version to a patch version.
 * e.g. `22.0` → `22.0.0`
 *
 * Used on both sides: LFVersions keys (built from milestone titles) and lookups.
 *
 * @param {string} version - Dot-separated LF version
 * @return {string}
 */
export function normalizeVersion(version) {
	return version.split('.').length === 2 ? `${version}.0` : version;
}

// Check if the `showCachePath` parameter is present when executing the script.
const showCachePath = process.argv.includes('showCachePath');
const CACHE_FILE_PATH = join(os.tmpdir(), 'stylelint-LFVersions.json');

try {
	const cacheFile = readFileSync(CACHE_FILE_PATH, 'utf8');
	const cache = JSON.parse(cacheFile);

	// If cache is older than 1 hour, don't use it
	if (cache.createdAt && Date.now() - cache.createdAt < 1000 * 60 * 60) {
		LFVersions = cache.LFVersions;
	}

	if (showCachePath) {
		console.info(`Using cached data in ${CACHE_FILE_PATH}…`);
	}
} catch (e) {
	// Whatever, no cache file means we'll fetch anyways
}

if (LFVersions === null) {
	LFVersions = {};

	if (showCachePath) {
		console.info(`Fetching from Github to ${CACHE_FILE_PATH}…`);
	}

	// per_page raises the default 30 results to the API maximum: old milestones must resolve too.
	const githubMilestones = await fetch(
		'https://api.github.com/repos/LuccaSA/lucca-front/milestones?state=all&sort=due_on&direction=desc&per_page=100',
	);

	if (githubMilestones.ok) {
		const milestones = await githubMilestones.json();

		for (const milestone of milestones) {
			const version = milestone.title;

			if (version) {
				const date = new Date(milestone.due_on);

				LFVersions[normalizeVersion(version)] = date.toLocaleDateString();
			}
		}
	}

	writeFileSync(CACHE_FILE_PATH, JSON.stringify({ LFVersions, createdAt: Date.now() }), 'utf8');
}

export default LFVersions;
