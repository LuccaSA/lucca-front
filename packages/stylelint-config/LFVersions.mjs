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

	// The API caps page size at 100 and the repo already has >100 milestones, so paginate to the last
	// page: every referenced version must resolve, not just the 100 most recent.
	const PER_PAGE = 100;
	const MAX_PAGES = 20; // Safety bound against an unbounded loop; far exceeds the milestone count.
	let page = 1;
	let hasMore = true;

	while (hasMore && page <= MAX_PAGES) {
		const githubMilestones = await fetch(
			`https://api.github.com/repos/LuccaSA/lucca-front/milestones?state=all&sort=due_on&direction=desc&per_page=${PER_PAGE}&page=${page}`,
		);

		if (!githubMilestones.ok) {
			break;
		}

		const milestones = await githubMilestones.json();

		for (const milestone of milestones) {
			const version = milestone.title;

			// due_on is already ISO 8601 UTC; store as-is (a locale string breaks new Date() outside en-US).
			// Skip milestones with no due date so they don't resolve to the epoch.
			if (version && milestone.due_on) {
				LFVersions[normalizeVersion(version)] = milestone.due_on;
			}
		}

		hasMore = milestones.length === PER_PAGE;
		page++;
	}

	writeFileSync(CACHE_FILE_PATH, JSON.stringify({ LFVersions, createdAt: Date.now() }), 'utf8');
}

export default LFVersions;
