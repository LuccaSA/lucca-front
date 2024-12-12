import { HtmlAst } from '../lib/html-ast.js';
import ts, { isImportDeclaration, isNamedImports, ScriptTarget, SourceFile } from 'typescript';
import { extractComponentImports, insertAngularImportIfNeeded, insertTSImportIfNeeded, removeAngularImport, removeTSImport } from '../lib/angular-component-ast';
import { extractNgTemplatesIncludingHtml } from '../lib/angular-template';
import { getCommonMigrationRejectionReason, getDataSource, getDisplayer, isRejection, RejectionReason } from './util';
import { LuSelectInputContext, SelectComponent, SelectContext, selectorToComponentName } from './model/select-context';
import { TmplAstElement } from '@angular/compiler';
import { Tree } from '@angular-devkit/schematics';
import { applyToUpdateRecorder } from '@schematics/angular/utility/change';

const importSource: Record<string, string> = {
  LuSimpleSelectInputComponent: '@lucca-front/ng/simple-select',
  LuMultipleSelectInputComponent: '@lucca-front/ng/multiple-select'
};

const selectorToComponentNameRecord = selectorToComponentName as Record<string, SelectComponent>;

const possibleSelectComponents = Object.values(selectorToComponentName);

export function migrateComponent(sourceFile: SourceFile, path: string, tree: Tree): string {
  const selects = findSelectContexts(sourceFile, path, tree);
  selects.forEach((select) => {
    if (select.rejection) {
      // TODO put a comment in the result file about why it's rejected
      console.log('REJECTED', select.component, RejectionReason[select.rejection.reason], select.rejection.details);
    }
    switch (select.component) {
      case 'LuSelectInputComponent':
        handleLuSelectInputComponent(select as LuSelectInputContext, select.filePath, tree);
        break;
    }
  });
  // We have to rebuild sourceFile in case of an inline template, since we just modified it
  const updatedSourceFile = ts.createSourceFile(path, tree.readText(path), ScriptTarget.ESNext);
  updateImports(updatedSourceFile, selects, path, tree);

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
          const context: SelectContext = {
            node,
            tagName: node.name,
            nodeOffset: template.offsetStart,
            component: selectComponentClass,
            rejection: getCommonMigrationRejectionReason(node),
            filePath: template.filePath,
            componentTS: template.componentTS
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

function updateImports(sourceFile: SourceFile, selects: SelectContext[], path: string, tree: Tree) {
  const update = tree.beginUpdate(path);
  const imports = selects.flatMap(select => select.requiredImports || []);
  imports.forEach(importToAdd => {
    if (importSource[importToAdd]) {
      applyToUpdateRecorder(update, [insertTSImportIfNeeded(sourceFile, path, importToAdd, importSource[importToAdd]), insertAngularImportIfNeeded(sourceFile, path, importToAdd)]);
    } else {
      console.error(`Can't add import for ${importToAdd} because source is unknown`);
    }
  });
  // Cleanup unused select component imports
  const templatesAfterUpdate = extractNgTemplatesIncludingHtml(sourceFile, tree, path);
  templatesAfterUpdate.forEach(template => {
    Object.entries(selectorToComponentName).forEach(([selector, className]) => {
      if (!template.content.includes(selector)) {
        applyToUpdateRecorder(update, [removeTSImport(sourceFile, path, className), removeAngularImport(sourceFile, path, className)]);
      }
    });
  });
  tree.commitUpdate(update);
  const emptyImportsCleanup = tree.beginUpdate(path);
  // Cleanup empty import clauses
  const updatedSourceFile = ts.createSourceFile(path, tree.readText(path), ScriptTarget.ESNext);
  updatedSourceFile.statements
    .filter(isImportDeclaration)
    .forEach(statement => {
      if (statement.importClause && statement.importClause.namedBindings && isNamedImports(statement.importClause.namedBindings) && statement.importClause.namedBindings.elements.length === 0) {
        // +1 for trailing ;
        emptyImportsCleanup.remove(statement.getFullStart(), statement.getText(updatedSourceFile).length + 1);
      }
    });
  tree.commitUpdate(emptyImportsCleanup);
}

function handleLuSelectInputComponent(select: LuSelectInputContext, path: string, tree: Tree) {
  const dataSource = getDataSource(select);
  if (isRejection(dataSource)) {
    select.rejection = dataSource;
  } else {
    select.requiredImports = ['LuSimpleSelectInputComponent'];
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
