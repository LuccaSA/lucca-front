import * as os from 'node:os';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'path';

let LFVersions = null;

const CACHE_FILE_PATH = join(os.tmpdir(), 'stylelint-LFVersions.json');

try {
	const cacheFile = readFileSync(CACHE_FILE_PATH, 'utf8');
	const cache = JSON.parse(cacheFile);
	// If cache is older than 1 hour, don't use it
	if (cache.createdAt && Date.now() - cache.createdAt < 1000 * 60 * 60) {
		LFVersions = cache.LFVersions;
	}
	console.info(`Using cached data in ${CACHE_FILE_PATH}…`);
} catch (e) {
	// Whatever, no cache file means we'll fetch anyways
}

if (LFVersions === null) {
	LFVersions = {};
	console.info(`Fetching from Github to ${CACHE_FILE_PATH}…`);
	const githubMilestones = await fetch('https://api.github.com/repos/LuccaSA/lucca-front/milestones?state=all&sort=due_on&direction=desc');

	if (githubMilestones.ok) {
		const milestones = await githubMilestones.json();

		for (const milestone of milestones) {
			let version = milestone.title;

			if (version) {
				const date = new Date(milestone.due_on);
				// If version doesn't have patch version, add it as .0
				if (version.split('.').length === 2) {
					version += '.0';
				}
				LFVersions[version] = date.toLocaleDateString();
			}
		}
	}

	writeFileSync(CACHE_FILE_PATH, JSON.stringify({ LFVersions, createdAt: Date.now() }), 'utf8');
}

export default LFVersions;
