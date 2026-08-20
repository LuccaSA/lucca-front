/**
 * The single seam between the manifest and whatever supplies deprecation facts,
 * so the source can be swapped without touching extraction.
 *
 * TEMPORARY: wraps `deprecations.js`, a frozen regex seed with no lifecycle data
 * and no replacements for custom properties. `KINDS` mirrors the `kind` vocabulary
 * of the `deprecations.json` built on tech.scss.deprecation.strategy, whose names
 * match manifest keys 1:1 — adopting it means rewriting `deprecationFor()` here
 * and nothing else.
 */

'use strict';

const { isDeprecatedVariable, classDeprecation } = require('./deprecations');

/**
 * Manifest element kinds that can carry deprecation metadata. Values match the
 * `kind` vocabulary of `deprecations.json` where they overlap.
 */
const KINDS = Object.freeze({
	VARIABLE: 'css-variable',
	CLASS: 'class',
	MIXIN: 'mixin',
});

/**
 * `pr-u-width100\%` → `pr-u-width100%`. Manifest keys are unescaped; sources keyed on
 * raw selectors must be normalised here. A no-op for the current seed, load-bearing for
 * `deprecations.json`, which keeps the escapes — without it the ten `100%` sizing
 * utilities would silently lose their deprecation.
 * @param {string} name
 * @returns {string}
 */
function unescapeCssName(name) {
	return name.replace(/\\(.)/g, '$1');
}

/**
 * Answers "is this element deprecated, and what replaces it".
 *
 * @param {'css-variable'|'class'|'mixin'} kind
 * @param {string} name identifier exactly as it appears in the manifest key
 * @returns {{ replacement?: string, note?: string } | undefined} undefined when the
 *   element is not deprecated. An empty object means "deprecated, no replacement
 *   or note known" — callers must distinguish it from undefined.
 */
function deprecationFor(kind, name) {
	const key = unescapeCssName(name);

	switch (kind) {
		case KINDS.VARIABLE:
			// The seed carries no replacements for custom properties. Intentionally
			// not backfilled by hand: deprecations.json already supplies them.
			return isDeprecatedVariable(key) ? {} : undefined;

		case KINDS.CLASS: {
			const dep = classDeprecation(key);
			if (!dep) {
				return undefined;
			}
			return dep.replacement ? { replacement: dep.replacement } : {};
		}

		case KINDS.MIXIN:
			// No source describes mixin deprecations yet. The manifest schema carries
			// the fields regardless, so consumers need no change when one does.
			return undefined;

		default:
			return undefined;
	}
}

module.exports = { deprecationFor, KINDS };
