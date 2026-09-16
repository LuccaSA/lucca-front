import { Tree } from '@angular-devkit/schematics';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { TmplAstElement } from '@angular/compiler';
import { applyToUpdateRecorder } from '@schematics/angular/utility/change';
import { createSourceFile, ScriptTarget } from 'typescript';
import {
	addAttributeUpdate,
	applyUpdates,
	currentSchematicContext,
	extractNgTemplatesIncludingHtml,
	FileUpdate,
	HtmlAst,
	insertAngularImportIfNeeded,
	insertTSImportIfNeeded,
	removeAttributeUpdate,
	updateAngularTemplate,
	updateContent,
} from '../lib';

const fileUploadEntrypoint = '@lucca-front/ng/file-upload';

const wrapperClass = 'fileEntryDisplayWrapper';

/** Alias given to the migrated entry in the generated `@if` block. */
const entryAlias = 'fileEntry';

/** Components whose `size` input has been flipped: `S` became the default, `L` restores the previous rendering. */
const sizedComponents = ['lu-single-file-upload', 'lu-multi-file-upload', 'lu-file-entry'];

/** Inputs `lu-single-file-upload` used to forward to the `lu-file-entry` it rendered itself. */
const fileEntryInputs = ['entry', 'state', 'previewUrl', 'inlineMessageError', 'displayFileName'];

/** Outputs `lu-single-file-upload` used to forward to the `lu-file-entry` it rendered itself. */
const fileEntryOutputs = ['deleteFile'];

export function migrateComponent(path: string, content: string, tree: Tree): string {
	const sourceFile = createSourceFile(path, content, ScriptTarget.ESNext);
	const symbolsToImport = new Set<string>();

	// External templates are rewritten in place, they are not part of the component file.
	extractNgTemplatesIncludingHtml(sourceFile, tree, path)
		.filter((template) => template.filePath !== path)
		.forEach((template) => {
			const migrated = migrateTemplate(template.filePath, template.content, symbolsToImport);

			if (migrated !== template.content) {
				tree.overwrite(template.filePath, migrated);
			}
		});

	const result = updateAngularTemplate(path, content, (template) => migrateTemplate(path, template, symbolsToImport));

	if (symbolsToImport.size === 0) {
		return result;
	}

	// Imports are inserted one symbol at a time: every insertion shifts the offsets the next one relies on.
	tree.overwrite(path, result);

	symbolsToImport.forEach((symbol) => {
		const updatedSourceFile = createSourceFile(path, tree.readText(path), ScriptTarget.ESNext);
		const recorder = tree.beginUpdate(path);
		applyToUpdateRecorder(recorder, [insertTSImportIfNeeded(updatedSourceFile, path, symbol, fileUploadEntrypoint), insertAngularImportIfNeeded(updatedSourceFile, path, symbol)]);
		tree.commitUpdate(recorder);
	});

	return tree.readText(path);
}

/**
 * Rules are applied in this order on purpose:
 * 1. sizes are normalized first, so that splitting a `lu-single-file-upload` reads an already migrated size;
 * 2. the split then emits its own `lu-file-entry-wrapper`, which the class rule must not visit again.
 */
function migrateTemplate(path: string, template: string, symbolsToImport: Set<string>): string {
	let result = migrateSize(path, template);
	result = migrateFileEntryRendering(path, result, symbolsToImport);
	return migrateWrapperClass(path, result, symbolsToImport);
}

