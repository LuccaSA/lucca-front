/**
 * Build-time step for the npm channel of the doc-for-LLM epic: write each published
 * package's `llms.txt` proxy and `llms-api.txt` corpus — plus `llms-stories.txt` where
 * the target opts in — into its ng-packagr dist folder, so `npm publish` (publish.yml,
 * no `files` allowlist) ships them and agents read the doc from
 * `node_modules/@lucca-front/ng/llms*.txt` at the exact installed version — no fetch, no
 * auth. `llms.txt` is the conventional discovery filename (llmstxt.org); it routes to
 * the sibling corpora rather than duplicating them, so an agent after a signature never
 * loads the templates and vice versa.
 *
 * Runs after `build:ng` in the `build` script; also acts as the committed guardrail:
 * it FAILS the build when a package's extraction collapses below its floor, when its
 * dist folder is missing, or when the feed does not actually reach the tarball.
 *
 * That last check is why the step packs instead of trusting the write: a feed dropped
 * at publish time (a `files` allowlist added upstream, a `.npmignore`, a renamed dist
 * layout) leaves the write green and ships a package with no doc — silently. Only
 * `npm pack` sees the published file list, and it is asserted per file: an allowlist
 * naming `llms-api.txt` alone would drop the proxy without failing anything. The
 * symmetric case is asserted too: a target that opted out must not ship a stale corpus.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { extractAllStories, groupByComponent } from './extract-stories.mjs';
import { extractSurface, renderPackageIndex, renderPackageLlms, renderPackageStories, selectPublicApi } from './generate-llms.mjs';

const root = resolve(fileURLToPath(import.meta.url), '..', '..', '..');

/**
 * dist folder and collapse floor per published package (floors are ratchets). `stories`
 * says whether the tarball carries the workspace stories corpus: `@lucca/prisme` opts
 * out because 722 KB of examples that mostly document `ng` nearly doubled a 90 KB
 * package. Its proxy then links the stories on the deploy, which tracks `master` — the
 * accepted cost of the opt-out.
 */
const PACK_TARGETS = [
	{ name: '@lucca-front/ng', dist: 'dist/ng', minEntries: 500, stories: true },
	{ name: '@lucca/prisme', dist: 'dist/prisme', minEntries: 5, stories: false },
];

/** Doc files every tarball must carry, plus the one only a `stories` target carries. */
const BASE_FEEDS = ['llms.txt', 'llms-api.txt'];
const STORIES_FEED = 'llms-stories.txt';

/** Collapse floor for the stories extraction (ratchet). */
const MIN_STORY_FILES = 400;

/** Named story anchors — a floor against ~636 files lets a whole family vanish. */
const STORY_ANCHORS = ['## Actions / Button', '## Forms / MultiSelect', '## Overlays / Tooltip', '## Listings / Data table'];

/** The file list `npm publish` would ship from `distDir`, or null when pack fails. */
function packedFiles(distDir) {
	try {
		const out = execFileSync('npm', ['pack', '--dry-run', '--json'], {
			cwd: distDir,
			encoding: 'utf8',
			stdio: ['ignore', 'pipe', 'ignore'],
		});
		return JSON.parse(out)[0].files.map((f) => f.path);
	} catch {
		return null;
	}
}

const { entryPoints } = extractSurface(root);
const storyFiles = extractAllStories(resolve(root, 'stories/documentation'));
const storyComponentCount = groupByComponent(storyFiles).length;
const failures = [];

if (storyFiles.length < MIN_STORY_FILES) {
	console.error(`\n[llms-pack] FAIL: only ${storyFiles.length} story files (floor ${MIN_STORY_FILES}) — stories extraction collapsed.`);
	process.exit(1);
}

for (const target of PACK_TARGETS) {
	const distDir = resolve(root, target.dist);
	if (!existsSync(join(distDir, 'package.json'))) {
		failures.push(`${target.dist}/package.json not found — run the ng-packagr build first`);
		continue;
	}
	const entries = entryPoints.filter((e) => e.package === target.name).map((e) => ({ ...e, api: selectPublicApi(e.doc, e.names) }));
	const total = entries.reduce((n, e) => n + e.api.matched.length, 0);
	if (total < target.minEntries) {
		failures.push(`${target.name}: only ${total} API entries (floor ${target.minEntries}) — extraction collapsed`);
		continue;
	}
	const shippedFeeds = target.stories ? [...BASE_FEEDS, STORIES_FEED] : BASE_FEEDS;
	const apiCorpus = renderPackageLlms(target.name, entries);
	const storiesCorpus = target.stories ? renderPackageStories(target.name, storyFiles) : '';
	const missingAnchors = target.stories ? STORY_ANCHORS.filter((anchor) => !storiesCorpus.includes(anchor)) : [];
	if (missingAnchors.length) {
		failures.push(`${target.name}: story anchor(s) gone from the packaged corpus: ${missingAnchors.join(', ')}`);
		continue;
	}
	writeFileSync(join(distDir, 'llms-api.txt'), apiCorpus);
	if (target.stories) writeFileSync(join(distDir, STORIES_FEED), storiesCorpus);
	else rmSync(join(distDir, STORIES_FEED), { force: true });
	writeFileSync(
		join(distDir, 'llms.txt'),
		renderPackageIndex(target.name, entries, { storyComponents: target.stories ? storyComponentCount : 0 }),
	);

	const packed = packedFiles(distDir);
	if (!packed) {
		failures.push(`${target.name}: \`npm pack --dry-run\` could not read ${target.dist} — packaging unverified`);
		continue;
	}
	const missing = shippedFeeds.filter((f) => !packed.includes(f));
	if (missing.length) {
		failures.push(
			`${target.name}: ${missing.join(', ')} written to ${target.dist} but ABSENT from the published tarball (${packed.length} files) — check \`files\`/.npmignore in the dist manifest`,
		);
		continue;
	}
	if (!target.stories && packed.includes(STORIES_FEED)) {
		failures.push(
			`${target.name}: opted out of the stories corpus, yet ${STORIES_FEED} reaches the tarball — a stale dist file is being published`,
		);
		continue;
	}
	const storiesNote = target.stories
		? `${storyComponentCount} documented components from ${storyFiles.length} story files (${Math.round(storiesCorpus.length / 1024)} KB)`
		: 'no stories corpus (opted out)';
	console.log(
		`[llms-pack] ${target.name}: ${total} API entries (${Math.round(apiCorpus.length / 1024)} KB) + ${storiesNote} → ` +
			`${target.dist}/{${shippedFeeds.join(',')}} (in tarball, ${packed.length} files)`,
	);
}

if (failures.length) {
	console.error(`\n[llms-pack] FAIL: ${failures.join('; ')}.`);
	process.exit(1);
}
console.log(`\n[llms-pack] OK: every published package carries its ${BASE_FEEDS.join(' + ')}, plus ${STORIES_FEED} where it opts in.`);
