import {
	createSourceFile,
	forEachChild,
	isCallExpression,
	isDecorator,
	isIdentifier,
	isNoSubstitutionTemplateLiteral,
	isObjectLiteralExpression,
	isPropertyAssignment,
	isStringLiteral,
	Node as TsNode,
	ScriptTarget,
	SourceFile,
} from 'typescript';

export interface AngularTemplate {
	offsetStart: number;
	offsetEnd: number;
	content: string;
}

export function extractNgTemplates(sourcefile: SourceFile): AngularTemplate[];
export function extractNgTemplates(fileName: string, content: string): AngularTemplate[];
export function extractNgTemplates(fileNameOrSourceFile: string | SourceFile, content?: string): AngularTemplate[] {
	const sourcefile = typeof fileNameOrSourceFile === 'string' ? createSourceFile(fileNameOrSourceFile, content || '', ScriptTarget.ESNext) : fileNameOrSourceFile;
	const templates: AngularTemplate[] = [];

	forEachChild(
		sourcefile,
		createVisitor(isDecorator, (decorator) => {
			if (!isCallExpression(decorator.expression)) {
				return;
			}
			if (!isIdentifier(decorator.expression.expression)) {
				return;
			}

			if (decorator.expression.expression.escapedText !== 'Component') {
				return;
			}

			const argument = decorator.expression.arguments[0];
			if (!argument || !isObjectLiteralExpression(argument)) {
				return;
			}

			templates.push(
				...argument.properties
					.filter(isPropertyAssignment)
					.filter((prop) => isIdentifier(prop.name) && prop.name.text === 'template')
					.map((prop) => prop.initializer)
					.filter(orGuard(isStringLiteral, isNoSubstitutionTemplateLiteral))
					.map((initializer) => ({
						offsetStart: initializer.getStart(sourcefile) + initializer.getLeadingTriviaWidth(sourcefile),
						offsetEnd: initializer.getEnd(),
						content: initializer.text,
					})),
			);
		}),
	);

	return templates;
}

export function createVisitor<TNode extends TsNode>(predicate: (node: TsNode) => node is TNode, callback: (n: TNode) => void): (node: TsNode) => void {
	return function visit(node: TsNode): void {
		if (predicate(node)) {
			callback(node);
		}

		forEachChild(node, visit);
	};
}

function orGuard<T, T1 extends T, T2 extends T>(guard1: (item: T) => item is T1, guard2: (item: T) => item is T2): (item: T) => item is T1 | T2 {
	return (item): item is T1 | T2 => guard1(item) || guard2(item);
}
