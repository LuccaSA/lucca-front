import { Tree } from '@angular-devkit/schematics';
import type { TmplAstElement } from '@angular/compiler';
import { applyToUpdateRecorder } from '@schematics/angular/utility/change';
import { SourceFile } from 'typescript';
import { insertAngularImportIfNeeded, insertTSImportIfNeeded } from '../lib/angular-component-ast';
import { extractNgTemplatesIncludingHtml } from '../lib/angular-template';
import { HtmlAst } from '../lib/html-ast.js';
import { currentSchematicContext } from '../lib/lf-schematic-context';

interface LoadingInputs {
	size?: string;
	invert?: boolean;
	block?: boolean;
	template?: 'popin' | 'drawer' | 'fullPage' | 'fullpage';
}
interface HtmlLoading {
	node: TmplAstElement;
	inputs: LoadingInputs;
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
				let thingsToAdd = `lu-loading${hasThingsToAdd(loading.inputs) ? '' : ' '}`;
				if (loading.inputs.block) {
					thingsToAdd += ` block`;
				}
				if (loading.inputs.invert) {
					thingsToAdd += ` invert`;
				}
				if (loading.inputs.size) {
					thingsToAdd += ` size="L"`;
				}
				if (loading.inputs.template) {
					thingsToAdd += ` template="${loading.inputs.template}"`;
				}


				// with content
				if (loading.node.children.length > 0 && loading.node.endSourceSpan) {
					templateUpdate.remove(loading.nodeOffset + loading.node.endSourceSpan.start.offset + 1, loadingNodeLength + 1);
					templateUpdate.insertRight(loading.nodeOffset + loading.node.startSourceSpan.start.offset + 1, thingsToAdd);
					templateUpdate.insertLeft(loading.nodeOffset + loading.node.endSourceSpan.start.offset + 1, '/lu-loading');
				}
				// self closing
				else {
					const endSpanOffset = loading.node.endSourceSpan?.start.offset || -1;
					templateUpdate.remove(loading.nodeOffset + loading.node.startSourceSpan.end.offset, endSpanOffset - loading.node.startSourceSpan.end.offset);
					if (loading.node.endSourceSpan?.start?.offset) {
						templateUpdate.remove(loading.nodeOffset + loading.node.endSourceSpan?.start?.offset, loading.node.endSourceSpan?.toString().length);
					}
					templateUpdate.insertRight(loading.nodeOffset + loading.node.startSourceSpan.start.offset + 1, thingsToAdd);
					templateUpdate.insertRight(loading.nodeOffset + loading.node.startSourceSpan.end.offset - 1, `${hasThingsToAdd(loading.inputs) ? ' ' : ''}/`);
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
						templateUpdate.insertRight(loading.nodeOffset + classesNode.keySpan.start.offset, `${hasThingsToAdd(loading.inputs) ? ' ' : ''}class="${cleanedClasses}"`);
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

function hasThingsToAdd(inputs: LoadingInputs): boolean {
	if (inputs?.block) {
		return true;
	}
	if (inputs?.invert) {
		return true;
	}
	if (inputs?.size) {
		return true;
	}
	if (inputs?.template) {
		return true;
	}
	return false;
}

function getLoadingTemplate(classes: string): 'popin' | 'drawer' | 'fullPage' | undefined {
	if (classes.includes('mod-popin')) {
		return 'popin';
	}
	if (classes.includes('mod-drawer')) {
		return 'drawer';
	}
	// fullpage is deprecated so we always use fullPage here
	if (classes.includes('mod-fullPage') || classes.includes('mod-fullpage')) {
		return 'fullPage';
	}
	return undefined;
}

function isInterestingNode(node: unknown): node is TmplAstElement {
	return node instanceof currentSchematicContext.angularCompiler.TmplAstElement;
}
