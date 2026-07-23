/**
 * CI smoke test (offline), run AFTER the generator: asserts the single LLM surface
 * actually built and carries every API family. Guards the whole chain end-to-end —
 * a broken extraction or renderer would leave one of these markers missing even when
 * the generator "succeeded".
 *
 * The file is generator-only content (no hand-written prose is aggregated into it),
 * so structural markers are safe probes here. One probe per API family so a silent
 * drop in any of them fails the build, plus a floor on the entry count to catch a
 * surface that collapses toward empty (e.g. a resolver regression):
 *   - the generated header (generation ran)
 *   - a rendered component selector (component + selector extraction)
 *   - the inputs table header (the signal-input surface — the whole point)
 *   - the outputs table header
 *   - a deprecation callout (deprecation metadata rendered)
 */
import { readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

import { OUT_LLMS } from './generate-llms.mjs';

const root = resolve(import.meta.dirname, '..', '..');
const llmsFull = resolve(root, OUT_LLMS);

/** The extraction is far above this today (~1000); the floor only catches a collapse. */
const MIN_ENTRIES = 500;

const PROBES = [
	{ family: 'header', needle: '# @lucca-front/ng — LLM API reference' },
	{ family: 'component selector', needle: '**Selector:** `lu-callout`' },
	{ family: 'component inputs (generated)', needle: '| Input | Type | Default | Required | Description |' },
	{ family: 'component outputs (generated)', needle: '| Output | Type | Description |' },
	{ family: 'deprecation callout', needle: '**Deprecated.**' },
];

let size = 0;
try {
	size = statSync(llmsFull).size;
} catch {
	console.error(`[llms-smoke] FAIL: ${OUT_LLMS} was not produced — run \`npm run docs:llms\` first.`);
	process.exit(1);
}
if (size === 0) {
	console.error('[llms-smoke] FAIL: llms-full.txt is empty.');
	process.exit(1);
}

const content = readFileSync(llmsFull, 'utf8');
const missing = PROBES.filter((p) => !content.includes(p.needle));
for (const p of PROBES) console.log(`[llms-smoke] ${missing.includes(p) ? 'MISSING' : 'ok'}: ${p.family}`);

const entries = Number(content.match(/^Public API entries: (\d+)$/m)?.[1] ?? 0);
const enoughEntries = entries >= MIN_ENTRIES;
console.log(`[llms-smoke] ${enoughEntries ? 'ok' : 'LOW'}: ${entries} public API entries (floor ${MIN_ENTRIES})`);

if (missing.length || !enoughEntries) {
	console.error(
		`\n[llms-smoke] FAIL: ${missing.length} missing API family probe(s)${enoughEntries ? '' : ` and only ${entries} entries`}.`,
	);
	process.exit(1);
}
console.log(`\n[llms-smoke] OK: llms-full.txt is ${Math.round(size / 1024)} KB and carries every API family.`);
