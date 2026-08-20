/**
 * Pure model built once per manifest (re)load. No 'vscode' import so it can be
 * unit-tested directly. Downstream providers read only from here.
 */

import { CustomProperty, Manifest, ManifestConfig, MixinDef, UtilityClass } from './types';
import { UTILITY_PREFIX } from '../constants';

export interface CompletionSeed {
	/** Insertion text and completion label, e.g. `--pr-t-spacings-200` or `pr-u-displayFlex`. */
	name: string;
	/** Short detail shown to the right of the label. */
	detail: string;
	/** Markdown documentation body, with the deprecation notice included. */
	documentation: string;
	/** Same documentation with the deprecation notice omitted (experimental toggle off). */
	documentationNoDep: string;
	deprecated: boolean;
}

export interface ManifestIndex {
	readonly properties: ReadonlyMap<string, CustomProperty>;
	readonly utilities: ReadonlyMap<string, UtilityClass>;
	readonly propertyCompletions: readonly CompletionSeed[];
	/** Suggestable utilities only — excludes the legacy unprefixed `u-*` twins. */
	readonly utilityCompletions: readonly CompletionSeed[];
	/** All utility class names, for close-match suggestions. */
	readonly utilityNames: readonly string[];
	/** Build flags the surface was compiled with; empty when the manifest predates it. */
	readonly config: ManifestConfig;
	/** Consumer-facing mixins (empty when the manifest predates mixin support). */
	readonly mixins: readonly MixinDef[];
	/** Mixins keyed by `namespace.name`, for hover/diagnostics lookup. */
	readonly mixinLookup: ReadonlyMap<string, MixinDef>;
	/** Namespace → `@use` import path, for auto-import. */
	readonly mixinNamespaces: ReadonlyMap<string, string>;
	readonly variableCount: number;
	readonly utilityCount: number;
}

/**
 * Formats a custom property's value for display (prefers the resolved value,
 * shows the raw token chain alongside when it differs).
 */
export function formatPropertyValue(prop: CustomProperty): string {
	if (prop.resolved && prop.resolved !== prop.value) {
		return `${prop.resolved} (${prop.value})`;
	}
	return prop.value;
}

function propertyDocumentation(name: string, prop: CustomProperty, showDeprecation = true): string {
	const lines: string[] = [];
	if (prop.resolved && prop.resolved !== prop.value) {
		lines.push('```css', `${name}: ${prop.value};`, `/* = ${prop.resolved} */`, '```');
	} else {
		lines.push('```css', `${name}: ${prop.value};`, '```');
	}
	lines.push(`Category: \`${prop.category}\``);
	if (showDeprecation && prop.deprecated) {
		const replacement = prop.replacement ? ` — use \`${prop.replacement}\` instead` : '';
		lines.push('', `⚠️ **Deprecated**${replacement}${prop.note ? ` (${prop.note})` : ''}`);
	}
	return lines.join('\n');
}

function utilityDocumentation(utility: UtilityClass, showDeprecation = true): string {
	const lines: string[] = [];
	for (const block of utility.css) {
		const condition = block.media ? `@media ${block.media}` : block.container ? `@container ${block.container}` : undefined;
		const selectorNote = block.sel ? `/* &${block.sel} */\n` : '';
		// When declarations reference custom properties, show the resolved values
		// as a comment beneath, keeping the token relationship visible.
		const resolvedNote = block.resolved && block.resolved !== block.decls ? `\n/* = ${block.resolved.replace(/ !important/g, '')} */` : '';
		if (condition) {
			lines.push('```css', `${condition} {`, `  ${selectorNote}${block.decls};${resolvedNote}`, '}', '```');
		} else {
			lines.push('```css', `${selectorNote}${block.decls};${resolvedNote}`, '```');
		}
	}
	if (showDeprecation && utility.deprecated) {
		const replacement = utility.replacement ? ` — use \`${utility.replacement}\` instead` : '';
		lines.push('', `⚠️ **Deprecated**${replacement}${utility.note ? ` (${utility.note})` : ''}`);
	}
	return lines.join('\n');
}

/**
 * Concise one-line summary of a utility's declarations, for completion detail.
 * Names the block's qualifier — without it `pr-u-clearfix` reads as if it set
 * `display: table` on the element itself rather than on `::before`.
 */
