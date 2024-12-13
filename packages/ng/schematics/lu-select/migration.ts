import { HtmlAst, HtmlAstVisitor } from '../lib/html-ast.js';
import ts, { isImportDeclaration, isNamedImports, ScriptTarget, SourceFile } from 'typescript';
import { extractComponentImports, insertAngularImportIfNeeded, insertTSImportIfNeeded, removeAngularImport, removeTSImport } from '../lib/angular-component-ast';
import { extractNgTemplatesIncludingHtml } from '../lib/angular-template';
import { getCommonMigrationRejectionReason, getDataSource, getDisplayer, isRejection, RejectionReason } from './util';
import { LuSelectInputContext, PremadeApiSelectContext, SelectComponent, SelectContext, selectorToComponentName, selectorToSelectComponentName } from './model/select-context';
import { TmplAstElement } from '@angular/compiler';
import { Tree, UpdateRecorder } from '@angular-devkit/schematics';
import { applyToUpdateRecorder } from '@schematics/angular/utility/change';
import { getEOL } from '@schematics/angular/utility/eol';

const importSource: Record<string, string> = {
	LuSimpleSelectInputComponent: '@lucca-front/ng/simple-select',
	LuMultipleSelectInputComponent: '@lucca-front/ng/multiple-select',
	LuDisplayerDirective: '@lucca-front/ng/core-select',
	LuOptionDirective: '@lucca-front/ng/core-select',
	LuInputClearerComponent: '@lucca-front/ng/input',
	LuCoreSelectEstablishmentsDirective: '@lucca-front/ng/core-select',
	LuCoreSelectJobQualificationsDirective: '@lucca-front/ng/core-select',
	LuCoreSelectUsersDirective: '@lucca-front/ng/core-select'
};

const selectorToComponentNameRecord = selectorToSelectComponentName as Record<string, SelectComponent>;

const possibleSelectComponents = Object.values(selectorToSelectComponentName);

export function migrateComponent(sourceFile: SourceFile, path: string, tree: Tree): string {
	const selects = findSelectContexts(sourceFile, path, tree);
	if (selects.length > 0) {
		const tsUpdate = tree.beginUpdate(path);
		const isInlineTemplate = selects[0].filePath === path;
		// If paths are the same, it's an inline template so we'll use the same updateRecord, else create a different one
		const templateUpdate = isInlineTemplate ? tsUpdate : tree.beginUpdate(selects[0].filePath);
		selects.forEach((select) => {
			if (select.rejection) {
				// TODO put a comment in the result file about why it's rejected
				console.log('REJECTED', select.component, RejectionReason[select.rejection.reason], select.rejection.details);
			}
			switch (select.component) {
				case 'LuSelectInputComponent':
					handleLuSelectInputComponent(select, templateUpdate);
					break;
				case 'LuEstablishmentSelectInputComponent':
				case 'LuQualificationSelectInputComponent':
				case 'LuUserSelectModule':
					handlePremadeApiSelect(select, templateUpdate);
					break;
			}
		});
		tree.commitUpdate(tsUpdate);
		if (!isInlineTemplate) {
			tree.commitUpdate(templateUpdate);
		}
		// We have to rebuild sourceFile in case of an inline template, since we just modified it
		const updatedSourceFile = isInlineTemplate ? ts.createSourceFile(path, tree.readText(path), ScriptTarget.ESNext) : sourceFile;
		updateImports(updatedSourceFile, selects, path, tree);
	}
	return tree.readText(path);
}

function findSelectContexts(sourceFile: ts.SourceFile, basePath: string, tree: Tree): SelectContext[] {
	const imports = extractComponentImports(sourceFile);
	if (possibleSelectComponents.some((c) => imports.includes(c))) {
		const selects: SelectContext[] = [];
		const template = extractNgTemplatesIncludingHtml(sourceFile, tree, basePath)[0];
		const htmlAst = new HtmlAst(template.content);
		htmlAst.visitNodes((node) => {
			if (node instanceof TmplAstElement) {
				const selectComponentClass = selectorToComponentNameRecord[node.name];
				if (selectComponentClass) {
					const context = {
						node,
						tagName: node.name,
						nodeOffset: template.offsetStart,
						component: selectComponentClass,
						rejection: getCommonMigrationRejectionReason(node),
						filePath: template.filePath,
						componentTS: template.componentTS
					};

					selects.push(context as SelectContext);
				}
			}
		});
		return selects;
	} else {
		return [];
	}
}

