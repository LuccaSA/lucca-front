import { Tree } from '@angular-devkit/schematics';
import type { TmplAstElement } from '@angular/compiler';
import { SourceFile } from 'typescript';
import { extractNgTemplatesIncludingHtml } from '../lib/angular-template';
import { HtmlAst,HtmlAstVisitor } from '../lib/html-ast.js';
import { currentSchematicContext } from '../lib/lf-schematic-context';
import { getInputValue,InputValue,inputValueToHTML,insertAngularImportIfNeeded,insertTSImportIfNeeded } from '../lib/angular-component-ast';
import { applyToUpdateRecorder } from '@schematics/angular/utility/change';


interface TextField {
	node: TmplAstElement;
	inputs: {
		size?: string;
		placeholder?: InputValue;
		formControlName?: InputValue;
		formControl?: InputValue;
		ngModel?: InputValue;
		forceRequired?: InputValue;
	},
	classes: string[];
	label?: string;
	rejection?: string;
	nodeOffset: number;
	filePath: string;
	componentTS: SourceFile;
}

export function migrateComponent(sourceFile: SourceFile, path: string, tree: Tree): string {
	const textfields = findTextfields(sourceFile, path, tree);
	if(textfields.length > 0) {
		const tsUpdate = tree.beginUpdate(path);
		const isInlineTemplate = textfields[0].filePath === path;
		const templateUpdate = isInlineTemplate ? tsUpdate : tree.beginUpdate(textfields[0].filePath);

		textfields.forEach((field) => {
			if(field.rejection) {
				console.log(`[REJECTED] ${field.filePath}#L${field.node.startSourceSpan.start.line} => ${field.rejection}`)
			} else {
				// Let's remove everything first
				templateUpdate.remove(field.nodeOffset + field.node.startSourceSpan.start.offset, field.node.sourceSpan.toString().length);
				// Then forge the new input
				const textInput = `<lu-text-input ${
					inputValueToHTML('placeholder', field.inputs.placeholder)} ${
					inputValueToHTML('formControlName', field.inputs.formControlName)} ${
					inputValueToHTML('ngModel', field.inputs.ngModel)} />`.replace(/\s{2,}/, " ");
				const fieldOpeningTag = `lu-form-field [label]="labelTpl"`.replace(/\s{2,}/, " ").trim();
				// TODO handle required migration from template-driven to form-driven???
				const newInput = `<${fieldOpeningTag}>
			<ng-template #labelTpl>${field.label}</ng-template>
			${textInput}
		</lu-form-field>`
				templateUpdate.insertRight(field.nodeOffset + field.node.startSourceSpan.start.offset, newInput);
			}
		});
		// Add import if needed
		applyToUpdateRecorder(tsUpdate, [
			insertTSImportIfNeeded(sourceFile, path, 'FormFieldComponent', '@lucca-front/ng/form-field'),
			insertAngularImportIfNeeded(sourceFile, path, 'FormFieldComponent'),
			insertTSImportIfNeeded(sourceFile, path, 'TextInputComponent', '@lucca-front/ng/forms'),
			insertAngularImportIfNeeded(sourceFile, path, 'TextInputComponent')
		]);
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
				const classes = getNodeClasses(node);
				const inputs: TextField['inputs'] = {
					size: classes.find(c => /mod-(XS|S|M|L|XL|XXL)/.test(c))?.replace('mod-', '')
				};
				const field: TextField = {
					node: node,
					inputs,
					nodeOffset: template.offsetStart,
					filePath: template.filePath,
					componentTS: sourceFile,
					classes: classes
				}
				if (classes.includes("textfield")) {
					if (node.children.filter(el => isInterestingNode(el)).length > 2) {
						field.rejection = "Field contains more than an input + label"
					}
					// Find native input and grab params from it
					const nativeInput = node.children.find(el => isInterestingNode(el) && el.name === "input")
					if (!nativeInput) {
						field.rejection = "Field doesn't contain a native input[type=text]"
					} else if(isInterestingNode(nativeInput)) {
						inputs.placeholder = getInputValue(nativeInput, "placeholder");
						inputs.formControlName = getInputValue(nativeInput, "formControlName");
						inputs.ngModel = getInputValue(nativeInput, "ngModel");
						inputs.forceRequired = getInputValue(nativeInput, "aria-required")
					}
					// This is a textfield, now let's find if it has everything required for migration
					const visitor = new HtmlAstVisitor(node);
					visitor.visitElements(/span/, (el) => {
						if (isInterestingNode(el) && getNodeClasses(el).includes("textfield-label")) {
							field.label = template.content.slice(el.startSourceSpan.end.offset, el.endSourceSpan?.start?.offset)
						}
					});
					if (!field.label) {
						field.rejection = "Field has no label"
					}
					fields.push(field);
				}
			}
		});
	});

	return fields;
}

function getNodeClasses(node: TmplAstElement) {
	return (node.attributes.find(attr => attr.name === 'class')?.value || "").split(" ");
}


function isInterestingNode(node: unknown): node is TmplAstElement {
	return node instanceof currentSchematicContext.angularCompiler.TmplAstElement;
}
