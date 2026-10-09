import { Tree } from '@angular-devkit/schematics';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { TmplAstElement } from '@angular/compiler';
import { applyToUpdateRecorder } from '@schematics/angular/utility/change';
import {
	ArrowFunction,
	ClassDeclaration,
	createSourceFile,
	FunctionExpression,
	getDecorators,
	isArrowFunction,
	isBindingElement,
	isCallExpression,
	isClassDeclaration,
	isFunctionExpression,
	isIdentifier,
	isImportDeclaration,
	isMethodDeclaration,
	isNamedImports,
	isObjectBindingPattern,
	isObjectLiteralExpression,
	isPropertyAccessExpression,
	isPropertyAssignment,
	isPropertyDeclaration,
	isStringLiteralLike,
	isTypeReferenceNode,
	MethodDeclaration,
	Node as TsNode,
	ParameterDeclaration,
	ScriptTarget,
	SourceFile,
	SyntaxKind,
} from 'typescript';
import {
	currentSchematicContext,
	extractNgTemplatesIncludingHtml,
	FileUpdate,
	HtmlAst,
	HtmlAstVisitor,
	insertAngularImportIfNeeded,
	insertTSImportIfNeeded,
	updateAngularTemplate,
	updateContent,
} from '../lib';

const reorderEntrypoint = '@lucca-front/ng/reorder';

const cdkDragDropEntrypoint = '@angular/cdk/drag-drop';

const todoComment = '<!-- TODO: add luReorderItemLabel -->';

/** Properties of `CdkDragDrop` that `ReorderEvent` also provides: a handler reading anything else cannot be migrated. */
const reorderEventProperties = ['previousIndex', 'currentIndex', 'previousContainer', 'container'];

/** A `(cdkDropListDropped)` handler, written as a plain call to a component method: `drop($event)`, `drop($event, list)`… */
interface HandlerCall {
	methodName: string;
	/** Position of `$event` in the call, `-1` when the handler does not receive it. */
	eventIndex: number;
}

type HandlerAnalysis = { migratable: true; call: HandlerCall; retype: boolean } | { migratable: false; reason: string };

interface MigrationState {
	/** Handlers whose `CdkDragDrop` parameter becomes a `ReorderEvent`, by method name. */
	retypedHandlers: Map<string, number>;
	symbolsToImport: Set<string>;
}

export function migrateComponent(path: string, content: string, tree: Tree): string {
	const sourceFile = createSourceFile(path, content, ScriptTarget.ESNext, true);
	const templates = extractNgTemplatesIncludingHtml(sourceFile, tree, path);

	if (!templates.some((template) => template.content.includes('cdkDropListDropped'))) {
		return content;
	}

	const components = getComponentClasses(sourceFile);

	// Templates cannot be matched to their class when a file declares several components.
	if (components.length !== 1) {
		currentSchematicContext.warn(`${path}: this file declares several components, migrate its cdkDropList lists to luReorder manually.`);
		return content;
	}

	const component = components[0];
	const state: MigrationState = { retypedHandlers: new Map(), symbolsToImport: new Set() };

	// External templates are rewritten in place, they are not part of the component file.
	templates
		.filter((template) => template.filePath !== path)
		.forEach((template) => {
			const migrated = migrateTemplate(template.filePath, template.content, component, state);

			if (migrated !== template.content) {
				tree.overwrite(template.filePath, migrated);
			}
		});

	let result = updateAngularTemplate(path, content, (template) => migrateTemplate(path, template, component, state));

	if (state.symbolsToImport.size === 0) {
		return result;
	}

	if (state.retypedHandlers.size > 0) {
		result = retypeHandlers(path, result, state.retypedHandlers);
		result = removeUnusedCdkDragDropImport(path, result);
		state.symbolsToImport.add('ReorderEvent');
	}

	// Imports are inserted one symbol at a time: every insertion shifts the offsets the next one relies on.
	tree.overwrite(path, result);

	// Each TS import is inserted before the existing ones: going backwards keeps them sorted.
	['ReorderItemLabelDirective', 'ReorderEvent', 'ReorderDirective']
		.filter((symbol) => state.symbolsToImport.has(symbol))
		.forEach((symbol) => {
			const updatedSourceFile = createSourceFile(path, tree.readText(path), ScriptTarget.ESNext, true);
			const recorder = tree.beginUpdate(path);
			applyToUpdateRecorder(recorder, [insertTSImportIfNeeded(updatedSourceFile, path, symbol, reorderEntrypoint)]);
			tree.commitUpdate(recorder);
		});

	const angularSymbols = ['ReorderDirective', 'ReorderItemLabelDirective'].filter((symbol) => state.symbolsToImport.has(symbol));

	if (isStandaloneFalse(component)) {
		currentSchematicContext.warn(`${path}: this component is not standalone, add ${angularSymbols.join(' and ')} to the imports of its NgModule.`);
	} else {
		angularSymbols.forEach((symbol) => {
			const updatedSourceFile = createSourceFile(path, tree.readText(path), ScriptTarget.ESNext, true);
			const recorder = tree.beginUpdate(path);
			applyToUpdateRecorder(recorder, [insertAngularImportIfNeeded(updatedSourceFile, path, symbol)]);
			tree.commitUpdate(recorder);
		});
	}

	return tree.readText(path);
}

