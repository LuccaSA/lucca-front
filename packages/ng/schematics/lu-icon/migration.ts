import { HtmlAst } from '../lib/html-ast.js';
import { SourceFile } from 'typescript';
import { extractNgTemplatesIncludingHtml } from '../lib/angular-template';
import { Tree } from '@angular-devkit/schematics';
import { currentSchematicContext } from '../lib/lf-schematic-context';
import type { TmplAstElement } from '@angular/compiler';
import { insertAngularImportIfNeeded,insertTSImportIfNeeded } from '../lib/angular-component-ast';
import { applyToUpdateRecorder } from '@schematics/angular/utility/change';


interface HtmlIcon {
	node: TmplAstElement;
	icon: string;
	alt?: string;
	altSpan?: TmplAstElement;
	nodeOffset: number;
	filePath: string;
	componentTS: SourceFile;
}

export function migrateComponent(sourceFile: SourceFile, path: string, tree: Tree): string {
	const htmlIcons = findHTMLIcons(sourceFile, path, tree);
	if(htmlIcons.length > 0){
		const tsUpdate = tree.beginUpdate(path);
		const isInlineTemplate = htmlIcons[0].filePath === path;
		const templateUpdate = isInlineTemplate ? tsUpdate : tree.beginUpdate(htmlIcons[0].filePath);
		htmlIcons.forEach((icon) => {
			/**
			 * Remove stuff
			 */
			const endSpanOffset = icon.node.endSourceSpan?.start.offset || -1;
			// Remove content if there's any (content in icon, wtf?)
			templateUpdate.remove(icon.nodeOffset + icon.node.startSourceSpan.end.offset, endSpanOffset - icon.node.startSourceSpan.end.offset);
			// Remove icon classes
			templateUpdate.remove(icon.nodeOffset + icon.node.startSourceSpan.start.offset + 1, icon.node.name.length);
			// Remove closing tag
			if(icon.node.endSourceSpan?.start?.offset) {
				templateUpdate.remove(icon.nodeOffset + icon.node.endSourceSpan?.start?.offset, icon.node.endSourceSpan?.toString().length);
			}
			// If there's an aria-hidden, remove it
			const ariaHidden = icon.node.attributes.find(attr => attr.name === 'aria-hidden');
			if(ariaHidden) {
				const attrLength = (ariaHidden.valueSpan?.end?.offset || 0) - (ariaHidden.keySpan?.start?.offset || 0);
				templateUpdate.remove(icon.nodeOffset + (ariaHidden.keySpan?.start?.offset || 0), attrLength + 1);
			}
			// If there's an alt span, remove it
			if(icon.altSpan) {
				let previousEndSpanOffset = 0;
				while([' ', '\n', '\t'].includes(sourceFile.text.charAt(icon.nodeOffset - previousEndSpanOffset + icon.altSpan.startSourceSpan.start.offset - 1))) {
					previousEndSpanOffset++;
				}
				templateUpdate.remove(icon.nodeOffset - previousEndSpanOffset + icon.altSpan.startSourceSpan.start.offset, icon.altSpan.sourceSpan.toString().length + previousEndSpanOffset);
			}

			/**
			 * Add stuff
			 */
			// First of all, add opening tag, icon name and alt if it's here
			let openingTag = `lu-icon icon="${icon.icon}"`;
			if (icon.alt) {
				openingTag += ` alt="${icon.alt}"`;
			}
			templateUpdate.insertRight(icon.nodeOffset + icon.node.startSourceSpan.start.offset + 1, openingTag);
			// Self close this tag
			templateUpdate.insertRight(icon.nodeOffset + icon.node.startSourceSpan.end.offset - 1, '/');


			/**
			 * Modify classes
			 */
			const classesNode = icon.node.attributes.find(attr => attr.name === 'class');
			if(classesNode && classesNode.keySpan){
				const classes = classesNode.value;
				const cleanedClasses = classes.split(' ').filter(c => {
					return !['lucca-icon', `icon-${icon.icon}`].includes(c);
				}).join(' ');
				templateUpdate.remove(icon.nodeOffset + classesNode.keySpan.start.offset, classesNode.sourceSpan.toString().length);
				// TODO if remaining classes after cleanup, write them
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

function findHTMLIcons(sourceFile: SourceFile, basePath: string, tree: Tree): HtmlIcon[] {
	const htmlIcons: HtmlIcon[] = [];
	const ngTemplates = extractNgTemplatesIncludingHtml(sourceFile, tree, basePath);

	ngTemplates.forEach((template) => {
		const htmlAst = new HtmlAst(template.content);
		htmlAst.visitNodes((node, parent) => {
			if (isInterestingNode(node)) {
				const classes = node.attributes.find(attr => attr.name === 'class')?.value;
				if (classes?.includes("lucca-icon")){
					const iconClass = classes.split(' ').find(c => c.startsWith('icon-'));
					if (iconClass) {
						const iconName = iconClass.replace('icon-', '');
						const icon: HtmlIcon = {
							node: node,
							icon: iconName,
							nodeOffset: template.offsetStart,
							filePath: template.filePath,
							componentTS: sourceFile
						}
						if(isInterestingNode(parent)) {
							const altSpan= parent.children.find(child => {
								if(isInterestingNode(child)) {
									const childClasses = child.attributes.find(attr => attr.name === 'class')?.value;
									return childClasses === 'u-mask';
								}
								return false;
							});
							// We know it's one of these types but TS doesn't find that info from the above call so here we go again
							if (isInterestingNode(altSpan)) {
								icon.alt = altSpan.children.find(c => c instanceof currentSchematicContext.angularCompiler.TmplAstText)?.value;
								icon.altSpan = altSpan;
							}
						}
						htmlIcons.push(icon);
					}

				}
			}
		});
	});

	return htmlIcons;
}

function isInterestingNode(node: unknown): node is TmplAstElement {
	return node instanceof currentSchematicContext.angularCompiler.TmplAstElement;
}
