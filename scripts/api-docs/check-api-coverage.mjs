/**
 * CI gate (offline): fails when @lucca-front/ng's public-API JSDoc-description
 * coverage drops below MIN_COVERAGE. "Public API" = the names reachable from the
 * secondary entry-point barrels; "documented" = carries a non-empty JSDoc
 * description in the Compodoc extraction. This is stricter and more meaningful
 * than Compodoc's blanket `--coverageTest`, which also counts internal helpers
 * that are not part of any published surface.
 *
 * Reads .storybook/documentation.json — run `npm run docs:api-json` first.
 *
 * Coverage measured at 9% on 2026-07-21 (the library documents its components
 * through Storybook stories rather than class-level JSDoc, so most public
 * exports carry no description). The floor starts below current so it guards
 * against regressions without blocking unrelated PRs — ratchet it up as JSDoc
 * descriptions land.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { collectPublicSurface, coverageReport, DOC_PATH } from './generate-llms.mjs';

/** Ratchet floor — raise as JSDoc coverage improves; never lower it. */
export const MIN_COVERAGE = 5;
/** Cap the undocumented-export list so CI logs stay readable. */
const SAMPLE = 30;

const root = resolve(import.meta.dirname, '..', '..');
const doc = JSON.parse(readFileSync(resolve(root, DOC_PATH), 'utf8'));
const surface = collectPublicSurface(root);
const { total, documented, coverage, missing, external } = coverageReport(doc, surface);
const ok = coverage >= MIN_COVERAGE;

console.log(
	`[${ok ? 'PASS' : 'FAIL'}] @lucca-front/ng: ${documented}/${total} public exports documented = ${coverage}% (floor ${MIN_COVERAGE}%)`,
);
console.log(
	`        ${external.length} barrel names are external re-exports (documented in their own package), excluded from the denominator.`,
);
if (missing.length) {
	const shown = missing.slice(0, SAMPLE);
	console.log(
		`        ${missing.length} undocumented public exports (showing ${shown.length}): ${shown.join(', ')}${missing.length > SAMPLE ? ', …' : ''}`,
	);
}

if (!ok) {
	console.error(`\n↳ below the ${MIN_COVERAGE}% floor — add JSDoc descriptions to the undocumented exports above.`);
	process.exit(1);
}
console.log('\nPublic-API documentation coverage OK.');
