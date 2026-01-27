import { Tree } from '@angular-devkit/schematics';
import type { TmplAstElement } from '@angular/compiler';
import { applyToUpdateRecorder } from '@schematics/angular/utility/change';
import { SourceFile } from 'typescript';
import { insertAngularImportIfNeeded, insertTSImportIfNeeded } from '../lib/angular-component-ast';
import { extractNgTemplatesIncludingHtml } from '../lib/angular-template';
import { HtmlAst } from '../lib/html-ast.js';
import { currentSchematicContext } from '../lib/lf-schematic-context';

interface HtmlLoading {
	node: TmplAstElement;
	inputs: {
		size?: string;
		invert?: boolean;
		block?: boolean;
		template?: 'popin' | 'drawer' | 'fullPage' | 'fullpage';
	},
	nodeOffset: number;
	filePath: string;
	componentTS: SourceFile;
}

export function migrateComponent(sourceFile: SourceFile, path: string, tree: Tree): string {
	const htmlLoadings = findHTMLLoadings(sourceFile, path, tree);

	if (htmlLoadings.length > 0) {
		const tsUpdate = tree.beginUpdate(path);
		const isInlineTemplate = htmlLoadings[0].filePath === path;
		const templateUpdate = isInlineTemplate ? tsUpdate : tree.beginUpdate(htmlLoadings[0].filePath);

		htmlLoadings.forEach((loading) => {
			const classesNode = loading.node.attributes.find(attr => attr.name === 'class');
			const loadingNodeLength = loading.node.name.length;
			// remove element name attribute
			templateUpdate.remove(loading.nodeOffset + loading.node.startSourceSpan.start.offset + 1, loadingNodeLength);

			if(classesNode && classesNode.keySpan) {
				/**
				 * Add stuff
				 */
				let thingsToAdd = `lu-loading `;
				if (loading.inputs.block) {
					thingsToAdd += thingsToAdd.at(thingsToAdd.length) !== ' ' ? '' : ' ';
					thingsToAdd += `block`;
					thingsToAdd += thingsToAdd.endsWith(' ') ? '' : ' ';
				}
				if (loading.inputs.invert) {
					thingsToAdd += thingsToAdd.at(thingsToAdd.length) !== ' ' ? '' : ' ';
					thingsToAdd += `invert`;
					thingsToAdd += thingsToAdd.endsWith(' ') ? '' : ' ';
				}
				if (loading.inputs.size) {
					thingsToAdd += thingsToAdd.at(thingsToAdd.length) !== ' ' ? '' : ' ';
					thingsToAdd += `size="L"`;
					thingsToAdd += thingsToAdd.endsWith(' ') || thingsToAdd.endsWith('>') ? '' : ' ';
				}
				if (loading.inputs.template) {
					thingsToAdd += thingsToAdd.at(thingsToAdd.length) !== ' ' ? '' : ' ';
					thingsToAdd += `template="${loading.inputs.template}"`;
					thingsToAdd += thingsToAdd.endsWith(' ') ? '' : ' ';
				}


				if (loading.node.children.length > 0 && loading.node.endSourceSpan) {
					templateUpdate.remove(loading.nodeOffset + loading.node.endSourceSpan.start.offset + 1, loadingNodeLength + 1);
					templateUpdate.insertRight(loading.nodeOffset + loading.node.startSourceSpan.start.offset + 1, thingsToAdd);
					templateUpdate.insertLeft(loading.nodeOffset + loading.node.endSourceSpan.start.offset + 1, '/lu-loading');
				} else {
					const endSpanOffset = loading.node.endSourceSpan?.start.offset || -1;
					templateUpdate.remove(loading.nodeOffset + loading.node.startSourceSpan.end.offset, endSpanOffset - loading.node.startSourceSpan.end.offset);
					// Remove closing tag
					if(loading.node.endSourceSpan?.start?.offset) {
						templateUpdate.remove(loading.nodeOffset + loading.node.endSourceSpan?.start?.offset, loading.node.endSourceSpan?.toString().length);
					}
					templateUpdate.insertRight(loading.nodeOffset + loading.node.startSourceSpan.start.offset + 1, thingsToAdd);
					// Self close this tag
					templateUpdate.insertRight(loading.nodeOffset + loading.node.startSourceSpan.end.offset - 1, '/');
				}

				/**
				 * Modify classes
				 */
				if(classesNode && classesNode.keySpan){
					const classes = classesNode.value;
					const cleanedClasses = classes.split(' ').filter(c => {
						return ![`mod-L`, `mod-block`, `mod-invert`, `loading`, `mod-invert`, `mod-popin`, `mod-drawer`, `mod-fullPage`, `mod-fullpage`].includes(c);
					}).join(' ');
					templateUpdate.remove(loading.nodeOffset + classesNode.keySpan.start.offset - 1, classesNode.sourceSpan.toString().length + 1);
					if(cleanedClasses) {
						templateUpdate.insertRight(loading.nodeOffset + classesNode.keySpan.start.offset, `class="${cleanedClasses}"${loading.node.children.length > 0 && loading.node.endSourceSpan ? '' : ' '}`);
					}
				}
			}

		});
		// Add import if needed
		applyToUpdateRecorder(tsUpdate, [insertTSImportIfNeeded(sourceFile, path, 'LoadingComponent', '@lucca-front/ng/loading'), insertAngularImportIfNeeded(sourceFile, path, 'LoadingComponent')]);
		tree.commitUpdate(tsUpdate);
		if (!isInlineTemplate) {
			tree.commitUpdate(templateUpdate);
		}
	}
	return tree.readText(path);
}

function findHTMLLoadings(sourceFile: SourceFile, basePath: string, tree: Tree): HtmlLoading[] {
	const htmlLoadings: HtmlLoading[] = [];
	const ngTemplates = extractNgTemplatesIncludingHtml(sourceFile, tree, basePath);

	ngTemplates.forEach((template) => {
		const htmlAst = new HtmlAst(template.content);
		htmlAst.visitNodes((node) => {
			if (isInterestingNode(node)) {
				const classes = node.attributes.find(attr => attr.name === 'class')?.value;
				if (classes?.includes("loading")){
					const loading = classes.split(' ').find(c => c.startsWith('loading'));
					if (loading) {
						const inputs = {
							size: classes.split(' ').find(c => /mod-L/.test(c)),
							block: classes.includes('mod-block') ? true : undefined,
							invert: classes.includes('mod-invert') ? true : undefined,
							template: getLoadingTemplate(classes),
						}
						const loading: HtmlLoading = {
							node: node,
							inputs,
							nodeOffset: template.offsetStart,
							filePath: template.filePath,
							componentTS: sourceFile,
						}

						htmlLoadings.push(loading);
					}

				}
			}
		});
	});

	return htmlLoadings;
}

function getLoadingTemplate(classes: string): 'popin' | 'drawer' | 'fullPage' | undefined {
	if (classes.includes('mod-popin')) {
		return 'popin';
	}
	if (classes.includes('mod-drawer')) {
		return 'drawer';
	}
	if (classes.includes('mod-fullPage') || classes.includes('mod-fullpage')) {
		return 'fullPage';
	}
	return undefined;
}

function isInterestingNode(node: unknown): node is TmplAstElement {
	return node instanceof currentSchematicContext.angularCompiler.TmplAstElement;
}
