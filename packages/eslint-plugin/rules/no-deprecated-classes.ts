import { Interpolation, LiteralMap, LiteralPrimitive, RecursiveAstVisitor } from '@angular-eslint/bundled-angular-compiler';
import type { AST } from '@angular-eslint/bundled-angular-compiler';
import type { TSESTree } from '@typescript-eslint/utils';
import { ensureTemplateParser } from '@angular-eslint/utils';
import { createRule } from './create-rule.ts';

export const RULE_NAME = 'no-deprecated-classes';

/** An entry of @lucca-front/stylelint-config's LFDeprecatedSelectors.mjs, passed raw (RegExp only). */
export interface DisallowedObject {
	objectPattern: RegExp[] | RegExp;
	versionDeprecated?: string;
	versionDeleted?: string;
}

export type Options = [{ deprecations: DisallowedObject[] }];

type MessageBuilder = (deprecations: DisallowedObject[], matchedSelector: string) => string;

let messageBuilder: MessageBuilder | undefined;

/**
 * Injects the message formatter. Done at module level because ESLint structuredClones rule options
 * (a function can't travel through them) and the plugin can't import stylelintForLF.mjs directly
 * (jest chokes on its top-level await). eslint.config.mjs wires stylelint-config's getDisallowedData.
 */
export function setDeprecationMessageBuilder(builder: MessageBuilder): void {
	messageBuilder = builder;
}

// Shapes of the @angular-eslint/template-parser nodes we visit.
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

const isClassAttr = (name: string): boolean => name === 'class' || name === 'ngClass';

/** Collects class-list chunks from an expression: string literals, ngClass keys, interpolation statics. */
class ClassListCollector extends RecursiveAstVisitor {
	readonly classLists: string[] = [];

	override visitLiteralPrimitive(ast: LiteralPrimitive, context: unknown): void {
		if (typeof ast.value === 'string') this.classLists.push(ast.value);
		super.visitLiteralPrimitive(ast, context);
	}

	override visitLiteralMap(ast: LiteralMap, context: unknown): void {
		// [ngClass]="{ 'palette-grey': cond }" — classes are the keys (spread keys have none).
		this.classLists.push(...ast.keys.flatMap((k) => ('key' in k ? [k.key] : [])));
		super.visitLiteralMap(ast, context);
	}

	override visitInterpolation(ast: Interpolation, context: unknown): void {
		// A fragment touching {{…}} is an incomplete token (class="u-textLight{{ x }}"); keep whole ones.
		const last = ast.strings.length - 1;
		const whole = ast.strings.map((part, i) => {
			if (i > 0) part = part.replace(/^\S+/, '');
			if (i < last) part = part.replace(/\S+$/, '');
			return part;
		});
		this.classLists.push(whole.join(' '));
		super.visitInterpolation(ast, context);
	}
}

/** "button mod-counter" -> ".button.mod-counter", so the selector regexes apply verbatim. */
const toCompoundSelector = (classList: string): string =>
	classList
		.split(/\s+/)
		.filter(Boolean)
		.map((t) => `.${t}`)
		.join('');

export default createRule<Options, 'deprecatedClass'>({
	create: (context) => {
		ensureTemplateParser(context);

		// defaultOptions is inert with an arrow create(), so ?? is the real default.
		const { deprecations } = context.options[0] ?? { deprecations: [] };
		const entries = deprecations.map((source) => {
			const patterns = Array.isArray(source.objectPattern) ? source.objectPattern : [source.objectPattern];
			return { regex: new RegExp(patterns.map((p) => `(?:${p.source})`).join('|')), source };
		});

		function check(classList: string, loc: TSESTree.SourceLocation): void {
			const selector = toCompoundSelector(classList);
			for (const { regex, source } of entries) {
				const match = regex.exec(selector);
				// Pass only the matching entry: re-searching the list could pick another entry's versions.
				if (match) context.report({ messageId: 'deprecatedClass', loc, data: { deprecationMessage: messageBuilder?.([source], match[0]) ?? `Deprecated Lucca class usage "${match[0]}"` } });
			}
		}

		return {
			TextAttribute(node: TemplateTextAttribute) {
				if (isClassAttr(node.name)) check(node.value, node.loc);
			},
			BoundAttribute(node: TemplateBoundAttribute) {
				if (node.keySpan?.details?.startsWith('class.')) {
					check(node.name, node.loc); // [class.foo]="cond" — the class name is the attribute name
				} else if (isClassAttr(node.name)) {
					// [class]/[attr.class]/[ngClass]="expr" or class="{{ expr }}"
					const collector = new ClassListCollector();
					node.value?.visit(collector);
					collector.classLists.forEach((list) => check(list, node.loc));
				}
			},
		};
	},
	name: RULE_NAME,
	meta: {
		docs: { description: 'Disallow deprecated Lucca Front CSS classes in Angular templates' },
		messages: { deprecatedClass: '{{deprecationMessage}}' },
		type: 'problem',
		schema: [
			{
				type: 'object',
				properties: {
					deprecations: {
						type: 'array',
						items: {
							type: 'object',
							// RegExp instances validate as plain objects in JSON schema.
							properties: {
								objectPattern: { oneOf: [{ type: 'object' }, { type: 'array', items: { type: 'object' }, minItems: 1 }] },
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