function updateImports(sourceFile: SourceFile, selects: SelectContext[], path: string, tree: Tree) {
	// We need to use 3 updates because of inline template updates requiring sourceFile regen after each change
	const update = tree.beginUpdate(path);
	const imports = new Set(selects.flatMap(select => select.requiredImports || []));
	imports.forEach(importToAdd => {
		if (importSource[importToAdd]) {
			applyToUpdateRecorder(update, [insertTSImportIfNeeded(sourceFile, path, importToAdd, importSource[importToAdd]), insertAngularImportIfNeeded(sourceFile, path, importToAdd)]);
		} else {
			console.error(`Can't add import for ${importToAdd} because source is unknown`);
		}
	});
	tree.commitUpdate(update);
	const componentsCleanupUpdate = tree.beginUpdate(path);
	// Cleanup unused select component imports
	const updatedSourceFile = ts.createSourceFile(path, tree.readText(path), ScriptTarget.ESNext);
	const templatesAfterUpdate = extractNgTemplatesIncludingHtml(updatedSourceFile, tree, path);
	templatesAfterUpdate.forEach(template => {
		Object.entries(selectorToComponentName).forEach(([selector, className]) => {
			if (!template.content.includes(selector)) {
				applyToUpdateRecorder(componentsCleanupUpdate, [removeTSImport(updatedSourceFile, path, className), removeAngularImport(updatedSourceFile, path, className)]);
			}
		});
	});
	tree.commitUpdate(componentsCleanupUpdate);
	// Cleanup empty import clauses
	const cleanupUpdate = tree.beginUpdate(path);
	const cleanupSourceFile = ts.createSourceFile(path, tree.readText(path), ScriptTarget.ESNext);
	cleanupSourceFile.statements
		.filter(isImportDeclaration)
		.forEach(statement => {
			if (statement.importClause && statement.importClause.namedBindings && isNamedImports(statement.importClause.namedBindings) && statement.importClause.namedBindings.elements.length === 0) {
				// +1 for trailing ;
				cleanupUpdate.remove(statement.getFullStart(), statement.getText(cleanupSourceFile).length + 1);
			}
		});
	tree.commitUpdate(cleanupUpdate);
}

function handleLuSelectInputComponent(select: LuSelectInputContext, update: UpdateRecorder) {
	const dataSource = getDataSource(select);
	let hasClearer = false;
	new HtmlAstVisitor(select.node).visitElements(/lu-input-clearer/, (node) => {
		// Doing the check just in case
		if (node.name === 'lu-input-clearer') {
			hasClearer = true;
		}
	});
	if (isRejection(dataSource)) {
		select.rejection = dataSource;
	} else {
		select.requiredImports = ['LuSimpleSelectInputComponent'];
		const displayer = getDisplayer(select);
		const endSpanOffset = select.node.endSourceSpan?.start.offset || 0;
		// Remove content
		update.remove(select.nodeOffset + select.node.startSourceSpan.end.offset, endSpanOffset - select.node.startSourceSpan.end.offset);
		// rename opening tag and insert options
		update.remove(select.nodeOffset + select.node.startSourceSpan.start.offset + 1, select.tagName.length);
		let newOpeningTag = `lu-simple-select [options]="${dataSource.sourceName}"`;
		if (!dataSource.display.canBeRemoved) {
			newOpeningTag += ` #${dataSource.sourceName}Select`;
		}
		if (dataSource.comparer) {
			newOpeningTag += ` [optionComparer]="${dataSource.comparer}"`;
		}
		if (hasClearer) {
			newOpeningTag += ` clearable`;
		}
		// rename tag and add options + selector if needed
		update.insertRight(select.nodeOffset + select.node.startSourceSpan.start.offset + 1, newOpeningTag);
		if (!dataSource.display.canBeRemoved) {
			// If we need to create an option displayer, add it
			select.requiredImports.push('LuOptionDirective');
			update.insertRight(select.nodeOffset + select.node.startSourceSpan.end.offset, `${getEOL(select.node.startSourceSpan.end.file.content)}  <ng-container *luOption="${dataSource.display.variables}; select: ${dataSource.sourceName}Select">${dataSource.display.display}</ng-container>${getEOL(select.node.startSourceSpan.end.file.content)}`);
		}
		if (!displayer.canBeRemoved) {
			// Create new displayer
			select.requiredImports.push('LuDisplayerDirective');
			update.insertRight(select.nodeOffset + select.node.startSourceSpan.end.offset, `${getEOL(select.node.startSourceSpan.end.file.content)}  <ng-container *luDisplayer="${displayer.variables}">${displayer.display}</ng-container>${getEOL(select.node.startSourceSpan.end.file.content)}`);
		}
		// rename closing tag
		update.remove(select.nodeOffset + endSpanOffset + 2, select.tagName.length);
		update.insertRight(select.nodeOffset + endSpanOffset + 2, `lu-simple-select`);
	}
}

function handlePremadeApiSelect(select: PremadeApiSelectContext, update: UpdateRecorder) {
	const sourceDirective = {
		LuQualificationSelectInputComponent: { selector: 'jobQualifications', className: 'LuCoreSelectJobQualificationsDirective' },
		LuUserSelectModule: { selector: 'users', className: 'LuCoreSelectUsersDirective' },
		LuEstablishmentSelectInputComponent: { selector: 'establishments', className: 'LuCoreSelectEstablishmentsDirective' }
	}[select.component];
	select.requiredImports = ['LuSimpleSelectInputComponent', sourceDirective.className];
	const endSpanOffset = select.node.endSourceSpan?.start.offset || 0;
	// rename opening tag and insert data directive
	update.remove(select.nodeOffset + select.node.startSourceSpan.start.offset + 1, select.tagName.length);
	// rename tag and add options + selector if needed
	update.insertRight(select.nodeOffset + select.node.startSourceSpan.start.offset + 1, `lu-simple-select ${sourceDirective.selector}`);
	// rename closing tag
	update.remove(select.nodeOffset + endSpanOffset + 2, select.tagName.length);
	update.insertRight(select.nodeOffset + endSpanOffset + 2, `lu-simple-select`);
}