function migrateSize(path: string, template: string): string {
	return updateContent(template, (updates) => {
		const htmlAst = new HtmlAst(template);

		sizedComponents.forEach((component) => {
			htmlAst.visitElements(component, (element) => {
				const boundSize = element.inputs.find((input) => input.name === 'size');

				if (boundSize) {
					const source = boundSize.value instanceof currentSchematicContext.angularCompiler.ASTWithSource ? boundSize.value.source ?? '' : '';

					switch (source.trim()) {
						case `'S'`:
						case `"S"`:
							updates.push(removeAttributeUpdate(template, boundSize));
							currentSchematicContext.logSuccess(`Removing redundant [size] on <${component}> in ${path}`);
							break;
						case 'null':
							updates.push({
								position: boundSize.value.sourceSpan.start,
								oldContent: source,
								newContent: source.replace('null', `'L'`),
							});
							currentSchematicContext.logSuccess(`Setting [size] to 'L' on <${component}> in ${path}`);
							break;
						default:
							currentSchematicContext.warn(`${path}: [size] of <${component}> is bound to an expression, migrate it manually ('S' is now the default value, 'L' is the previous one).`);
					}

					return;
				}

				const size = element.attributes.find((attribute) => attribute.name === 'size');

				if (!size) {
					updates.push(addAttributeUpdate(element, 'size', 'L'));
					currentSchematicContext.logSuccess(`Adding size="L" on <${component}> in ${path}`);
					return;
				}

				if (size.value === 'S') {
					updates.push(removeAttributeUpdate(template, size));
					currentSchematicContext.logSuccess(`Removing redundant size="S" on <${component}> in ${path}`);
					return;
				}

				currentSchematicContext.warn(`${path}: size="${size.value}" of <${component}> is not a known value, migrate it manually ('S' is now the default value, 'L' is the previous one).`);
			});
		});
	});
}

/**
 * `lu-single-file-upload` no longer renders the `FileEntry` it receives: the parent now displays it itself,
 * through a `lu-file-entry` wrapped in a `lu-file-entry-wrapper`.
 */
function migrateFileEntryRendering(path: string, template: string, symbolsToImport: Set<string>): string {
	return updateContent(template, (updates) => {
		const htmlAst = new HtmlAst(template);

		htmlAst.visitElements('lu-single-file-upload', (element) => {
			const entry = element.inputs.find((input) => input.name === 'entry');

			if (!entry) {
				if (element.attributes.some((attribute) => attribute.name === 'entry')) {
					currentSchematicContext.warn(`${path}: <lu-single-file-upload> has a static entry attribute, migrate it manually.`);
				}
				return;
			}

			// A size left bound to an expression by the size rule cannot be turned into the `media` of the file
			// entry, which is what the file upload used to derive from it.
			if (element.inputs.some((input) => input.name === 'size') && !hasSizeL(element)) {
				currentSchematicContext.warn(`${path}: <lu-single-file-upload [entry]> has a [size] bound to an expression, migrate it manually.`);
				return;
			}

			const openingTag = template.slice(element.startSourceSpan.start.offset, element.startSourceSpan.end.offset);

			if (/\s\*[\w-]+/.test(openingTag)) {
				currentSchematicContext.warn(`${path}: <lu-single-file-upload [entry]> carries a structural directive, migrate it manually.`);
				return;
			}

			const entryExpression = entry.value instanceof currentSchematicContext.angularCompiler.ASTWithSource ? (entry.value.source ?? '').trim() : '';

			if (!entryExpression) {
				currentSchematicContext.warn(`${path}: could not read the [entry] expression of <lu-single-file-upload>, migrate it manually.`);
				return;
			}

			updates.push(buildFileEntryRendering(template, element, entryExpression));
			symbolsToImport.add('FileEntryComponent');
			symbolsToImport.add('FileEntryWrapperComponent');
			currentSchematicContext.logSuccess(`Extracting the FileEntry of <lu-single-file-upload> in ${path}`);
		});
	});
}

