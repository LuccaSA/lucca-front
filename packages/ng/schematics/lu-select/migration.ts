import { HtmlAst } from '../lib/html-ast.js';
import ts, { SourceFile } from 'typescript';
import { extractComponentImports } from '../lib/angular-component-ast';
import { extractNgTemplates } from '../lib/angular-template';
import { getCommonMigrationRejectionReason, getDataSource, getDisplayer, isRejection, RejectionReason } from './util';
import { SelectComponent, SelectContext, selectorToComponentName } from './model/select-context';
import { TmplAstElement } from '@angular/compiler';
import { Tree, UpdateRecorder } from '@angular-devkit/schematics';

const selectorToComponentNameRecord = selectorToComponentName as Record<string, SelectComponent>;

const possibleSelectComponents = Object.values(selectorToComponentName);

export function migrateComponent(sourceFile: SourceFile, path: string, tree: Tree): string {
	const selects = findSelectContexts(sourceFile);
	selects.forEach((select) => {
		if (select.rejection) {
			// TODO put a comment in the result file about why it's rejected
			console.log('REJECTED', select.component, RejectionReason[select.rejection.reason], select.rejection.details);
		}
		switch (select.component) {
			case 'LuSelectInputComponent':
				handleLuSelectInputComponent(select, path, tree);
				break;
		}
	});
	return tree.readText(path);
}

function findSelectContexts(sourceFile: ts.SourceFile): SelectContext[] {
	const imports = extractComponentImports(sourceFile);
	if (possibleSelectComponents.some((c) => imports.includes(c))) {
		const selects: SelectContext[] = [];
		const template = extractNgTemplates(sourceFile)[0];
		const htmlAst = new HtmlAst(template.content);
		htmlAst.visitNodes((node) => {
			if (node instanceof TmplAstElement) {
				const selectComponentClass = selectorToComponentNameRecord[node.name];
				if (selectComponentClass) {
					const context: SelectContext = {
						node,
						tagName: node.name,
						nodeOffset: template.offsetStart,
						component: selectComponentClass,
						rejection: getCommonMigrationRejectionReason(node),
					};

					selects.push(context);
				}
			}
		});
		return selects;
	} else {
		return [];
	}
}

function handleLuSelectInputComponent(select: SelectContext, path: string, tree: Tree) {
	const dataSource = getDataSource(select);
	if (isRejection(dataSource)) {
		select.rejection = dataSource;
	} else {
		const displayer = getDisplayer(select);
		const update = tree.beginUpdate(path);
		const endSpanOffset = select.node.endSourceSpan?.start.offset || 0;
		// rename opening tag and insert options
		update.remove(select.nodeOffset + select.node.startSourceSpan.start.offset + 1, select.tagName.length);
		update.insertRight(select.nodeOffset + select.node.startSourceSpan.start.offset + 1, `lu-simple-select [options]="${dataSource.sourceName}"`);
		if (displayer.canBeRemoved) {
			// Remove content
			update.remove(select.nodeOffset + select.node.startSourceSpan.end.offset, endSpanOffset - select.node.startSourceSpan.end.offset);
		} // TODO else handle displayer
		// rename closing tag
		update.remove(select.nodeOffset + endSpanOffset + 2, select.tagName.length);
		update.insertRight(select.nodeOffset + endSpanOffset + 2, `lu-simple-select`);
		tree.commitUpdate(update);
	}
}