/**
 * Adds `luReorder` next to `cdkDropList` and moves its `(cdkDropListDropped)` handler to `(luReorder)`, which also emits
 * for the moves made with the keyboard or the handle menu. A list is left untouched when its handler might read
 * a `CdkDragDrop` property that `ReorderEvent` does not provide.
 */
function migrateTemplate(path: string, template: string, component: ClassDeclaration, state: MigrationState): string {
	if (!template.includes('cdkDropListDropped')) {
		return template;
	}

	return updateContent(template, (updates) => {
		const htmlAst = new HtmlAst(template);
		const lists: TmplAstElement[] = [];
		const commentedItems = new Set<number>();

		htmlAst.visitElements(/.*/, (element) => {
			if (hasAttribute(element, 'cdkDropList')) {
				lists.push(element);
			}
		});

		lists.forEach((list) => {
			const dropped = list.outputs.find((output) => output.name === 'cdkDropListDropped');
			const cdkDropList = list.attributes.find((attribute) => attribute.name === 'cdkDropList');

			if (!dropped || !cdkDropList || hasBinding(list, 'luReorder')) {
				return;
			}

			const listSnippet = getOpeningTagSnippet(template, list);
			const handler = dropped.handler instanceof currentSchematicContext.angularCompiler.ASTWithSource ? (dropped.handler.source ?? '') : '';
			const analysis = analyzeHandler(component, handler);

			if (!analysis.migratable) {
				currentSchematicContext.warn(`${path}: ${listSnippet} was not migrated to luReorder, ${analysis.reason}.`);
				return;
			}

			const droppedStart = dropped.sourceSpan.start.offset;
			const droppedName = droppedStart + template.slice(droppedStart, dropped.sourceSpan.end.offset).indexOf('cdkDropListDropped');

			updates.push({ position: cdkDropList.sourceSpan.end.offset, oldContent: '', newContent: ' luReorder' }, { position: droppedName, oldContent: 'cdkDropListDropped', newContent: 'luReorder' });

			if (analysis.retype) {
				state.retypedHandlers.set(analysis.call.methodName, analysis.call.eventIndex);
			}

			state.symbolsToImport.add('ReorderDirective');
			currentSchematicContext.logSuccess(`Adding luReorder on ${listSnippet} in ${path}`);

			const unlabelledItems = migrateItems(template, list, lists, updates, commentedItems, state);

			if (unlabelledItems.length > 0) {
				currentSchematicContext.warn(
					`${path}: give an accessible name to the items of ${listSnippet} with luReorderItemLabel (and import ReorderItemLabelDirective), they are marked with a TODO comment: ${unlabelledItems.join(', ')}`,
				);
			}
		});
	});
}

/**
 * Items have no generic way to get a label: the ones without `luReorderItemLabel` are marked with a TODO comment.
 * Returns the snippets of these items, for the log.
 */
function migrateItems(template: string, list: TmplAstElement, lists: TmplAstElement[], updates: FileUpdate[], commentedItems: Set<number>, state: MigrationState): string[] {
	const nestedLists = lists.filter((other) => other !== list && isWithin(other, list));
	const unlabelledItems: string[] = [];

	new HtmlAstVisitor(list.children).visitElements(/.*/, (item) => {
		// Items of a nested list belong to that list, which is migrated on its own.
		if (!hasAttribute(item, 'cdkDrag') || nestedLists.some((nested) => isWithin(item, nested))) {
			return;
		}

		if (hasBinding(item, 'luReorderItemLabel')) {
			state.symbolsToImport.add('ReorderItemLabelDirective');
			return;
		}

		const position = item.sourceSpan.start.offset;

		if (commentedItems.has(position)) {
			return;
		}

		commentedItems.add(position);
		unlabelledItems.push(getOpeningTagSnippet(template, item));
		updates.push({ position, oldContent: '', newContent: `${todoComment}${getLineBreak(template, position)}` });
	});

	return unlabelledItems;
}

/**
 * The template is only migrated when the handler is a component method whose `$event` parameter is typed `CdkDragDrop`
 * and only reads the properties `ReorderEvent` shares with it: anything else is left for a manual migration.
 */
