import { Tree } from '@angular-devkit/schematics';
import type { TmplAstElement } from '@angular/compiler';
import { applyToUpdateRecorder } from '@schematics/angular/utility/change';
import { SourceFile } from 'typescript';
import { extractNgTemplatesIncludingHtml, HtmlAst, insertAngularImportIfNeeded, insertTSImportIfNeeded, isInterestingNode } from '../lib';

interface CssButton {
	node: TmplAstElement;
	type: string;
	inputs: {
		size?: string;
		block: boolean;
		critical: boolean;
		disabled: boolean;
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
					thingsToAdd += `size="${button.inputs.size}" `;
				}
				if (button.inputs.state) {
					thingsToAdd += `state="${button.inputs.state}" `;
				}
				if (button.inputs.palette) {
					thingsToAdd += `palette="${button.inputs.palette}" `;
				}
				if (button.inputs.critical) {
					thingsToAdd += "critical ";
				}
				if (button.inputs.disabled) {
					thingsToAdd += "disabled ";
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
					const removedClasses = [
						'button',
						`mod-block`,
						`mod-disclosure`,
						`palette-${button.inputs.palette}`,
						`mod-text`,
						`mod-link`,
						`mod-ghost`,
						`mod-outline`,
						`mod-outlined`,
						`mod-AI`,
						`mod-onlyIcon`,
						`mod-withIcon`,
						`is-${button.inputs.state}`,
						`mod-delete`,
						`mod-critical`,
						`is-disabled`,
						// Bare state classes are deprecated aliases of .is-*
						'loading',
						'error',
						'success',
						'disabled',
						`mod-${button.inputs.size}`
					];
					// Invert is only carried by the ghost-invert and AI-invert types, otherwise the class is kept
					const invertedByType = button.type.endsWith('-invert');
					const cleanedClasses = classes.split(' ').filter(c => !removedClasses.includes(c) && !(invertedByType && INVERT_CLASSES.includes(c)))
						// .mod-invert is a deprecated alias of .mod-inverted
						.map(c => c === 'mod-invert' ? 'mod-inverted' : c)
						.join(' ');
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
						const classList = classes.split(' ');
						const inputs = {
							size: classList.find(c => /^mod-(XS|S|M|L|XL|XXL)$/.test(c))?.replace('mod-', ''),
							block: classList.includes(`mod-block`),
							critical: classList.includes(`mod-delete`) || classList.includes(`mod-critical`),
							disabled: classList.includes(`disabled`) || classList.includes(`is-disabled`),
							disclosure: classList.includes(`mod-disclosure`),
							palette: classList.find(c => /palette-(\w+)/.test(c))?.replace('palette-', ''),
							state: classList.find(c => /^(is-)?(loading|error|success)$/.test(c))?.replace('is-', ''),
						};
						const button: CssButton = {
							node: node,
							type: getButtonType(classList),
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

const INVERT_CLASSES = ['mod-invert', 'mod-inverted'];

function getButtonType(classList: string[]): string {
	const inverted = INVERT_CLASSES.some(c => classList.includes(c));
	// .mod-outline is a deprecated alias of .mod-outlined
	if(classList.includes('mod-outlined') || classList.includes('mod-outline')) {
		return 'outlined';
	}
	if(classList.includes('mod-AI')) {
		return inverted ? 'AI-invert' : 'AI';
	}
	// .mod-text and .mod-link are deprecated aliases of .mod-ghost
	if(['mod-ghost', 'mod-text', 'mod-link'].some(c => classList.includes(c))) {
		return inverted ? 'ghost-invert' : 'ghost';
	}
	return '';
}
