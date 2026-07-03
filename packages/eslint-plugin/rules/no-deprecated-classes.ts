import { Interpolation, LiteralMap, LiteralPrimitive, RecursiveAstVisitor } from '@angular-eslint/bundled-angular-compiler';
import type { AST } from '@angular-eslint/bundled-angular-compiler';
import type { TSESTree } from '@typescript-eslint/utils';
import { ensureTemplateParser } from '@angular-eslint/utils';
import { createRule } from './create-rule.ts';

export const RULE_NAME = 'no-deprecated-classes';

/**
 * Entry shape of @lucca-front/stylelint-config's LFDeprecatedSelectors.mjs, passed raw.
 * Only RegExp patterns are supported: stylelint's exact-string entries would be near-inert
 * against class attributes, so the schema rejects them loudly instead.
 */
export interface DisallowedObject {
	objectPattern: RegExp[] | RegExp;
	versionDeprecated?: string;
	versionDeleted?: string;
}

export type Options = [{ deprecations: DisallowedObject[] }];

type MessageBuilder = (deprecations: DisallowedObject[], matchedSelector: string) => string;

let messageBuilder: MessageBuilder | undefined;

/**
 * Injects the message formatter (stylelint-config's getDisallowedData) at module level:
 * ESLint structuredClones rule options, so functions cannot travel through them, and
 * the plugin cannot import stylelintForLF.mjs itself (jest cannot load its top-level
 * await chain) — eslint.config.mjs does the injection under Node ESM.
 * The builder receives only the entry that matched, so messages carry that entry's versions.
 */
export function setDeprecationMessageBuilder(builder: MessageBuilder): void {
	messageBuilder = builder;
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
	value?: AST;
	loc: TSESTree.SourceLocation;
}

/**
 * Collects every chunk of an Angular expression that may hold a class list:
 * string literals, ngClass object-literal keys and the static parts of interpolations.
 */
class ClassListCollector extends RecursiveAstVisitor {
	readonly classLists: string[] = [];

	override visitLiteralPrimitive(ast: LiteralPrimitive, context: unknown): void {
		if (typeof ast.value === 'string') {
			this.classLists.push(ast.value);
		}
		super.visitLiteralPrimitive(ast, context);
	}

	override visitLiteralMap(ast: LiteralMap, context: unknown): void {
		// [ngClass]="{ 'palette-grey': cond }": classes are the map keys (spread keys have none)
		this.classLists.push(...ast.keys.flatMap((mapKey) => ('key' in mapKey ? [mapKey.key] : [])));
		super.visitLiteralMap(ast, context);
	}

	override visitInterpolation(ast: Interpolation, context: unknown): void {
		// class="foo {{ expr }}": the static parts form the literal class list
		this.classLists.push(ast.strings.join(' '));
		super.visitInterpolation(ast, context);
	}
}

interface CompiledEntry {
	// All patterns of the entry merged into one alternation
	regex: RegExp;
	// The raw entry, kept so reports are attributed to the entry that actually matched
	source: DisallowedObject;
}

// ESLint calls create() once per linted file with the same options object; compile once per process.
const compiledEntriesCache = new WeakMap<Options[0], CompiledEntry[]>();

function compileEntries(options: Options[0]): CompiledEntry[] {
	let compiled = compiledEntriesCache.get(options);

	if (!compiled) {
		compiled = options.deprecations.map((source) => {
			const patterns = Array.isArray(source.objectPattern) ? source.objectPattern : [source.objectPattern];

			return {
				regex: new RegExp(patterns.map((pattern) => `(?:${pattern.source})`).join('|')),
				source,
			};
		});
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

export default createRule<Options, 'deprecatedClass'>({
	create: (context) => {
		ensureTemplateParser(context);

		// context.options[0] is the raw config-provided object: a stable reference, required as the
		// WeakMap cache key. RuleCreator's defaults-merged options would be a fresh object per file
		// (and are only passed as the unused second create() argument — defaultOptions is inert here;
		// the ?? below is the real default).
		const options = context.options[0] ?? { deprecations: [] };
		const entries = compileEntries(options);

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
						// Only the matching entry is handed to the builder: re-searching the whole
						// list with the matched text could attribute the report to another entry.
						data: { deprecationMessage: messageBuilder?.([entry.source], match[0]) ?? `Deprecated Lucca class usage "${match[0]}"` },
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
					const collector = new ClassListCollector();
					node.value?.visit(collector);

					for (const classList of collector.classLists) {
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
			deprecatedClass: '{{deprecationMessage}}',
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
								// RegExp instances validate as plain objects in JSON schema
								objectPattern: {
									oneOf: [{ type: 'object' }, { type: 'array', items: { type: 'object' }, minItems: 1 }],
								},
								versionDeprecated: { type: 'string' },
								versionDeleted: { type: 'string' },
							},
							required: ['objectPattern'],
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
