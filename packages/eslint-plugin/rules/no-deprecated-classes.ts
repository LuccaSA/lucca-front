import type { TSESTree } from '@typescript-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((ruleName) => ruleName);

export const RULE_NAME = 'no-deprecated-classes';

export const messageIds = {
	deprecatedClass: 'deprecatedClass',
} as const;

/**
 * A deprecation entry, mirroring the shape of @lucca-front/stylelint-config's LFDeprecatedSelectors.
 * `patterns` are regex sources written against CSS selectors (e.g. "\\.mod-link").
 */
interface Deprecation {
	patterns: string[];
	versionDeprecated?: string;
	versionDeleted?: string;
}

type Options = [{ deprecations: Deprecation[] }];

// Minimal shapes of the @angular-eslint/template-parser AST nodes we visit
interface TemplateTextAttribute {
	name: string;
	value: string;
	loc: TSESTree.SourceLocation;
}

interface TemplateBoundAttribute {
	name: string;
	// BindingType from @angular/compiler, preserved by @angular-eslint/template-parser
	__originalType?: number;
	keySpan?: { details?: string | null };
	value?: { source?: string | null };
	loc: TSESTree.SourceLocation;
}

// BindingType.Class in @angular/compiler ([class.foo]="...")
const CLASS_BINDING_TYPE = 2;

const STRING_LITERAL = /'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"/g;
const INTERPOLATION = /\{\{[\s\S]*?\}\}/g;

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

export default createRule<Options, keyof typeof messageIds>({
	create: (context) => {
		const { deprecations } = context.options[0] ?? { deprecations: [] };

		const entries = deprecations.map((deprecation) => ({
			...deprecation,
			regexes: deprecation.patterns.map((pattern) => new RegExp(pattern)),
		}));

		function checkClassList(classList: string, loc: TSESTree.SourceLocation): void {
			const compoundSelector = toCompoundSelector(classList);

			if (!compoundSelector) {
				return;
			}

			for (const entry of entries) {
				for (const regex of entry.regexes) {
					const match = regex.exec(compoundSelector);

					if (match) {
						const versions = [entry.versionDeprecated ? ` | deprecated since LF ${entry.versionDeprecated}` : '', entry.versionDeleted ? ` | removed in LF ${entry.versionDeleted}` : ''].join('');

						context.report({
							messageId: 'deprecatedClass',
							data: { matched: match[0], versions },
							loc,
						});

						// One report per deprecation entry is enough
						break;
					}
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
				const isClassBinding = node.__originalType === CLASS_BINDING_TYPE || Boolean(node.keySpan?.details?.startsWith('class.'));

				if (isClassBinding) {
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