export function utilityDetail(utility: UtilityClass): string {
	const first = utility.css[0];
	if (!first) {
		return '';
	}
	const qualifiers: string[] = [];
	if (first.sel) {
		qualifiers.push(`&${first.sel}`);
	}
	if (first.media) {
		qualifiers.push('@media');
	}
	if (first.container) {
		qualifiers.push('@container');
	}
	return first.decls.replace(/ !important/g, '') + (qualifiers.length ? ` ${qualifiers.join(' ')}` : '');
}

export function buildIndex(manifest: Manifest): ManifestIndex {
	const properties = new Map<string, CustomProperty>(Object.entries(manifest.variables));
	const utilities = new Map<string, UtilityClass>(Object.entries(manifest.utilities));

	const propertyCompletions: CompletionSeed[] = [];
	for (const [name, prop] of properties) {
		propertyCompletions.push({
			name,
			detail: formatPropertyValue(prop),
			documentation: propertyDocumentation(name, prop, true),
			documentationNoDep: propertyDocumentation(name, prop, false),
			deprecated: Boolean(prop.deprecated),
		});
	}

	const utilityCompletions: CompletionSeed[] = [];
	for (const [name, utility] of utilities) {
		// The legacy `u-*` twins only exist when the library was built with
		// `deprecatedUtilityPrefix`, so never suggest them. They stay in `utilities`
		// so hover and diagnostics still explain existing code.
		if (!name.startsWith(UTILITY_PREFIX)) {
			continue;
		}
		utilityCompletions.push({
			name,
			detail: utilityDetail(utility),
			documentation: utilityDocumentation(utility, true),
			documentationNoDep: utilityDocumentation(utility, false),
			deprecated: Boolean(utility.deprecated),
		});
	}

	const mixins = manifest.mixins ?? [];
	const mixinLookup = new Map<string, MixinDef>();
	const mixinNamespaces = new Map<string, string>();
	for (const mixin of mixins) {
		mixinLookup.set(`${mixin.namespace}.${mixin.name}`, mixin);
		if (!mixinNamespaces.has(mixin.namespace)) {
			mixinNamespaces.set(mixin.namespace, mixin.import);
		}
	}

	return {
		properties,
		utilities,
		propertyCompletions,
		utilityCompletions,
		utilityNames: [...utilities.keys()],
		config: manifest.config ?? {},
		mixins,
		mixinLookup,
		mixinNamespaces,
		variableCount: properties.size,
		utilityCount: utilities.size,
	};
}

/** Markdown documentation body for a mixin (signature, doc, import hint). */
export function mixinDocumentation(mixin: MixinDef): string {
	const lines = ['```scss', `@include ${mixin.namespace}.${mixin.signature};`, '```'];
	if (mixin.doc) {
		lines.push('', mixin.doc);
	}
	lines.push('', `Import: \`@use '${mixin.import}';\``);
	return lines.join('\n');
}

/** Hover markdown for a mixin; notes when its namespace isn't imported in the file. */
export function mixinHover(mixin: MixinDef, imported: boolean): string {
	const lines = [`**\`${mixin.namespace}.${mixin.name}\`**`, '', mixinDocumentation(mixin)];
	if (!imported) {
		lines.push('', `⚠️ Namespace \`${mixin.namespace}\` is not imported in this file — use the Quick Fix (Ctrl+.) to add \`@use '${mixin.import}';\`.`);
	}
	return lines.join('\n');
}

/** Builds the hover markdown for a custom property. */
export function propertyHover(name: string, prop: CustomProperty, showDeprecation = true): string {
	return `**\`${name}\`**\n\n${propertyDocumentation(name, prop, showDeprecation)}`;
}

/** Builds the hover markdown for a utility class. */
export function utilityHover(name: string, utility: UtilityClass, showDeprecation = true, config?: ManifestConfig): string {
	const lines = [`**\`.${name}\`**`, '', utilityDocumentation(utility, showDeprecation)];
	if (config?.deprecatedUtilityPrefix && !name.startsWith(UTILITY_PREFIX)) {
		lines.push('', `⚠️ Emitted only when \`@lucca-front/scss\` is built with \`$deprecatedUtilityPrefix\`, so it may not exist in your build.`);
	}
	return lines.join('\n');
}

/** Builds the hover markdown for an unknown utility class, with close matches. */
export function unknownUtilityHover(name: string, suggestions: readonly string[]): string {
	const lines = [`**\`${name}\`** is not a utility class in the installed \`@lucca-front/scss\`.`];
	if (suggestions.length) {
		lines.push('', `Did you mean ${suggestions.map((s) => `\`${s}\``).join(', ')}?`);
	}
	return lines.join('\n');
}
