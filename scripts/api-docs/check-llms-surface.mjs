/**
 * CI smoke test (offline), run AFTER the generator: asserts the LLM surface actually
 * built and carries every API family, the stories corpus, and the whole feed set.
 * Guards the chain end-to-end — a broken extraction, renderer or orchestration would
 * leave one of these markers missing even when the generator "succeeded".
 *
 * The files are generator-only content (no hand-written prose is aggregated into
 * them), so structural markers are safe probes here:
 *   - llms-full.txt: one probe per API family + the stories section + an entry floor
 *   - llms.txt: exists, links every file present in llms/ (feed-count consistency),
 *     floors on both feed kinds, and never points at an internal host
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

import { OUT_DEPRECATIONS, OUT_DIR, OUT_INDEX, OUT_LLMS } from './generate-llms.mjs';

const root = resolve(import.meta.dirname, '..', '..');
const llmsFull = resolve(root, OUT_LLMS);
const llmsIndex = resolve(root, OUT_INDEX);
const llmsDir = resolve(root, OUT_DIR);

/** The extraction is far above these today; the floors only catch a mass collapse. */
const MIN_ENTRIES = 500;
const MIN_ENTRYPOINT_FILES = 80; // ~120 ng + prisme entry points today
const MIN_STORY_FILES = 10; // 16 story categories today

/**
 * Feeds named by hand, never derived. The index and the `llms/` folder both come out
 * of the same extraction, so a lost entry point disappears from both and the
 * feed-count floors — 80 of ~120 — let it through silently. These anchors pin the
 * SHAPE of the surface: one per package, per nesting depth and per story-category
 * arm, so losing any single family fails the gate by name. Add an anchor when a new
 * family becomes load-bearing; never trim the list to make the gate pass.
 */
const EXPECTED_FEEDS = [
	'ng-core.md',
	'ng-button.md',
	'ng-forms.md',
	'ng-forms-rich-text-input.md',
	'ng-select.md',
	'ng-core-select.md',
	'ng-date2.md',
	'ng-pagination.md',
	'ng-icon.md',
	'ng-dialog.md',
	'prisme-core.md',
	'prisme-button.md',
	'prisme-icon.md',
	'stories-forms.md',
	'stories-navigation.md',
	'stories-overlays.md',
	'stories-listings.md',
	'stories-structure.md',
];

const PROBES = [
	{ family: 'header', needle: '# lucca-front — LLM API reference' },
	{ family: 'component selector', needle: '**Selector:** `lu-callout`' },
	{ family: 'component inputs (generated)', needle: '| Input | Type | Default | Required | Description |' },
	{ family: 'component outputs (generated)', needle: '| Output | Type | Description |' },
	{ family: 'deprecation callout', needle: '**Deprecated.**' },
	{ family: 'stories section', needle: '# Storybook usage examples' },
];

const failures = [];

let size = 0;
try {
	size = statSync(llmsFull).size;
} catch {
	console.error(`[llms-smoke] FAIL: ${OUT_LLMS} was not produced — run \`npm run docs:llms\` first.`);
	process.exit(1);
}
if (size === 0) failures.push('llms-full.txt is empty');

const content = readFileSync(llmsFull, 'utf8');
const missing = PROBES.filter((p) => !content.includes(p.needle));
for (const p of PROBES) console.log(`[llms-smoke] ${missing.includes(p) ? 'MISSING' : 'ok'}: ${p.family}`);
if (missing.length) failures.push(`${missing.length} missing probe(s) in llms-full.txt`);

const entries = Number(content.match(/^Public API entries: (\d+)$/m)?.[1] ?? 0);
console.log(`[llms-smoke] ${entries >= MIN_ENTRIES ? 'ok' : 'LOW'}: ${entries} public API entries (floor ${MIN_ENTRIES})`);
if (entries < MIN_ENTRIES) failures.push(`only ${entries} API entries (floor ${MIN_ENTRIES})`);

