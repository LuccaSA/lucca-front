import { source,Tree } from '@angular-devkit/schematics';
import type { TmplAstElement } from '@angular/compiler';
import { SourceFile } from 'typescript';
import { extractNgTemplatesIncludingHtml } from '../lib/angular-template';
import { HtmlAst } from '../lib/html-ast.js';
import { currentSchematicContext } from '../lib/lf-schematic-context';


interface TextField {
	node: TmplAstElement;
	inputs: {
		size?: string;
	},
	nodeOffset: number;
	filePath: string;
	componentTS: SourceFile;
}

export function migrateComponent(sourceFile: SourceFile, path: string, tree: Tree): string {
	const textfields = findTextfields(sourceFile, path, tree);
	console.log(textfields)
	if(textfields.length > 0) {
		const tsUpdate = tree.beginUpdate(path);
		const isInlineTemplate = textfields[0].filePath === path;
		const templateUpdate = isInlineTemplate ? tsUpdate : tree.beginUpdate(textfields[0].filePath);
		textfields.forEach((field) => {
			// TODO migrate
		});
		// Add import if needed
		tree.commitUpdate(tsUpdate);
		if (!isInlineTemplate) {
			tree.commitUpdate(templateUpdate);
		}
	}
	return tree.readText(path);
}

function findTextfields(sourceFile: SourceFile, basePath: string, tree: Tree): TextField[] {
	const fields: TextField[] = [];
	const ngTemplates = extractNgTemplatesIncludingHtml(sourceFile, tree, basePath);

	ngTemplates.forEach((template) => {
		const htmlAst = new HtmlAst(template.content);
		htmlAst.visitNodes((node) => {
			if (isInterestingNode(node) && node.name === "label") {
				const classes = node.attributes.find(attr => attr.name === 'class')?.value || "";
				if (classes.split(" ").includes("textfield")) {
						const inputs = {
							size: classes.split(' ').find(c => /mod-(XS|S|M|L|XL|XXL)/.test(c))?.replace('mod-', '')
						};
						const field: TextField = {
							node: node,
							inputs,
							nodeOffset: template.offsetStart,
							filePath: template.filePath,
							componentTS: sourceFile
						}
					fields.push(field);
				}
			}
		});
	});

	return fields;
}

function isInterestingNode(node: unknown): node is TmplAstElement {
	return node instanceof currentSchematicContext.angularCompiler.TmplAstElement;
}
