/**
 * CI gate (offline): fails when `@lucca-front/ng` loses documented public API.
 * "Public API" = the names reachable from the secondary entry-point barrels;
 * "documented" = carries a non-empty JSDoc description in the ts-morph extraction.
 *
 * Extraction runs in-process (see extract-api.mjs) — no intermediate JSON to stage.
 */
import { coverageReport, extractSurface } from './generate-llms.mjs';

/** Non-decreasing count, not a ratio: a floor under current tolerates deleting docs, a floor at it fails on new undocumented exports. */
export const MIN_DOCUMENTED = 105;
/** Cap the undocumented-export list so CI logs stay readable. */
const SAMPLE = 30;

const { doc, names } = extractSurface();
const { total, documented, coverage, missing } = coverageReport(doc, names);
const ok = documented >= MIN_DOCUMENTED;

console.log(
	`[${ok ? 'PASS' : 'FAIL'}] @lucca-front/ng + @lucca/prisme: ${documented}/${total} public exports documented = ${coverage}% (baseline ${MIN_DOCUMENTED} documented)`,
);
if (missing.length) {
	const shown = missing.slice(0, SAMPLE);
	console.log(
		`        ${missing.length} undocumented public exports (showing ${shown.length}): ${shown.join(', ')}${missing.length > SAMPLE ? ', …' : ''}`,
	);
}

if (!ok) {
	console.error(
		`\n↳ ${MIN_DOCUMENTED - documented} public export(s) lost their JSDoc description since the baseline — restore them, or lower MIN_DOCUMENTED in the same commit with the reason.`,
	);
	process.exit(1);
}
if (documented > MIN_DOCUMENTED) {
	console.log(`\n↳ ${documented - MIN_DOCUMENTED} above the baseline — raise MIN_DOCUMENTED to ${documented} to lock the gain in.`);
}
console.log('\nPublic-API documentation coverage OK.');
