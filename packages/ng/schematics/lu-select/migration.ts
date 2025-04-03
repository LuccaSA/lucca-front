import { HtmlAst, HtmlAstVisitor } from '../lib/html-ast.js';
import { createSourceFile, isImportDeclaration, isNamedImports, ScriptTarget, SourceFile } from 'typescript';
import { extractComponentImports, insertAngularImportIfNeeded, insertTSImportIfNeeded, removeAngularImport, removeTSImport } from '../lib/angular-component-ast';
import { extractNgTemplatesIncludingHtml } from '../lib/angular-template';
import { getCommonMigrationRejectionReason, getDataSource, getDisplayer, isRejection, RejectionReason } from './util';
import {
	LuApiSelectInputComponentContext,
	LuSelectInputContext,
	PremadeApiSelectContext,
	RejectedSelectContext,
	SelectComponent,
	SelectContext,
	selectorToComponentName,
	selectorToSelectComponentName
} from './model/select-context';
import { Tree, UpdateRecorder } from '@angular-devkit/schematics';
import { applyToUpdateRecorder } from '@schematics/angular/utility/change';
import { getEOL } from '@schematics/angular/utility/eol';
import { currentSchematicContext } from '../lib/lf-schematic-context';

const importSource: Record<string, string> = {
	LuSimpleSelectInputComponent: '@lucca-front/ng/simple-select',
	LuMultiSelectInputComponent: '@lucca-front/ng/multi-select',
	LuDisplayerDirective: '@lucca-front/ng/core-select',
	LuOptionDirective: '@lucca-front/ng/core-select',
	LuInputClearerComponent: '@lucca-front/ng/input',
	LuCoreSelectEstablishmentsDirective: '@lucca-front/ng/core-select/establishment',
	LuCoreSelectJobQualificationsDirective: '@lucca-front/ng/core-select/job-qualification',
	LuCoreSelectUsersDirective: '@lucca-front/ng/core-select/user',
	LuCoreSelectApiV3Directive: '@lucca-front/ng/core-select/api',
	LuCoreSelectApiV4Directive: '@lucca-front/ng/core-select/api'
};

const selectorToComponentNameRecord = selectorToSelectComponentName as Record<string, SelectComponent>;

const possibleSelectComponents = Object.values(selectorToSelectComponentName);

export function migrateComponent(sourceFile: SourceFile, path: string, tree: Tree, noComments = false): string {
	const selects = findSelectContexts(sourceFile, path, tree);
	if (selects.length > 0) {
		const tsUpdate = tree.beginUpdate(path);
		const isInlineTemplate = selects[0].filePath === path;
		// If paths are the same, it's an inline template so we'll use the same updateRecord, else create a different one
		const templateUpdate = isInlineTemplate ? tsUpdate : tree.beginUpdate(selects[0].filePath);
		selects.forEach((select) => {
			if (!select.rejection) {
				switch (select.component) {
					case 'LuSelectInputComponent':
						handleLuSelectInputComponent(select, templateUpdate);
						break;
					case 'LuApiSelectInputComponent':
						handleApiSelectInputComponent(select, templateUpdate);
						break;
					case 'LuEstablishmentSelectInputComponent':
					case 'LuQualificationSelectInputComponent':
					case 'LuUserSelectModule':
						handlePremadeApiSelect(select, templateUpdate);
						break;
					case 'LuDepartmentSelectInputComponent':
						select.rejection = {
							reason: RejectionReason.TREE_OPTION_PICKER
						};
						break;
				}
			}
			// We're not checking using else here because handle** methods can also add a rejection reason
			// We want to handle both cases (before handling and after) here
			if (select.rejection) {
				currentSchematicContext.logFailure(`Couldn't migrate ${select.component} in ${path}: ${RejectionReason[select.rejection.reason]}`);
				if (!noComments) {
					insertRejectionComment(templateUpdate, select as RejectedSelectContext);
				}
			} else {
				currentSchematicContext.logSuccess(`Migrated ${select.component} in ${path}`);
			}
		});
		tree.commitUpdate(tsUpdate);
		if (!isInlineTemplate) {
			tree.commitUpdate(templateUpdate);
		}
		// We have to rebuild sourceFile in case of an inline template, since we just modified it
		const updatedSourceFile = isInlineTemplate ? createSourceFile(path, tree.readText(path), ScriptTarget.ESNext) : sourceFile;
		updateImports(updatedSourceFile, selects, path, tree);
	}
	return tree.readText(path);
}