function analyzeHandler(component: ClassDeclaration, handler: string): HandlerAnalysis {
	const call = parseHandlerCall(handler);

	if (!call) {
		return { migratable: false, reason: `its (cdkDropListDropped) handler "${handler.trim()}" is not a single method call` };
	}

	// The event is not read: both outputs can be bound to the same handler.
	if (call.eventIndex === -1) {
		return { migratable: true, call, retype: false };
	}

	const parameter = findHandlerParameter(component, call);

	if (!parameter) {
		return { migratable: false, reason: `${call.methodName}() is not a method of the component taking $event as parameter` };
	}

	const type = parameter.type;

	if (!type || !isTypeReferenceNode(type) || !isIdentifier(type.typeName) || type.typeName.text !== 'CdkDragDrop' || (type.typeArguments?.length ?? 0) > 2) {
		return { migratable: false, reason: `the $event parameter of ${call.methodName}() is not typed CdkDragDrop<T> or CdkDragDrop<T, O>` };
	}

	const unsupportedReads = getUnsupportedReads(parameter);

	if (unsupportedReads.length > 0) {
		return { migratable: false, reason: `${call.methodName}() reads ${unsupportedReads.join(', ')}, which ReorderEvent does not provide` };
	}

	return { migratable: true, call, retype: true };
}

function parseHandlerCall(handler: string): HandlerCall | null {
	const match = /^\s*([A-Za-z_$][\w$]*)\s*\(([^()]*)\)\s*;?\s*$/.exec(handler);

	if (!match) {
		return null;
	}

	const args = match[2].trim() ? match[2].split(',').map((arg) => arg.trim()) : [];
	const eventIndex = args.indexOf('$event');

	// `$event` has to be passed as is, and only once, for its reads to be tracked in the method.
	if (args.some((arg, index) => arg.includes('$event') && index !== eventIndex)) {
		return null;
	}

	return { methodName: match[1], eventIndex };
}

function findHandlerParameter(component: ClassDeclaration, call: HandlerCall): ParameterDeclaration | null {
	const members = component.members.filter((member) => (isMethodDeclaration(member) || isPropertyDeclaration(member)) && isIdentifier(member.name) && member.name.text === call.methodName);

	// Overloads would all need to be retyped.
	if (members.length !== 1) {
		return null;
	}

	const member = members[0];
	let implementation: MethodDeclaration | ArrowFunction | FunctionExpression | undefined;

	if (isMethodDeclaration(member)) {
		implementation = member;
	} else if (isPropertyDeclaration(member) && member.initializer && (isArrowFunction(member.initializer) || isFunctionExpression(member.initializer))) {
		implementation = member.initializer;
	}

	if (!implementation?.body) {
		return null;
	}

	return implementation.parameters[call.eventIndex] ?? null;
}

/**
 * Lists the reads of the event other than `event.previousIndex`, `event.currentIndex`, `event.previousContainer`
 * and `event.container` (and their own properties, like `event.container.data`). Any other use of the event, such as
 * passing it to another function, is reported as well.
 */
function getUnsupportedReads(parameter: ParameterDeclaration): string[] {
	const name = parameter.name;

	if (isObjectBindingPattern(name)) {
		return name.elements.filter((element) => !isBindingElement(element) || element.dotDotDotToken || !isSupportedProperty(element.propertyName ?? element.name)).map((element) => element.getText());
	}

	const body = (parameter.parent as MethodDeclaration | ArrowFunction | FunctionExpression).body;

	if (!isIdentifier(name) || !body) {
		return [parameter.getText()];
	}

	const reads: string[] = [];
	const visit = (node: TsNode): void => {
		if (isIdentifier(node) && node.text === name.text && !isPropertyName(node)) {
			const parent = node.parent;
			const isSupportedRead = isPropertyAccessExpression(parent) && parent.expression === node && isSupportedProperty(parent.name);

			if (!isSupportedRead) {
				reads.push(isPropertyAccessExpression(parent) && parent.expression === node ? parent.getText() : name.text);
			}
		}

		node.forEachChild(visit);
	};

	visit(body);

	return [...new Set(reads)];
}

function isSupportedProperty(node: TsNode): boolean {
	return isIdentifier(node) && reorderEventProperties.includes(node.text);
}

/** Whether the identifier names a property (`this.event`, `{ event: … }`) rather than referencing a variable. */
function isPropertyName(node: TsNode): boolean {
	const parent = node.parent;
	return (isPropertyAccessExpression(parent) && parent.name === node) || (isPropertyAssignment(parent) && parent.name === node);
}

