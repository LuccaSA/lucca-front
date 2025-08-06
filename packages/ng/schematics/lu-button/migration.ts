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
	if(cssButtons.length > 0) {
		const tsUpdate = tree.beginUpdate(path);
		const isInlineTemplate = cssButtons[0].filePath === path;
		const templateUpdate = isInlineTemplate ? tsUpdate : tree.beginUpdate(cssButtons[0].filePath);
		cssButtons.forEach((button) => {
			const classesNode = button.node.attributes.find(attr => attr.name === 'class');
			// A button without a class cannot exist so we're getting rid of that for the rest of the logic.
			if(classesNode && classesNode.keySpan) {
				/**
				 * Add directive and inputs
				 */

				let thingsToAdd = ` luButton${button.type ? `="${button.type}"` : ""} `;
				// Converting inputs
				if (button.inputs.size) {
					thingsToAdd += `size="${button.inputs.size} `;
				}
				if (button.inputs.state) {
					thingsToAdd += `state="${button.inputs.state} `;
				}
				if (button.inputs.palette) {
					thingsToAdd += `palette="${button.inputs.palette}" `;
				}
				if (button.inputs.block) {
					thingsToAdd += "block ";
				}
				if (button.inputs.disclosure) {
					thingsToAdd += "disclosure ";
				}

				// Finally, add the string to the host
				templateUpdate.insertLeft(button.nodeOffset + classesNode.keySpan.start.offset - 1, thingsToAdd)

				/**
				 * Modify classes
				 */
					const classes = classesNode.value;
					const cleanedClasses = classes.split(' ').filter(c => {
						return ![
							'button',
							`mod-block`,
							`mod-disclosure`,
							`palette-${button.inputs.palette}`,
							`mod-text`,
							`mod-outlined`,
							`mod-inverted`,
							`mod-onlyIcon`,
							`mod-withIcon`,
							`is-${button.inputs.state}`,
							`mod-delete`,
							`mod-${button.size}`
						].includes(c);
					}).join(' ');
					templateUpdate.remove(button.nodeOffset + classesNode.keySpan.start.offset - 1, classesNode.sourceSpan.toString().length + 1);
					if (cleanedClasses) {
						templateUpdate.insertRight(button.nodeOffset + classesNode.keySpan.start.offset,`class="${cleanedClasses}"`);
					}
			}
		});
		// Add import if needed
		applyToUpdateRecorder(tsUpdate, [insertTSImportIfNeeded(sourceFile, path, 'ButtonComponent', '@lucca-front/ng/button'), insertAngularImportIfNeeded(sourceFile, path, 'ButtonComponent')]);
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
				const classes = node.attributes.find(attr => attr.name === 'class')?.value || "";
				if (classes.split(" ").includes("button")) {
						const inputs = {
							size: classes.split(' ').find(c => /mod-(XS|S|M|L|XL|XXL)/.test(c))?.replace('mod-', ''),
							block: classes.includes(`mod-block`),
							delete: classes.includes(`mod-delete`),
							disclosure: classes.includes(`mod-disclosure`),
							palette: classes.split(' ').find(c => /palette-(\w+)/.test(c))?.replace('palette-', ''),
							state: classes.split(' ').find(c => /is-(\w+)/.test(c))?.replace('is-', ''),
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
