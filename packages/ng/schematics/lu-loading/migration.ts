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
		template: 'popin' | 'drawer' | 'fullPage' | 'fullpage' | '';
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
			const endSpanOffset = loading.node.endSourceSpan?.start.offset || -1;
			templateUpdate.remove(loading.nodeOffset + loading.node.startSourceSpan.end.offset, endSpanOffset - loading.node.startSourceSpan.end.offset);
			// Remove icon classes
			templateUpdate.remove(loading.nodeOffset + loading.node.startSourceSpan.start.offset + 1, loading.node.name.length);
			// Remove closing tag
			if(loading.node.endSourceSpan?.start?.offset) {
				templateUpdate.remove(loading.nodeOffset + loading.node.endSourceSpan?.start?.offset, loading.node.endSourceSpan?.toString().length);
			}

			/**
			 * Add stuff
			 */
			// First of all, add opening tag, icon name and alt if it's here
			let openingTag = `lu-loading`;
			if (loading.inputs.block) {
				openingTag += ` block`;
			}
			if (loading.inputs.invert) {
				openingTag += ` invert`;
			}
			if (loading.inputs.size) {
				openingTag += ` size="${loading.inputs.size}"`;
			}
			if (loading.inputs.template.length > 0) {
				openingTag += ` template="${loading.inputs.template}"`;
			}

			templateUpdate.insertRight(loading.nodeOffset + loading.node.startSourceSpan.start.offset + 1, openingTag);
			// Self close this tag
			templateUpdate.insertRight(loading.nodeOffset + loading.node.startSourceSpan.end.offset - 1, '/');


			/**
			 * Modify classes
			 */
			// const classesNode = icon.node.attributes.find(attr => attr.name === 'class');
			// if(classesNode && classesNode.keySpan){
			// 	const classes = classesNode.value;
			// 	const cleanedClasses = classes.split(' ').filter(c => {
			// 		return !['lucca-icon', `icon-${icon.icon}`, `mod-${icon.size}`].includes(c);
			// 	}).join(' ');
			// 	templateUpdate.remove(icon.nodeOffset + classesNode.keySpan.start.offset - 1, classesNode.sourceSpan.toString().length + 1);
			// 	if(cleanedClasses) {
			// 		templateUpdate.insertRight(icon.nodeOffset + classesNode.keySpan.start.offset, `class="${cleanedClasses}"`);
			// 	}
			// }

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
							block: classes.includes('mod-block'),
							invert: classes.includes('mod-invert'),
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

function getLoadingTemplate(classes: string): 'popin' | 'drawer' | 'fullPage' | '' {
	if (classes.includes('mod-popin')) {
		return 'popin';
	}
	if (classes.includes('mod-drawer')) {
		return 'drawer';
	}
	if (classes.includes('mod-fullPage') || classes.includes('mod-fullpage')) {
		return 'fullPage';
	}
	return '';
}

function isInterestingNode(node: unknown): node is TmplAstElement {
	return node instanceof currentSchematicContext.angularCompiler.TmplAstElement;
}
