/**
 * Build-time step for the npm channel of the doc-for-LLM epic: write each published
 * package's self-sufficient `llms-full.txt` into its ng-packagr dist folder, so
 * `npm publish` (publish.yml, no `files` allowlist) ships it and agents read the
 * doc from `node_modules/@lucca-front/ng/llms-full.txt` at the exact installed
 * version — no fetch, no auth.
 *
 * Runs after `build:ng` in the `build` script; also acts as the committed guardrail:
 * it FAILS the build when a package's extraction collapses below its floor or when
 * its dist folder is missing (packaging silently dropping the doc is the failure
 * mode this prevents).
 */
import { existsSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { extractSurface, renderPackageLlms, selectPublicApi } from './generate-llms.mjs';

const root = resolve(fileURLToPath(import.meta.url), '..', '..', '..');

/** dist folder and collapse floor per published package (floors are ratchets). */
const PACK_TARGETS = [
	{ name: '@lucca-front/ng', dist: 'dist/ng', minEntries: 500 },
	{ name: '@lucca/prisme', dist: 'dist/prisme', minEntries: 5 },
];

const { entryPoints } = extractSurface(root);
const failures = [];

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
	writeFileSync(join(distDir, 'llms-full.txt'), renderPackageLlms(target.name, entries));
	console.log(`[llms-pack] ${target.name}: ${total} API entries → ${target.dist}/llms-full.txt`);
}

if (failures.length) {
	console.error(`\n[llms-pack] FAIL: ${failures.join('; ')}.`);
	process.exit(1);
}
console.log('\n[llms-pack] OK: every published package carries its llms-full.txt.');