function insertRejectionComment(update: UpdateRecorder, select: RejectedSelectContext): void {
	let detailedReason = '';
	const contextBefore = select.node.startSourceSpan.start.getContext(20, 2)?.before || '';
	const indentBefore = contextBefore.slice(contextBefore.lastIndexOf('\n') + 1);
	switch (select.rejection.reason) {
		case RejectionReason.DATA_SERVICE_OVERRIDE:
			detailedReason = `${select.rejection.details} overriden in providers`;
			break;
		case RejectionReason.UNSUPPORTED_ATTRIBUTE:
		case RejectionReason.UNSUPPORTED_INPUT:
			detailedReason = `Unsupported input: ${select.rejection.details}`;
			break;
		case RejectionReason.SELECT_ALL:
			detailedReason = `lu-option-select-all requires manual work and API support to be migrated`;
			break;
		case RejectionReason.TREE_OPTION_PICKER:
			detailedReason = `Tree selects don't have their "modern" implementation yet`;
			break;
		case RejectionReason.CONDITIONAL_MULTIPLE:
			detailedReason = `conditional multiple isn't supported by the schematic, you might want to use @if to surround this and run the migration again`;
			break;
	}

	update.insertLeft(
		select.nodeOffset + select.node.startSourceSpan.start.offset,
		`<!-- [lu-select migration] REJECTED: ${detailedReason || RejectionReason[select.rejection.reason]} -->\n${indentBefore}`
	);
}

