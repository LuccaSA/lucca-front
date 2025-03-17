import { Tree } from '@angular-devkit/schematics';
import { dirname, join } from 'path';
import {
	ScriptTarget,
	SourceFile,
	Node as TsNode,
	createSourceFile,
	forEachChild,
	isCallExpression,
	isDecorator,
	isIdentifier,
	isNoSubstitutionTemplateLiteral,
	isObjectLiteralExpression,
	isPropertyAssignment,
	isStringLiteral
} from 'typescript';
import { updateContent } from './file-update';
import { HtmlAst, HtmlAstVisitor } from './html-ast';
import { currentSchematicContext } from './lf-schematic-context';
import { replaceStringLiterals } from './typescript-ast';

export interface AngularTemplate {
	offsetStart: number;
	offsetEnd: number;
	content: string;
	filePath: string;
	componentTS: SourceFile;
}

export function extractNgTemplatesIncludingHtml(sourceFile: SourceFile, tree: Tree, path: string): AngularTemplate[] {
	const templates: AngularTemplate[] = [...extractNgTemplates(sourceFile).map((tmpl) => ({ ...tmpl, filePath: path }))];
	forEachChild(
		sourceFile,
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
					.filter((prop) => isIdentifier(prop.name) && prop.name.text === 'templateUrl')
					.map((prop) => prop.initializer)
					.filter(orGuard(isStringLiteral, isNoSubstitutionTemplateLiteral))
					.map((initializer) => {
						const filePath = join(dirname(sourceFile.fileName), initializer.text);
						const content = tree.readText(filePath);
						return {
							offsetStart: 0,
							offsetEnd: content.length,
							content,
							filePath,
							componentTS: sourceFile
						};
					})
			);
		})
	);
	return templates;
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
						content: 'rawText' in initializer && initializer.rawText ? initializer.rawText : initializer.text,
						filePath: sourcefile.fileName,
						componentTS: sourcefile
					}))
			);
		})
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

export function orGuard<T, T1 extends T, T2 extends T>(guard1: (item: T) => item is T1, guard2: (item: T) => item is T2): (item: T) => item is T1 | T2 {
	return (item): item is T1 | T2 => guard1(item) || guard2(item);
}

export function replaceComponentInput(componentName: string, inputName: string, oldStringToNewString: Record<string, string>, template: string): string {
	return updateContent(template, (updates) => {
		const htmlAst = new HtmlAst(template);
		htmlAst.visitElements(componentName, (el) => {
			const elAst = new HtmlAstVisitor(el);

			elAst.visitAttribute(inputName, (attr) => {
				if (attr.valueSpan && attr.value in oldStringToNewString) {
					updates.push({
						position: attr.valueSpan.start.offset,
						oldContent: attr.value,
						newContent: oldStringToNewString[attr.value]
					});
				}
			});

			elAst.visitBoundAttribute(inputName, (attr) => {
				if (attr.valueSpan && attr.value instanceof currentSchematicContext.angularCompiler.ASTWithSource) {
					const attrValue = attr.value.source || '';
					const sourcefile = createSourceFile('', attrValue, ScriptTarget.ESNext);

					updates.push(
						...replaceStringLiterals(sourcefile, oldStringToNewString).map((update) => ({
							...update,
							position: (attr.valueSpan?.start.offset ?? 0) + update.position
						}))
					);
				}
			});
		});
	});
}

export function replaceComponentInputName(componentName: string, oldInputName: string, newInputName: string, template: string): string {
	return updateContent(template, (updates) => {
		const htmlAst = new HtmlAst(template);
		htmlAst.visitElements(componentName, (el) => {
			const elAst = new HtmlAstVisitor(el);

			elAst.visitAttribute(oldInputName, (attr) => {
				if (attr.keySpan) {
					updates.push({
						position: attr.keySpan.start.offset,
						oldContent: oldInputName,
						newContent: newInputName
					});
				}
			});

			elAst.visitBoundAttribute(oldInputName, (attr) => {
				if (attr.keySpan) {
					updates.push({
						position: attr.keySpan.start.offset,
						oldContent: oldInputName,
						newContent: newInputName
					});
				}
			});
		});
	});
}

export function updateAngularTemplate(fileName: string, content: string, updater: (template: string) => string): string {
	if (fileName.endsWith('.html')) {
		return updater(content);
	}

	if (!fileName.endsWith('.ts')) {
		return content;
	}

	return updateContent(content, (updates) => {
		const sourcefile = createSourceFile(fileName, content, ScriptTarget.ESNext);
		const templates = extractNgTemplates(sourcefile);

		updates.push(
			...templates.map((tpl) => ({
				position: tpl.offsetStart,
				oldContent: tpl.content,
				newContent: updater(tpl.content)
			}))
		);
	});
}
