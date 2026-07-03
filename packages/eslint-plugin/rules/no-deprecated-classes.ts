import { Interpolation, LiteralMap, LiteralPrimitive, RecursiveAstVisitor } from '@angular-eslint/bundled-angular-compiler';
import type { AST } from '@angular-eslint/bundled-angular-compiler';
import type { TSESTree } from '@typescript-eslint/utils';
import { createRule } from './create-rule.ts';

export const RULE_NAME = 'no-deprecated-classes';

/**
 * Entry shape of @lucca-front/stylelint-config's LFDeprecatedSelectors.mjs, passed raw.
 */
export interface DisallowedObject {
	objectPattern: (RegExp | string)[] | RegExp | string;
	versionDeprecated?: string;
	versionDeleted?: string;
}

export type Options = [{ deprecations: DisallowedObject[] }];

type MessageBuilder = (deprecations: DisallowedObject[], matchedSelector: string) => string;

let messageBuilder: MessageBuilder | undefined;

/**
 * Injects the message formatter (stylelint-config's getDisallowedData) at module level:
 * ESLint structuredClones rule options, so functions cannot travel through them, and
 * jest cannot load stylelintForLF.mjs (top-level await) — index.ts does it under Node ESM.
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
	// All RegExp patterns of the entry merged into one alternation
	regex?: RegExp;
	// String patterns are exact selector matches, mirroring stylelint's comparePatterns
	strings: string[];
}

// ESLint calls create() once per linted file with the same options object; compile once per process.
const compiledEntriesCache = new WeakMap<Options[0], CompiledEntry[]>();

function compileEntries(options: Options[0]): CompiledEntry[] {
	let compiled = compiledEntriesCache.get(options);

	if (!compiled) {
		compiled = options.deprecations.map(({ objectPattern }) => {
			const patterns = Array.isArray(objectPattern) ? objectPattern : [objectPattern];
			// `instanceof RegExp` is realm-sensitive (options are structuredCloned, jest runs in a vm):
			// duck-type on `source` instead
			const regexSources = patterns.filter((pattern): pattern is RegExp => typeof pattern === 'object' && pattern !== null && 'source' in pattern).map((pattern) => `(?:${pattern.source})`);

			return {
				...(regexSources.length && { regex: new RegExp(regexSources.join('|')) }),
				strings: patterns.filter((pattern): pattern is string => typeof pattern === 'string'),
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
		// context.options[0] is the raw config-provided object: a stable reference, required as the
		// WeakMap cache key. RuleCreator's defaults-merged options would be a fresh object per file.
		const options = context.options[0] ?? { deprecations: [] };
		const entries = compileEntries(options);

		function checkClassList(classList: string, loc: TSESTree.SourceLocation): void {
			const compoundSelector = toCompoundSelector(classList);

			if (!compoundSelector) {
				return;
			}

			for (const entry of entries) {
				const matched = entry.regex?.exec(compoundSelector)?.[0] ?? entry.strings.find((pattern) => pattern === compoundSelector);

				if (matched) {
					context.report({
						messageId: 'deprecatedClass',
						data: { deprecationMessage: messageBuilder?.(options.deprecations, matched) ?? `Deprecated Lucca class usage "${matched}"` },
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
							required: ['objectPattern'],
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
