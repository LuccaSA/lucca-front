/**
 * CI gate (offline): fails when `@lucca-front/ng`'s public-API JSDoc-description
 * coverage drops below MIN_COVERAGE. "Public API" = the names reachable from the
 * secondary entry-point barrels; "documented" = carries a non-empty JSDoc description
 * in the ts-morph extraction. This is stricter and more meaningful than Compodoc's
 * blanket `--coverageTest`, which also counts internal helpers that are not part of
 * any published surface.
 *
 * Extraction runs in-process (see extract-api.mjs) — no intermediate JSON to stage.
 *
 * Coverage measured at 9% on 2026-07-23 (the library documents its components through
 * Storybook stories rather than class-level JSDoc, so most public exports carry no
 * description). The floor starts below current so it guards against regressions without
 * blocking unrelated PRs — ratchet it up as JSDoc descriptions land.
 */
import { coverageReport, extractSurface } from './generate-llms.mjs';

/** Ratchet floor — raise as JSDoc coverage improves; never lower it. */
export const MIN_COVERAGE = 5;
/** Cap the undocumented-export list so CI logs stay readable. */
const SAMPLE = 30;

const { doc, names } = extractSurface();
const { total, documented, coverage, missing } = coverageReport(doc, names);
const ok = coverage >= MIN_COVERAGE;

console.log(
	`[${ok ? 'PASS' : 'FAIL'}] ${'@lucca-front/ng'}: ${documented}/${total} public exports documented = ${coverage}% (floor ${MIN_COVERAGE}%)`,
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
