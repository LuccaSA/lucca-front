/**
 * The single seam between the CSS API manifest and whatever supplies deprecation
 * facts. `generate.js` never talks to a deprecation source directly — it asks
 * this module, so the source can be replaced without touching extraction.
 *
 * TEMPORARY SOURCE. Today this wraps `deprecations.js`, a frozen regex seed that
 * only covers names generated inside SCSS loops (which cannot carry an inline
 * annotation). It knows nothing about lifecycle, and supplies no replacements for
 * custom properties.
 *
 * The structured registry being built on `tech.scss.deprecation.strategy` emits
 * `css-api/deprecations.json`, whose entries are shaped:
 *
 *   { kind, name, replacement, note, since, scope }
 *
 * with `kind` one of 'class' | 'css-variable' | 'selector' | 'sass-api', and
 * `name` a raw identifier that matches manifest keys 1:1 (e.g. `pr-u-borderBottom0`
 * → `pr-u-borderBlockEnd0`). The `kind` values below deliberately mirror that
 * vocabulary, so adopting it means rewriting the body of `deprecationFor()` here
 * — an index lookup over that file — and nothing else in the generator.
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
 * Answers "is this element deprecated, and what replaces it".
 *
 * @param {'css-variable'|'class'|'mixin'} kind
 * @param {string} name identifier exactly as it appears in the manifest key
 * @returns {{ replacement?: string, note?: string } | undefined} undefined when the
 *   element is not deprecated. An empty object means "deprecated, no replacement
 *   or note known" — callers must distinguish it from undefined.
 */
function deprecationFor(kind, name) {
	switch (kind) {
		case KINDS.VARIABLE:
			// The seed carries no replacements for custom properties. Intentionally
			// not backfilled by hand: deprecations.json already supplies them.
			return isDeprecatedVariable(name) ? {} : undefined;

		case KINDS.CLASS: {
			const dep = classDeprecation(name);
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
