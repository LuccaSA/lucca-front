import { HtmlAst } from '../lib/html-ast.js';
import { SourceFile } from 'typescript';
import { extractNgTemplatesIncludingHtml } from '../lib/angular-template';
import { Tree } from '@angular-devkit/schematics';
import { currentSchematicContext } from '../lib/lf-schematic-context';
import type { TmplAstElement } from '@angular/compiler';
import { insertAngularImportIfNeeded,insertTSImportIfNeeded } from '../lib/angular-component-ast';
import { applyToUpdateRecorder } from '@schematics/angular/utility/change';
import { ButtonComponent } from '@lucca-front/ng/button';


interface CssButton {
	node: TmplAstElement;
	type: string;
	inputs: {
		size?: string;
		block: boolean;
		delete: boolean;
		disclosure: boolean;
		palette?: string;
		state?: string;
	},
	size?: string;
	nodeOffset: number;
	filePath: string;
	componentTS: SourceFile;
}

export function migrateComponent(sourceFile: SourceFile, path: string, tree: Tree): string {
	const cssButtons = findCssButtons(sourceFile, path, tree);
	if(cssButtons.length > 0){
		const tsUpdate = tree.beginUpdate(path);
		const isInlineTemplate = cssButtons[0].filePath === path;
		const templateUpdate = isInlineTemplate ? tsUpdate : tree.beginUpdate(cssButtons[0].filePath);
		cssButtons.forEach((icon) => {
			/**
			 * Remove stuff
			 */
			const endSpanOffset = icon.node.endSourceSpan?.start.offset || -1;
			// Remove content if there's any (content in icon, wtf?)
			templateUpdate.remove(icon.nodeOffset + icon.node.startSourceSpan.end.offset, endSpanOffset - icon.node.startSourceSpan.end.offset);
			// Remove icon classes
			templateUpdate.remove(icon.nodeOffset + icon.node.startSourceSpan.start.offset + 1, icon.node.name.length);

			/**
			 * Add stuff
			 */

			/**
			 * Modify classes
			 */
			const classesNode = icon.node.attributes.find(attr => attr.name === 'class');
			if(classesNode && classesNode.keySpan){
				const classes = classesNode.value;
				const cleanedClasses = classes.split(' ').filter(c => {
					return !['lucca-icon', `icon-`, `mod-${icon.size}`].includes(c);
				}).join(' ');
				templateUpdate.remove(icon.nodeOffset + classesNode.keySpan.start.offset - 1, classesNode.sourceSpan.toString().length + 1);
				if(cleanedClasses) {
					templateUpdate.insertRight(icon.nodeOffset + classesNode.keySpan.start.offset, `class="${cleanedClasses}"`);
				}
			}

		});
		// Add import if needed
		applyToUpdateRecorder(tsUpdate, [insertTSImportIfNeeded(sourceFile, path, 'IconComponent', '@lucca-front/ng/icon'), insertAngularImportIfNeeded(sourceFile, path, 'IconComponent')]);
		tree.commitUpdate(tsUpdate);
		if (!isInlineTemplate) {
			tree.commitUpdate(templateUpdate);
		}
	}
	return tree.readText(path);
}

function findCssButtons(sourceFile: SourceFile, basePath: string, tree: Tree): CssButton[] {
	const buttons: CssButton[] = [];
	const ngTemplates = extractNgTemplatesIncludingHtml(sourceFile, tree, basePath);

	ngTemplates.forEach((template) => {
		const htmlAst = new HtmlAst(template.content);
		htmlAst.visitNodes((node) => {
			if (isInterestingNode(node) && ["button", "a"].includes(node.name)) {
				const classes = node.attributes.find(attr => attr.name === 'class')?.value;
				if (classes?.includes("button")) {
						const buttonSize = classes.split(' ').find(c => /mod-(XS|S|M|L|XL|XXL)/.test(c));
						const inputs = {
							size: buttonSize?.replace('mod-', ''),
							block: classes.includes(`mod-block`),
							delete: classes.includes(`mod-delete`),
							disclosure: classes.includes(`mod-disclosure`),
							palette: classes.split(' ').find(c => /palette-(\w+)/.test(c)),
							state: classes.split(' ').find(c => /is-(\w+)/.test(c)),
						};
						const button: CssButton = {
							node: node,
							type: getButtonType(classes),
							inputs,
							nodeOffset: template.offsetStart,
							filePath: template.filePath,
							componentTS: sourceFile
						}
					buttons.push(button);
				}
			}
		});
	});

	return buttons;
}

function getButtonType(classes: string): ButtonComponent['luButton'] {
	if(classes.includes('mod-outlined')) {
		return 'outlined';
	}
	if(classes.includes('mod-text')) {
		if(classes.includes('mod-invert')) {
			return 'text-invert';
		}
		return 'text';
	}
	return '';
}

function isInterestingNode(node: unknown): node is TmplAstElement {
	return node instanceof currentSchematicContext.angularCompiler.TmplAstElement;
}
