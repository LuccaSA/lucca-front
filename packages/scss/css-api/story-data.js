/**
 * Emits the committed dataset the Storybook CSS API explorer reads.
 *
 * Why a committed file rather than importing the manifest from `dist/`: the
 * workflows that build Storybook (`deploy`, `deploy-staging`, `e2e-test`) run
 * `npm ci` then `build-storybook` without `npm run build`, and `build.js` wipes
 * `dist/scss` on every run — so `dist/scss/css-api/manifest.json` is not there to
 * import. `stories/documentation/icons-list.ts` solves the same problem the same
 * way, and this follows it.
 *
 * It is a *view* of the manifest, not a copy: one flat row per element, carrying
 * only what the page displays. A pretty-printed copy of the whole manifest would
 * be several hundred KB of mostly-unread nesting; this keeps the committed
 * artifact something a reviewer can read a diff of.
 *
 * The output is formatted with the repo's own Prettier config, so the committed
 * file always satisfies `prettier --check` and the CI drift guard stays stable.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

const BANNER = `// *******************************************
// *** THIS FILE IS GENERATED, DO NOT EDIT ***
// *** The generator is packages/scss/css-api/generate.js (npm run css-api) ***
// *******************************************
`;

/**
 * Flattens a manifest into the rows the explorer renders.
 * @param {{ variables: object, utilities: object, mixins: object[] }} manifest
 * @returns {object[]}
 */
function toRows(manifest) {
	const rows = [];

	for (const [name, entry] of Object.entries(manifest.variables)) {
		rows.push(
			compact({
				kind: 'variable',
				name,
				group: entry.category,
				value: entry.value,
				resolved: entry.resolved,
				deprecated: entry.deprecated,
				replacement: entry.replacement,
				note: entry.note,
			}),
		);
	}

	for (const [name, entry] of Object.entries(manifest.utilities)) {
		const blocks = entry.css || [];
		// Base declarations are the unconditional blocks; anything behind a media
		// or container query is surfaced separately as a responsive variant.
		const base = blocks.filter((b) => !b.media && !b.container);
		const conditional = blocks.filter((b) => b.media || b.container);
		rows.push(
			compact({
				kind: 'utility',
				name,
				value: base.map(declText).join(' ') || blocks.map(declText).join(' '),
				resolved: base.some((b) => b.resolved) ? base.map((b) => b.resolved || b.decls).join(' ') : undefined,
				variants: conditional.length ? conditional.map((b) => b.media || b.container) : undefined,
				deprecated: entry.deprecated,
				replacement: entry.replacement,
				note: entry.note,
			}),
		);
	}

	for (const mixin of manifest.mixins || []) {
		rows.push(
			compact({
				kind: 'mixin',
				name: `${mixin.namespace}.${mixin.name}`,
				group: mixin.namespace,
				value: mixin.signature,
				import: mixin.import,
				doc: mixin.doc,
				deprecated: mixin.deprecated,
				replacement: mixin.replacement,
				note: mixin.note,
			}),
		);
	}

	rows.sort((a, b) => a.kind.localeCompare(b.kind) || a.name.localeCompare(b.name));
	return rows;
}

/** `decls` prefixed with its pseudo-element when the block targets one. */
function declText(block) {
	return block.sel ? `${block.sel} { ${block.decls} }` : block.decls;
}

/** Drops undefined/false entries so the committed file carries no empty noise. */
function compact(row) {
	const out = {};
	for (const [key, value] of Object.entries(row)) {
		if (value !== undefined && value !== false) {
			out[key] = value;
		}
	}
	return out;
}

/**
 * Writes the story dataset. Async because Prettier 3's formatter is.
 * @param {object} manifest
 * @param {string} output absolute path of the .ts module to write
 * @returns {Promise<number>} number of rows written
 */
async function writeStoryData(manifest, output) {
	const rows = toRows(manifest);
	const source = `${BANNER}
import type { CssApiEntry } from './css-api-types';

export const CssApiList: CssApiEntry[] = ${JSON.stringify(rows, null, '\t')};
`;
	const config = (await prettier.resolveConfig(output, { editorconfig: true })) || {};
	const formatted = await prettier.format(source, { ...config, filepath: output, parser: 'typescript' });

	const dir = path.dirname(output);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
	fs.writeFileSync(output, formatted);
	return rows.length;
}

module.exports = { writeStoryData, toRows };