function retypeHandlers(path: string, content: string, handlers: Map<string, number>): string {
	const sourceFile = createSourceFile(path, content, ScriptTarget.ESNext, true);
	const [component] = getComponentClasses(sourceFile);

	return updateContent(content, (updates) => {
		handlers.forEach((eventIndex, methodName) => {
			const type = findHandlerParameter(component, { methodName, eventIndex })?.type;

			if (type && isTypeReferenceNode(type)) {
				updates.push({ position: type.typeName.getStart(sourceFile), oldContent: 'CdkDragDrop', newContent: 'ReorderEvent' });
				currentSchematicContext.logSuccess(`Replacing CdkDragDrop with ReorderEvent in ${methodName}() in ${path}`);
			}
		});
	});
}

function removeUnusedCdkDragDropImport(path: string, content: string): string {
	const sourceFile = createSourceFile(path, content, ScriptTarget.ESNext, true);
	let isUsed = false;

	const visit = (node: TsNode): void => {
		if (isImportDeclaration(node)) {
			return;
		}

		if (isIdentifier(node) && node.text === 'CdkDragDrop') {
			isUsed = true;
		}

		node.forEachChild(visit);
	};

	visit(sourceFile);

	if (isUsed) {
		return content;
	}

	const declaration = sourceFile.statements.filter(isImportDeclaration).find((statement) => isStringLiteralLike(statement.moduleSpecifier) && statement.moduleSpecifier.text === cdkDragDropEntrypoint);
	const namedBindings = declaration?.importClause?.namedBindings;

	if (!declaration || !namedBindings || !isNamedImports(namedBindings)) {
		return content;
	}

	const elements = namedBindings.elements;
	const index = elements.findIndex((element) => !element.propertyName && element.name.text === 'CdkDragDrop');

	if (index === -1) {
		return content;
	}

	let start: number;
	let end: number;

	if (elements.length === 1 && !declaration.importClause?.name) {
		start = declaration.getStart(sourceFile);
		end = declaration.getEnd();
		end += content.startsWith('\r\n', end) ? 2 : content.startsWith('\n', end) ? 1 : 0;
	} else if (index < elements.length - 1) {
		start = elements[index].getStart(sourceFile);
		end = elements[index + 1].getStart(sourceFile);
	} else {
		start = elements[index - 1].getEnd();
		end = elements[index].getEnd();
	}

	return updateContent(content, (updates) => updates.push({ position: start, oldContent: content.slice(start, end), newContent: '' }));
}

function getComponentClasses(sourceFile: SourceFile): ClassDeclaration[] {
	return sourceFile.statements.filter(isClassDeclaration).filter((declaration) => !!getComponentDecoratorArgument(declaration));
}

function getComponentDecoratorArgument(declaration: ClassDeclaration): TsNode | undefined {
	return (getDecorators(declaration) ?? [])
		.map((decorator) => decorator.expression)
		.filter(isCallExpression)
		.find((expression) => isIdentifier(expression.expression) && expression.expression.text === 'Component')?.arguments[0];
}

function isStandaloneFalse(component: ClassDeclaration): boolean {
	const argument = getComponentDecoratorArgument(component);

	return (
		!!argument &&
		isObjectLiteralExpression(argument) &&
		argument.properties.some(
			(property) => isPropertyAssignment(property) && isIdentifier(property.name) && property.name.text === 'standalone' && property.initializer.kind === SyntaxKind.FalseKeyword,
		)
	);
}

function hasAttribute(element: TmplAstElement, name: string): boolean {
	return element.attributes.some((attribute) => attribute.name === name);
}

/** Whether the element carries `name` as a static attribute, an input or an output. */
function hasBinding(element: TmplAstElement, name: string): boolean {
	return [...element.attributes, ...element.inputs, ...element.outputs].some((binding) => binding.name === name);
}

function isWithin(inner: TmplAstElement, outer: TmplAstElement): boolean {
	return inner.sourceSpan.start.offset > outer.sourceSpan.start.offset && getEnd(inner) <= getEnd(outer);
}

function getEnd(element: TmplAstElement): number {
	return (element.endSourceSpan ?? element.sourceSpan).end.offset;
}

/** Opening tag of the element on a single line, to point to it in the logs. */
function getOpeningTagSnippet(template: string, element: TmplAstElement): string {
	const tag = template.slice(element.startSourceSpan.start.offset, element.startSourceSpan.end.offset).replace(/\s+/g, ' ');
	return tag.length > 100 ? `${tag.slice(0, 97)}...` : tag;
}

/** What follows the TODO comment: a line break keeping the indentation of the element when it starts its own line. */
function getLineBreak(template: string, position: number): string {
	const lineStart = template.lastIndexOf('\n', position - 1) + 1;
	const prefix = template.slice(lineStart, position);
	return /^\s*$/.test(prefix) ? `\n${prefix}` : ' ';
}
