import type { TSESTree } from '@typescript-eslint/utils';
import { ESLintUtils, TSESLint } from '@typescript-eslint/utils';
import * as ts from 'typescript';
import { DiagnosticCategory, forEachChild } from 'typescript';

const createRule = ESLintUtils.RuleCreator((ruleName) => ruleName);

export const RULE_NAME = 'ts-error';

export const messageIds = {
	tsError: 'tsError',
};

export default createRule({
	create: (context) => {
		const parserServices = ESLintUtils.getParserServices(context);
		return {
			Program(node) {
				const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
				const semErrors = parserServices.program.getSemanticDiagnostics(tsNode);

				if (!semErrors.length) {
					return;
				}

				const uniqueErrors = new Map<string, ts.Diagnostic>();
				for (const error of semErrors) {
					if (!error.file || error.file.fileName !== tsNode.fileName) {
						continue;
					}
					if (error.reportsUnnecessary) continue;
					if (error.category !== DiagnosticCategory.Error) continue;
					if (error.start === undefined || error.length === undefined) {
						continue;
					}

					const errorKey = `${error.start}-${error.length}-${error.code}`;
					if (!uniqueErrors.has(errorKey)) {
						uniqueErrors.set(errorKey, error);
					}
				}

				for (const error of uniqueErrors.values()) {
					const errorMessage = typeof error.messageText === 'string' ? error.messageText : error.messageText.messageText;

					// error.start et error.length sont garantis non-undefined par le filtre ci-dessus
					const errorStart = error.start ?? 0;
					const errorLength = error.length ?? 0;
					const errorFile = error.file;

					if (!errorFile) continue;

					const start = errorFile.getLineAndCharacterOfPosition(errorStart);
					const end = errorFile.getLineAndCharacterOfPosition(errorStart + errorLength);

					const reportData: {
						messageId: 'tsError';
						data: { message: string; code: number };
						loc: TSESTree.SourceLocation;
						fix?: TSESLint.ReportFixFunction;
					} = {
						messageId: 'tsError',
						data: {
							message: errorMessage,
							code: error.code,
						},
						loc: {
							start: { line: start.line + 1, column: start.character },
							end: { line: end.line + 1, column: end.character },
						},
					};

					const fix = createAutoFixForError(context, error.code, errorStart, errorLength, tsNode);
					if (fix) {
						reportData.fix = fix;
					}

					context.report(reportData);
				}
			},
		};
	},
	name: RULE_NAME,
	meta: {
		docs: {
			description: 'Enforce TypeScript compliance based on tsconfig.json configuration',
		},
		fixable: 'code',
		messages: {
			tsError: 'TS{{code}}: {{message}}',
		},
		type: 'problem',
		schema: [
			{
				type: 'object',
				properties: {},
				additionalProperties: false,
			},
		],
	},
	defaultOptions: [{}],
});

/**
 * TypeScript error code registry for auto-fix capabilities.
 * Based on TypeScript's native codeFixProvider.ts patterns.
 *
 * 🔧 Automatic Fix Generator for Null/Undefined Safety Issues
 *
 * Based on TypeScript's codeFixProvider patterns for 2532, 2533, 2531, 18048, 18047, 18049, 2722.
 * Converts unsafe property access to optional chaining:
 *
 * - user.profile.name → user.profile?.name (2532/2533/2531/18048/18047/18049)
 * - user.getProfile().name → user.getProfile()?.name (2722)
 */
const AUTO_FIX_REGISTRY: Record<number, typeof createOptionalChainingFix> = {
	// Only include codes with actual auto-fix implementations
	2532: createOptionalChainingFix, // Object is possibly 'undefined'
	2533: createOptionalChainingFix, // Object is possibly 'null'
	2531: createOptionalChainingFix, // Object is possibly 'null' or 'undefined'
	18048: createOptionalChainingFix, // 'X' is possibly 'undefined'
	18047: createOptionalChainingFix, // 'X' is possibly 'null' (actual code used by TypeScript)
	18049: createOptionalChainingFix, // 'X' is possibly 'null' or 'undefined'
	2722: createOptionalChainingFix, // Cannot invoke possibly 'undefined'
	// Detection-only codes are handled by returning null in createAutoFixForError
};

/**
 * Creates auto-fix for supported TypeScript error codes.
 * Only handles optional chaining fixes (2532, 2533, 2531, 18048, 18047, 18049, 2722).
 * All other error codes are detection-only and return null.
 */