function findSelectContexts(sourceFile: SourceFile, basePath: string, tree: Tree): SelectContext[] {
	const imports = extractComponentImports(sourceFile);
	if (possibleSelectComponents.some((c) => imports.includes(c))) {
		const selects: SelectContext[] = [];
		const template = extractNgTemplatesIncludingHtml(sourceFile, tree, basePath)[0];
		const htmlAst = new HtmlAst(template.content);
		htmlAst.visitNodes((node) => {
			if (node instanceof currentSchematicContext.angularCompiler.TmplAstElement) {
				const selectComponentClass = selectorToComponentNameRecord[node.name];
				const multipleInput = node.inputs.find((attr) => attr.name === 'multiple');
				const unsupportedMultiple = multipleInput?.value instanceof currentSchematicContext.angularCompiler.ASTWithSource && multipleInput.value.source !== 'true';
				const multipleAttr = node.attributes.find((attr) => attr.name === 'multiple');
				const multipleFromInput =
					multipleInput?.value instanceof currentSchematicContext.angularCompiler.ASTWithSource && multipleInput.value.source === 'true'
						? { start: multipleInput?.sourceSpan?.start?.offset, end: multipleInput?.sourceSpan?.end?.offset + 1 }
						: null;
				const multipleFromAttr =
					multipleAttr && (multipleAttr.value === 'true' || multipleAttr.value === '') ? { start: multipleAttr?.sourceSpan?.start?.offset, end: multipleAttr?.sourceSpan?.end?.offset + 1 } : null;
				if (selectComponentClass) {
					const context = {
						node,
						tagName: node.name,
						nodeOffset: template.offsetStart,
						component: selectComponentClass,
						rejection: unsupportedMultiple
							? {
								reason: RejectionReason.CONDITIONAL_MULTIPLE
							}
							: getCommonMigrationRejectionReason(node, sourceFile),
						filePath: template.filePath,
						componentTS: template.componentTS,
						multiple: multipleFromAttr || multipleFromInput
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
	const imports = new Set(selects.filter((s) => !s.rejection).flatMap((select) => select.requiredImports || []));
	imports.forEach((importToAdd) => {
		if (importSource[importToAdd]) {
			applyToUpdateRecorder(update, [insertTSImportIfNeeded(sourceFile, path, importToAdd, importSource[importToAdd]), insertAngularImportIfNeeded(sourceFile, path, importToAdd)]);
		} else {
			console.error(`Can't add import for ${importToAdd} because source is unknown`);
		}
	});
	tree.commitUpdate(update);
	const componentsCleanupUpdate = tree.beginUpdate(path);
	// Cleanup unused select component imports
	const updatedSourceFile = createSourceFile(path, tree.readText(path), ScriptTarget.ESNext);
	const templatesAfterUpdate = extractNgTemplatesIncludingHtml(updatedSourceFile, tree, path);
	templatesAfterUpdate.forEach((template) => {
		Object.entries(selectorToComponentName).forEach(([selector, className]) => {
			if (!template.content.includes(selector)) {
				applyToUpdateRecorder(componentsCleanupUpdate, [removeTSImport(updatedSourceFile, path, className), removeAngularImport(updatedSourceFile, path, className)]);
			}
		});
	});
	tree.commitUpdate(componentsCleanupUpdate);
	// Cleanup empty import clauses
	const cleanupUpdate = tree.beginUpdate(path);
	const cleanupSourceFile = createSourceFile(path, tree.readText(path), ScriptTarget.ESNext);
	cleanupSourceFile.statements.filter(isImportDeclaration).forEach((statement) => {
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
		select.requiredImports = select.multiple ? ['LuMultiSelectInputComponent'] : ['LuSimpleSelectInputComponent'];
		const tag = select.multiple ? 'lu-multi-select' : 'lu-simple-select';
		if (select.multiple) {
			update.remove(select.nodeOffset + select.multiple.start, select.multiple.end - select.multiple.start);
		}
		const displayer = getDisplayer(select);
		const endSpanOffset = select.node.endSourceSpan?.start.offset || -1;
		// Remove content
		update.remove(select.nodeOffset + select.node.startSourceSpan.end.offset, endSpanOffset - select.node.startSourceSpan.end.offset);
		// rename opening tag and insert options
		update.remove(select.nodeOffset + select.node.startSourceSpan.start.offset + 1, select.tagName.length);
		let newOpeningTag = `${tag} [options]="${dataSource.sourceName}"`;
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
			update.insertRight(
				select.nodeOffset + select.node.startSourceSpan.end.offset,
				`${getEOL(select.node.startSourceSpan.end.file.content)}  <ng-container *luOption="${dataSource.display.variables}; select: ${dataSource.sourceName}Select">${dataSource.display.display}</ng-container>${getEOL(select.node.startSourceSpan.end.file.content)}`
			);
		}
		if (!displayer.canBeRemoved) {
			// Create new displayer
			select.requiredImports.push('LuDisplayerDirective');
			update.insertRight(
				select.nodeOffset + select.node.startSourceSpan.end.offset,
				`${getEOL(select.node.startSourceSpan.end.file.content)}  <ng-container *luDisplayer="${displayer.variables}">${displayer.display}</ng-container>${getEOL(select.node.startSourceSpan.end.file.content)}`
			);
		}
		// If it's not a self closing tag
		if (select.node.startSourceSpan.start.offset !== select.node.endSourceSpan?.start.offset) {
			// rename closing tag
			update.remove(select.nodeOffset + endSpanOffset + 2, select.tagName.length);
			update.insertRight(select.nodeOffset + endSpanOffset + 2, tag);
		}
	}
}

function handlePremadeApiSelect(select: PremadeApiSelectContext, update: UpdateRecorder) {
	const sourceDirective = {
		LuQualificationSelectInputComponent: { selector: 'jobQualifications', className: 'LuCoreSelectJobQualificationsDirective' },
		LuUserSelectModule: { selector: 'users', className: 'LuCoreSelectUsersDirective' },
		LuEstablishmentSelectInputComponent: { selector: 'establishments', className: 'LuCoreSelectEstablishmentsDirective' },
		LuDepartmentSelectInputComponent: { selector: 'departments', className: 'LuCoreSelectDepartmentsDirective' } // Cannot happen because it's rejected but we need it to prevent compilation errors
	}[select.component];
	select.requiredImports = select.multiple ? ['LuMultiSelectInputComponent', sourceDirective.className] : ['LuSimpleSelectInputComponent', sourceDirective.className];
	const tag = select.multiple ? 'lu-multi-select' : 'lu-simple-select';
	if (select.multiple) {
		update.remove(select.nodeOffset + select.multiple.start, select.multiple.end - select.multiple.start);
	}
	const endSpanOffset = select.node.endSourceSpan?.start.offset || -1;
	// rename opening tag and insert data directive
	update.remove(select.nodeOffset + select.node.startSourceSpan.start.offset + 1, select.tagName.length);
	// rename tag and add options + selector if needed
	update.insertRight(select.nodeOffset + select.node.startSourceSpan.start.offset + 1, `${tag} ${sourceDirective.selector}`);
	// If it's not a self closing tag
	if (select.node.startSourceSpan.start.offset !== select.node.endSourceSpan?.start.offset) {
		// rename closing tag
		update.remove(select.nodeOffset + endSpanOffset + 2, select.tagName.length);
		update.insertRight(select.nodeOffset + endSpanOffset + 2, tag);
	}
}

function handleApiSelectInputComponent(select: LuApiSelectInputComponentContext, update: UpdateRecorder) {
	let apiStandard: 'v3' | 'v4' = 'v3';
	let apiEndpoint: string = '';
	let oldApiInput = { pos: 0, length: 0 };
	let oldApiStandard = { pos: 0, length: 0 };
	select.node.attributes.forEach((attr) => {
		if (attr.name === 'api') {
			apiEndpoint = attr.value;
			oldApiInput = {
				pos: attr.sourceSpan.start.offset,
				length: attr.sourceSpan.end.offset - attr.sourceSpan.start.offset
			};
		}
		if (attr.name === 'standard') {
			apiStandard = attr.value as 'v3' | 'v4';
			oldApiStandard = {
				pos: attr.sourceSpan.start.offset,
				length: attr.sourceSpan.end.offset - attr.sourceSpan.start.offset
			};
		}
	});
	select.node.inputs.forEach((input) => {
		if (input.name === 'api' && input.value instanceof currentSchematicContext.angularCompiler.ASTWithSource) {
			apiEndpoint = input.value?.source || '';
			oldApiInput = {
				pos: input.sourceSpan.start.offset,
				length: input.sourceSpan.end.offset - input.sourceSpan.start.offset
			};
		}
		if (input.name === 'standard' && input.value instanceof currentSchematicContext.angularCompiler.ASTWithSource) {
			apiStandard = (input.value?.source || 'v3') as 'v3' | 'v4';
			oldApiStandard = {
				pos: input.sourceSpan.start.offset,
				length: input.sourceSpan.end.offset - input.sourceSpan.start.offset
			};
		}
	});
	const sourceDirective = {
		v3: { selector: 'apiV3', className: 'LuCoreSelectApiV3Directive' },
		v4: { selector: 'apiV4', className: 'LuCoreSelectApiV4Directive' }
	}[apiStandard];
	select.requiredImports = select.multiple ? ['LuMultiSelectInputComponent', sourceDirective.className] : ['LuSimpleSelectInputComponent', sourceDirective.className];
	const tag = select.multiple ? 'lu-multi-select' : 'lu-simple-select';
	if (select.multiple) {
		update.remove(select.nodeOffset + select.multiple.start, select.multiple.end - select.multiple.start);
	}
	const endSpanOffset = select.node.endSourceSpan?.start.offset || -1;
	// rename opening tag and insert data directive
	update.remove(select.nodeOffset + select.node.startSourceSpan.start.offset + 1, select.tagName.length);
	if (oldApiInput.length > 0) {
		update.remove(select.nodeOffset + oldApiInput.pos, oldApiInput.length + 1);
	}
	if (oldApiStandard.length > 0) {
		update.remove(select.nodeOffset + oldApiStandard.pos, oldApiStandard.length + 1);
	}
	// rename tag and add options + selector if needed
	update.insertRight(select.nodeOffset + select.node.startSourceSpan.start.offset + 1, `${tag} ${sourceDirective.selector}="${apiEndpoint}"`);
	// If it's not a self closing tag
	if (select.node.startSourceSpan.start.offset !== select.node.endSourceSpan?.start.offset) {
		// rename closing tag
		update.remove(select.nodeOffset + endSpanOffset + 2, select.tagName.length);
		update.insertRight(select.nodeOffset + endSpanOffset + 2, tag);
	}
}
