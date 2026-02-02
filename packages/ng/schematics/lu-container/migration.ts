import { Tree } from '@angular-devkit/schematics';
import type { TmplAstElement } from '@angular/compiler';
import { applyToUpdateRecorder } from '@schematics/angular/utility/change';
import { SourceFile } from 'typescript';
import { insertAngularImportIfNeeded, insertTSImportIfNeeded } from '../lib/angular-component-ast';
import { extractNgTemplatesIncludingHtml } from '../lib/angular-template';
import { HtmlAst } from '../lib/html-ast.js';
import { currentSchematicContext } from '../lib/lf-schematic-context';

interface ContainerInputs {
	center?: boolean;
	overflow?: boolean;
	max?: string;
}
interface HTMLContainer {
	node: TmplAstElement;
	inputs: ContainerInputs;
	nodeOffset: number;
	filePath: string;
	componentTS: SourceFile;
}

export function migrateComponent(sourceFile: SourceFile, path: string, tree: Tree): string {
	const htmlContainers = findHTMLContainers(sourceFile, path, tree);

	if (htmlContainers.length > 0) {
		const tsUpdate = tree.beginUpdate(path);
		const isInlineTemplate = htmlContainers[0].filePath === path;
		const templateUpdate = isInlineTemplate ? tsUpdate : tree.beginUpdate(htmlContainers[0].filePath);

		htmlContainers.forEach((container) => {
			const classesNode = container.node.attributes.find(attr => attr.name === 'class');
			const containerNodeLength = container.node.name.length;
			const hasAriaHidden = container.node.attributes.find(attr => attr.name === 'aria-hidden');
			const hasStyle = container.node.attributes.find(attr => attr.name === 'style');
			// remove element name attribute
			templateUpdate.remove(container.nodeOffset + container.node.startSourceSpan.start.offset + 1, containerNodeLength);

			if(classesNode && classesNode.keySpan) {
				/**
				 * Add stuff
				 */
				let thingsToAdd = `lu-container${hasThingsToAdd(container.inputs) || hasAriaHidden || hasStyle ? '' : ' '}`;
				if (container.inputs.center) {
					thingsToAdd += ` center`;
				}
				if (container.inputs.overflow) {
					thingsToAdd += ` overflow`;
				}
				if (container.inputs.max) {
					thingsToAdd += ` max="${container.inputs.max}"`;
				}

				// with content
				if (container.node.children.length > 0 && container.node.endSourceSpan) {
					templateUpdate.remove(container.nodeOffset + container.node.endSourceSpan.start.offset + 1, containerNodeLength + 1);
					templateUpdate.insertRight(container.nodeOffset + container.node.startSourceSpan.start.offset + 1, thingsToAdd);
					templateUpdate.insertLeft(container.nodeOffset + container.node.endSourceSpan.start.offset + 1, '/lu-container');
				}
				// self closing
				else {
					const endSpanOffset = container.node.endSourceSpan?.start.offset || -1;
					templateUpdate.remove(container.nodeOffset + container.node.startSourceSpan.end.offset, endSpanOffset - container.node.startSourceSpan.end.offset);
					if (container.node.endSourceSpan?.start?.offset) {
						templateUpdate.remove(container.nodeOffset + container.node.endSourceSpan?.start?.offset, container.node.endSourceSpan?.toString().length);
					}
					templateUpdate.insertRight(container.nodeOffset + container.node.startSourceSpan.start.offset + 1, thingsToAdd);
					templateUpdate.insertRight(container.nodeOffset + container.node.startSourceSpan.end.offset - 1, `${hasThingsToAdd(container.inputs) || hasAriaHidden || hasStyle ? ' ' : ''}/`);
				}

				/**
				 * Modify classes
				 */
				if(classesNode && classesNode.keySpan){
					const classes = classesNode.value;
					const cleanedClasses = classes.split(' ').filter(c => {
						return ![`mod-max${container.inputs.max}`, `mod-overflow`, `mod-center`, `container`].includes(c);
					}).join(' ');
					templateUpdate.remove(container.nodeOffset + classesNode.keySpan.start.offset - 1, classesNode.sourceSpan.toString().length + 1);
					if(cleanedClasses) {
						templateUpdate.insertRight(container.nodeOffset + classesNode.keySpan.start.offset, `${hasThingsToAdd(container.inputs) || hasAriaHidden || hasStyle ? ' ' : ''}class="${cleanedClasses}"`);
					}
				}
			}

		});
		// Add import if needed
		applyToUpdateRecorder(tsUpdate, [insertTSImportIfNeeded(sourceFile, path, 'ContainerComponent', '@lucca-front/ng/container'), insertAngularImportIfNeeded(sourceFile, path, 'ContainerComponent')]);
		tree.commitUpdate(tsUpdate);
		if (!isInlineTemplate) {
			tree.commitUpdate(templateUpdate);
		}
	}
	return tree.readText(path);
}

function findHTMLContainers(sourceFile: SourceFile, basePath: string, tree: Tree): HTMLContainer[] {
	const htmlContainer: HTMLContainer[] = [];
	const ngTemplates = extractNgTemplatesIncludingHtml(sourceFile, tree, basePath);

	ngTemplates.forEach((template) => {
		const htmlAst = new HtmlAst(template.content);
		htmlAst.visitNodes((node) => {
			if (isInterestingNode(node)) {
				const classes = node.attributes.find(attr => attr.name === 'class')?.value;
				// match check if it's only "container" not container-custom ...
				if (classes?.includes("container") && classes?.match(/(^|\s)container(\s|$)/)){
					const container = classes.split(' ').find(c => c.startsWith('container'));
					if (container) {
						const inputs: ContainerInputs = {
							max: classes.split(' ').find(c => /mod-max(M|L|XL|XXL|XXXL)/.test(c))?.replace('mod-max', ''),
							center: classes.includes('mod-center') ? true : undefined,
							overflow: classes.includes('mod-overflow') ? true : undefined,
						}
						const container: HTMLContainer = {
							node: node,
							inputs,
							nodeOffset: template.offsetStart,
							filePath: template.filePath,
							componentTS: sourceFile,
						}

						htmlContainer.push(container);
					}

				}
			}
		});
	});

	return htmlContainer;
}

function hasThingsToAdd(inputs: ContainerInputs): boolean {
	if (inputs?.max) {
		return true;
	}
	if (inputs?.overflow) {
		return true;
	}
	if (inputs?.center) {
		return true;
	}
	return false;
}

function isInterestingNode(node: unknown): node is TmplAstElement {
	return node instanceof currentSchematicContext.angularCompiler.TmplAstElement;
}