// Feed-count consistency: every file in llms/ is linked from llms.txt, and both
// feed kinds stay above their floors.
let feeds = [];
let index = '';
try {
	feeds = readdirSync(llmsDir).filter((f) => f.endsWith('.md'));
	index = readFileSync(llmsIndex, 'utf8');
} catch {
	console.error(`[llms-smoke] FAIL: ${OUT_INDEX} or ${OUT_DIR}/ was not produced.`);
	process.exit(1);
}
const entryPointFeeds = feeds.filter((f) => !f.startsWith('stories-'));
const storyFeeds = feeds.filter((f) => f.startsWith('stories-'));
const unlinked = feeds.filter((f) => !index.includes(`/llms/${f})`));
const absentAnchors = EXPECTED_FEEDS.filter((f) => !feeds.includes(f));
console.log(
	`[llms-smoke] ${absentAnchors.length === 0 ? 'ok' : 'MISSING'}: ${EXPECTED_FEEDS.length - absentAnchors.length}/${EXPECTED_FEEDS.length} named feed anchors present`,
);
if (absentAnchors.length) failures.push(`named feed anchor(s) gone: ${absentAnchors.join(', ')}`);
console.log(
	`[llms-smoke] ${entryPointFeeds.length >= MIN_ENTRYPOINT_FILES ? 'ok' : 'LOW'}: ${entryPointFeeds.length} entry-point feeds (floor ${MIN_ENTRYPOINT_FILES})`,
);
console.log(
	`[llms-smoke] ${storyFeeds.length >= MIN_STORY_FILES ? 'ok' : 'LOW'}: ${storyFeeds.length} story-category feeds (floor ${MIN_STORY_FILES})`,
);
console.log(`[llms-smoke] ${unlinked.length === 0 ? 'ok' : 'MISSING'}: llms.txt links every generated feed`);
if (entryPointFeeds.length < MIN_ENTRYPOINT_FILES)
	failures.push(`only ${entryPointFeeds.length} entry-point feeds (floor ${MIN_ENTRYPOINT_FILES})`);
if (storyFeeds.length < MIN_STORY_FILES) failures.push(`only ${storyFeeds.length} story-category feeds (floor ${MIN_STORY_FILES})`);
if (unlinked.length) failures.push(`${unlinked.length} generated feed(s) not linked from llms.txt: ${unlinked.slice(0, 5).join(', ')}`);

// Everything generated is published, not just the index: a URL reaching the feeds through
// JSDoc, a story template or a deprecation entry is as public as one written in llms.txt.
const INTERNAL_HOST = /dd\.lucca\.tech/;
let publishedFiles;
try {
	publishedFiles = [
		{ label: 'llms.txt', text: index },
		{ label: 'llms-full.txt', text: content },
		...feeds.map((name) => ({ label: `llms/${name}`, text: readFileSync(resolve(llmsDir, name), 'utf8') })),
		{ label: 'deprecations.json', text: readFileSync(resolve(root, OUT_DEPRECATIONS), 'utf8') },
	];
} catch (error) {
	console.error(`\n[llms-smoke] FAIL: a generated file could not be read — ${error.message}.`);
	process.exit(1);
}
const leaking = publishedFiles.filter((file) => INTERNAL_HOST.test(file.text)).map((file) => file.label);
if (leaking.length) failures.push(`internal host dd.lucca.tech in ${leaking.join(', ')}`);
console.log(`[llms-smoke] ${leaking.length ? 'FAIL' : 'ok'}: no internal host in any of ${publishedFiles.length} generated files`);

if (failures.length) {
	console.error(`\n[llms-smoke] FAIL: ${failures.join('; ')}.`);
	process.exit(1);
}
console.log(`\n[llms-smoke] OK: llms-full.txt is ${Math.round(size / 1024)} KB, ${feeds.length} windowed feeds all indexed.`);
