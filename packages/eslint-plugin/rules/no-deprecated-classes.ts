import type { TSESTree } from '@typescript-eslint/utils';
import { createRule } from './create-rule.ts';

export const RULE_NAME = 'no-deprecated-classes';

/**
 * A deprecation entry. `patterns` are regex sources written against CSS selectors (e.g. "\\.mod-link").
 */
interface Deprecation {
	patterns: string[];
	versionDeprecated?: string;
	versionDeleted?: string;
}

export type Options = [{ deprecations: Deprecation[] }];

/**
 * Entry shape of @lucca-front/stylelint-config's LFDeprecatedSelectors.mjs.
 */
interface LFDeprecatedSelector {
	objectPattern: (RegExp | string)[] | RegExp | string;
	versionDeprecated?: string;
	versionDeleted?: string;
}

// stylelint's comparePatterns treats string entries as exact selector strings, not regexes
function toRegexSource(pattern: RegExp | string): string {
	return pattern instanceof RegExp ? pattern.source : pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Convert the LFDeprecatedSelectors list into this rule's options,
 * keeping the stylelint list as the single source of truth.
 */
export function fromLFDeprecatedSelectors(selectors: LFDeprecatedSelector[]): Options[0] {
	return {
		deprecations: selectors.map(({ objectPattern, versionDeprecated, versionDeleted }) => ({
			patterns: (Array.isArray(objectPattern) ? objectPattern : [objectPattern]).map(toRegexSource),
			...(versionDeprecated && { versionDeprecated }),
			...(versionDeleted && { versionDeleted }),
		})),
	};
}

// Minimal shapes of the @angular-eslint/template-parser AST nodes we visit
interface TemplateTextAttribute {
	name: string;
	value: string;
	loc: TSESTree.SourceLocation;
}

interface TemplateBoundAttribute {
	name: string;
	keySpan?: { details?: string | null };
	value?: { source?: string | null };
	loc: TSESTree.SourceLocation;
}

const STRING_LITERAL = /'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"/g;
const INTERPOLATION = /\{\{[\s\S]*?\}\}/g;

interface CompiledEntry {
	regex: RegExp;
	versions: string;
}

// ESLint calls create() once per linted file with the same options object; compile once per process.
const compiledEntriesCache = new WeakMap<Options[0], CompiledEntry[]>();

function compileEntries(options: Options[0]): CompiledEntry[] {
	let compiled = compiledEntriesCache.get(options);

	if (!compiled) {
		compiled = options.deprecations.map((deprecation) => ({
			regex: new RegExp(deprecation.patterns.map((pattern) => `(?:${pattern})`).join('|')),
			versions: [
				deprecation.versionDeprecated ? ` | deprecated since LF ${deprecation.versionDeprecated}` : '',
				deprecation.versionDeleted ? ` | removed in LF ${deprecation.versionDeleted}` : '',
			].join(''),
		}));
		compiledEntriesCache.set(options, compiled);
	}

	return compiled;
}

/**
 * Convert a whitespace-separated class list into a CSS compound selector
 * (e.g. "button mod-counter" -> ".button.mod-counter") so that the selector
 * regexes from LFDeprecatedSelectors can be applied verbatim.
 */
function toCompoundSelector(classList: string): string {
	return classList
		.split(/\s+/)
		.filter(Boolean)
		.map((token) => `.${token}`)
		.join('');
}

/**
 * Extract every chunk of an Angular expression that may hold a class list:
 * the static parts of an interpolation, and every string literal.
 */
function classListsFromExpression(source: string): string[] {
	const classLists: string[] = [];

	const staticParts = source.replace(INTERPOLATION, ' ');
	if (staticParts !== source) {
		classLists.push(staticParts);
	}

	for (const match of source.matchAll(STRING_LITERAL)) {
		classLists.push(match[1] ?? match[2]);
	}

	return classLists;
}

export default createRule<Options, 'deprecatedClass'>({
	create: (context) => {
		const entries = compileEntries(context.options[0] ?? { deprecations: [] });

		function checkClassList(classList: string, loc: TSESTree.SourceLocation): void {
			const compoundSelector = toCompoundSelector(classList);

			if (!compoundSelector) {
				return;
			}

			for (const entry of entries) {
				const match = entry.regex.exec(compoundSelector);

				if (match) {
					context.report({
						messageId: 'deprecatedClass',
						data: { matched: match[0], versions: entry.versions },
						loc,
					});
				}
			}
		}

		return {
			TextAttribute(node: TemplateTextAttribute) {
				if (node.name === 'class' || node.name === 'ngClass') {
					checkClassList(node.value, node.loc);
				}
			},
			BoundAttribute(node: TemplateBoundAttribute) {
				if (node.keySpan?.details?.startsWith('class.')) {
					// [class.foo]="condition": the class name is the attribute name itself
					checkClassList(node.name, node.loc);
					return;
				}

				if (node.name === 'class' || node.name === 'ngClass') {
					// [class]="expr", [attr.class]="expr", [ngClass]="expr" or class="{{ expr }}"
					for (const classList of classListsFromExpression(node.value?.source ?? '')) {
						checkClassList(classList, node.loc);
					}
				}
			},
		};
	},
	name: RULE_NAME,
	meta: {
		docs: {
			description: 'Disallow deprecated Lucca Front CSS classes in Angular templates',
		},
		messages: {
			deprecatedClass: 'Deprecated Lucca class usage "{{matched}}"{{versions}}',
		},
		type: 'problem',
		schema: [
			{
				type: 'object',
				properties: {
					deprecations: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								patterns: {
									type: 'array',
									items: { type: 'string' },
									minItems: 1,
								},
								versionDeprecated: { type: 'string' },
								versionDeleted: { type: 'string' },
							},
							required: ['patterns'],
							additionalProperties: false,
						},
					},
				},
				required: ['deprecations'],
				additionalProperties: false,
			},
		],
	},
	defaultOptions: [{ deprecations: [] }],
});
