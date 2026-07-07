/**
 * Pure model built once per manifest (re)load. No 'vscode' import so it can be
 * unit-tested directly. Downstream providers read only from here.
 */

import { CustomProperty, Manifest, UtilityClass } from './types';

export interface CompletionSeed {
	/** Insertion text and completion label, e.g. `--pr-t-spacings-200` or `pr-u-displayFlex`. */
	name: string;
	/** Short detail shown to the right of the label. */
	detail: string;
	/** Markdown documentation body. */
	documentation: string;
	deprecated: boolean;
}

export interface ManifestIndex {
	readonly properties: ReadonlyMap<string, CustomProperty>;
	readonly utilities: ReadonlyMap<string, UtilityClass>;
	readonly propertyCompletions: readonly CompletionSeed[];
	readonly utilityCompletions: readonly CompletionSeed[];
	/** All utility class names, for close-match suggestions. */
	readonly utilityNames: readonly string[];
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

function propertyDocumentation(name: string, prop: CustomProperty): string {
	const lines: string[] = [];
	if (prop.resolved && prop.resolved !== prop.value) {
		lines.push('```css', `${name}: ${prop.value};`, `/* = ${prop.resolved} */`, '```');
	} else {
		lines.push('```css', `${name}: ${prop.value};`, '```');
	}
	lines.push(`Category: \`${prop.category}\``);
	if (prop.deprecated) {
		lines.push('', `⚠️ **Deprecated**${prop.note ? ` — ${prop.note}` : ''}`);
	}
	return lines.join('\n');
}

function utilityDocumentation(utility: UtilityClass): string {
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
	if (utility.deprecated) {
		const replacement = utility.replacement ? ` — use \`${utility.replacement}\` instead` : '';
		lines.push('', `⚠️ **Deprecated**${replacement}${utility.note ? ` (${utility.note})` : ''}`);
	}
	return lines.join('\n');
}

/** Concise one-line summary of a utility's declarations, for completion detail. */
export function utilityDetail(utility: UtilityClass): string {
	const first = utility.css[0];
	if (!first) {
		return '';
	}
	const condition = first.media ? ' @media' : first.container ? ' @container' : '';
	return first.decls.replace(/ !important/g, '') + condition;
}

export function buildIndex(manifest: Manifest): ManifestIndex {
	const properties = new Map<string, CustomProperty>(Object.entries(manifest.variables));
	const utilities = new Map<string, UtilityClass>(Object.entries(manifest.utilities));

	const propertyCompletions: CompletionSeed[] = [];
	for (const [name, prop] of properties) {
		propertyCompletions.push({
			name,
			detail: formatPropertyValue(prop),
			documentation: propertyDocumentation(name, prop),
			deprecated: Boolean(prop.deprecated),
		});
	}

	const utilityCompletions: CompletionSeed[] = [];
	for (const [name, utility] of utilities) {
		utilityCompletions.push({
			name,
			detail: utilityDetail(utility),
			documentation: utilityDocumentation(utility),
			deprecated: Boolean(utility.deprecated),
		});
	}

	return {
		properties,
		utilities,
		propertyCompletions,
		utilityCompletions,
		utilityNames: [...utilities.keys()],
		variableCount: properties.size,
		utilityCount: utilities.size,
	};
}

/** Builds the hover markdown for a custom property. */
export function propertyHover(name: string, prop: CustomProperty): string {
	return `**\`${name}\`**\n\n${propertyDocumentation(name, prop)}`;
}

/** Builds the hover markdown for a utility class. */
export function utilityHover(name: string, utility: UtilityClass): string {
	return `**\`.${name}\`**\n\n${utilityDocumentation(utility)}`;
}

/** Builds the hover markdown for an unknown utility class, with close matches. */
export function unknownUtilityHover(name: string, suggestions: readonly string[]): string {
	const lines = [`**\`${name}\`** is not a utility class in the installed \`@lucca-front/scss\`.`];
	if (suggestions.length) {
		lines.push('', `Did you mean ${suggestions.map((s) => `\`${s}\``).join(', ')}?`);
	}
	return lines.join('\n');
}