function buildFileEntryRendering(template: string, element: TmplAstElement, entryExpression: string): FileUpdate {
	const start = element.sourceSpan.start.offset;
	const end = (element.endSourceSpan ?? element.sourceSpan).end.offset;
	const movedAttributes = [
		...element.inputs.filter((input) => fileEntryInputs.includes(input.name)),
		...element.attributes.filter((attribute) => fileEntryInputs.includes(attribute.name)),
		...element.outputs.filter((output) => fileEntryOutputs.includes(output.name)),
	];

	// `lu-single-file-upload` used to render its entry as a media only in its large variant, always at size L.
	const isLarge = hasSizeL(element);
	const hasStructure = [...element.attributes, ...element.inputs].some((attribute) => attribute.name === 'structure');
	const fileEntryAttributes = [
		`[entry]="${entryAlias}"`,
		'size="L"',
		isLarge ? 'media' : '',
		hasStructure ? 'structure' : '',
		...movedAttributes.filter((attribute) => attribute.name !== 'entry').map((attribute) => template.slice(attribute.sourceSpan.start.offset, attribute.sourceSpan.end.offset)),
	].filter(Boolean);

	// The remaining file upload keeps everything the file entry did not take, formatting included.
	const fileUpload = applyUpdates(
		template.slice(start, end),
		movedAttributes.map((attribute) => {
			const update = removeAttributeUpdate(template, attribute);
			return { ...update, position: update.position - start };
		}),
	);

	const indent = getIndent(template, start);
	const unit = indent.includes(' ') && !indent.includes('\t') ? '  ' : '\t';

	return {
		position: start,
		oldContent: template.slice(start, end),
		newContent: [
			`@if (${entryExpression}; as ${entryAlias}) {`,
			`${indent}${unit}<lu-file-entry-wrapper>`,
			`${indent}${unit}${unit}<lu-file-entry ${fileEntryAttributes.join(' ')} />`,
			`${indent}${unit}</lu-file-entry-wrapper>`,
			`${indent}} @else {`,
			`${indent}${unit}${fileUpload}`,
			`${indent}}`,
		].join('\n'),
	};
}

/** The `fileEntryDisplayWrapper` CSS class is now carried by the `lu-file-entry-wrapper` component. */
function migrateWrapperClass(path: string, template: string, symbolsToImport: Set<string>): string {
	return updateContent(template, (updates) => {
		const htmlAst = new HtmlAst(template);

		htmlAst.visitElements(/.*/, (element) => {
			const boundClass = element.inputs.find((input) => input.name === 'class' || input.name === `class.${wrapperClass}` || input.name === 'ngClass');

			if (boundClass && template.slice(boundClass.sourceSpan.start.offset, boundClass.sourceSpan.end.offset).includes(wrapperClass)) {
				currentSchematicContext.warn(`${path}: .${wrapperClass} is applied through a binding on <${element.name}>, migrate it manually.`);
				return;
			}

			const classAttribute = element.attributes.find((attribute) => attribute.name === 'class');
			const classes = classAttribute?.value.split(/\s+/).filter(Boolean) ?? [];

			if (!classes.includes(wrapperClass) || !classAttribute) {
				return;
			}

			updates.push({
				position: element.startSourceSpan.start.offset + '<'.length,
				oldContent: element.name,
				newContent: 'lu-file-entry-wrapper',
			});

			if (element.endSourceSpan && !element.isSelfClosing) {
				updates.push({
					position: element.endSourceSpan.start.offset + '</'.length,
					oldContent: element.name,
					newContent: 'lu-file-entry-wrapper',
				});
			}

			const remainingClasses = classes.filter((className) => className !== wrapperClass);

			if (remainingClasses.length === 0) {
				updates.push(removeAttributeUpdate(template, classAttribute));
			} else if (classAttribute.valueSpan) {
				updates.push({
					position: classAttribute.valueSpan.start.offset,
					oldContent: classAttribute.value,
					newContent: remainingClasses.join(' '),
				});
			}

			symbolsToImport.add('FileEntryWrapperComponent');
			currentSchematicContext.logSuccess(`Replacing .${wrapperClass} with <lu-file-entry-wrapper> in ${path}`);
		});
	});
}

function hasSizeL(element: TmplAstElement): boolean {
	if (element.attributes.some((attribute) => attribute.name === 'size' && attribute.value === 'L')) {
		return true;
	}

	return element.inputs.some((input) => {
		const source = input.value instanceof currentSchematicContext.angularCompiler.ASTWithSource ? input.value.source ?? '' : '';
		return input.name === 'size' && /^['"]L['"]$/.test(source.trim());
	});
}

/** Whitespace preceding the element on its own line, used to indent the generated block. */
function getIndent(template: string, position: number): string {
	const lineStart = template.lastIndexOf('\n', position - 1) + 1;
	const prefix = template.slice(lineStart, position);
	return /^\s*$/.test(prefix) ? prefix : '';
}