function createAutoFixForError(context: Parameters<ReturnType<typeof createRule>['create']>[0], errorCode: number, errorStart: number, errorLength: number, tsNode: ts.SourceFile) {
	// Only auto-fix optional chaining errors (most common and safe)
	const fixFunction = AUTO_FIX_REGISTRY[errorCode];
	if (fixFunction) {
		return fixFunction(context, errorStart, errorLength, tsNode);
	}

	// All other error codes are detection-only:
	return null;
}

/**
 * Enhanced auto-fix for optional chaining based on TypeScript error codes.
 * Converts unsafe property/method access to optional chaining.
 * Based on TypeScript's codeFixProvider patterns for 2532, 18048, 2722.
 *
 * Examples:
 * - user.profile.name → user.profile?.name (2532/18048)
 * - user.method() → user.method?.() (2722)
 */
function createOptionalChainingFix(context: Parameters<ReturnType<typeof createRule>['create']>[0], errorStart: number, errorLength: number, tsNode: ts.SourceFile) {
	const parserServices = ESLintUtils.getParserServices(context);

	return function (fixer: TSESLint.RuleFixer) {
		try {
			const targetMemberExpression = findMemberExpressionAccessingErrorRegion(tsNode, errorStart, errorLength, parserServices);

			if (!targetMemberExpression) {
				return null;
			}

			if (!canAutoFix(targetMemberExpression, context)) {
				return null;
			}

			return createAutoFix(context, targetMemberExpression)(fixer);
		} catch {
			return null;
		}
	};
}

/**
 * Finds the MemberExpression that accesses an expression within the error region.
 * For an error on "user.profile", finds "user.profile.name" to fix.
 */
function findMemberExpressionAccessingErrorRegion(
	tsNode: ts.SourceFile,
	errorStart: number,
	errorLength: number,
	parserServices: ReturnType<typeof ESLintUtils.getParserServices>,
): TSESTree.MemberExpression | null {
	const errorEnd = errorStart + errorLength;
	let bestMatch: TSESTree.MemberExpression | null = null;

	function visitNode(node: ts.Node) {
		if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
			const objStart = node.expression.getStart();
			const objEnd = node.expression.getEnd();

			if (objStart <= errorStart && objEnd >= errorEnd) {
				const esNode = parserServices.tsNodeToESTreeNodeMap.get(node);
				if (esNode && esNode.type === 'MemberExpression') {
					const memberNode = esNode as TSESTree.MemberExpression;
					if (!bestMatch || node.getEnd() - node.getStart() < bestMatch.range[1] - bestMatch.range[0]) {
						bestMatch = memberNode;
					}
				}
			}
		}
		forEachChild(node, visitNode);
	}

	visitNode(tsNode);
	return bestMatch;
}

/**
 * Creates auto-fix for converting property access to optional chaining.
 * Handles both dot notation (obj.prop) and bracket notation (obj[key]).
 */
function createAutoFix(context: Parameters<ReturnType<typeof createRule>['create']>[0], node: TSESTree.MemberExpression) {
	const sourceCode = context.sourceCode;

	return function (fixer: TSESLint.RuleFixer) {
		if (node.computed) {
			const openBracket = sourceCode.getTokenAfter(node.object);
			if (openBracket && openBracket.value === '[') {
				return fixer.insertTextBefore(openBracket, '?.');
			}
			return null;
		} else {
			const dotToken = sourceCode.getTokenBefore(node.property);
			if (dotToken && dotToken.value === '.') {
				return fixer.replaceText(dotToken, '?.');
			}
			return null;
		}
	};
}

/**
 * Determines if auto-fix can be safely applied to a MemberExpression.
 * Checks for safe contexts and validates token availability.
 */
function canAutoFix(node: TSESTree.MemberExpression, context: Parameters<ReturnType<typeof createRule>['create']>[0]): boolean {
	if (node.optional) return false;

	const sourceCode = context.sourceCode;
	if (!sourceCode) return false;

	const parent = node.parent;
	if (!parent) return false;

	const safeParentTypes = ['ExpressionStatement', 'ReturnStatement', 'VariableDeclarator', 'AssignmentExpression', 'MemberExpression', 'TemplateLiteral', 'CallExpression', 'BinaryExpression'];

	if (!safeParentTypes.includes(parent.type)) {
		return false;
	}

	if (node.computed) {
		const openBracket = sourceCode.getTokenAfter(node.object);
		return !!(openBracket && openBracket.value === '[');
	} else {
		const dotToken = sourceCode.getTokenBefore(node.property);
		return !!(dotToken && dotToken.value === '.');
	}
}
