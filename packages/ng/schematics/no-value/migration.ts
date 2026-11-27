import { Tree, UpdateRecorder } from '@angular-devkit/schematics';
import type { TmplAstElement } from '@angular/compiler';
import { applyToUpdateRecorder } from '@schematics/angular/utility/change';
import { SourceFile } from 'typescript';
import { AngularTemplate, currentSchematicContext, extractNgTemplatesIncludingHtml, HtmlAst, insertAngularImportIfNeeded, insertTSImportIfNeeded, TemplateNode } from '../lib';

// Only cells of Lucca Front tables are migrated: hand-made tables may use a dash for something else.
// Expressions with a fallback dash (`{{ value ?? '–' }}`) are reported, not rewritten: an `@if` / `@else` would mean guessing their intent.
const DASHES = ['-', '‒', '–', '—'];
const TABLE_ELEMENTS = ['lu-index-table', 'lu-data-table'];
const TABLE_CLASSES = ['indexTable', 'dataTable'];
const CELL_ATTRIBUTES = ['luIndexTableCell', 'luDataTableCell'];
const CELL_CLASS = /^(indexTable|dataTable)-.*-cell$/;
const QUOTED_DASH = new RegExp(`['"\`](${DASHES.join('|')})['"\`]`);
const NO_VALUE = '<lu-no-value />';
// Default visually hidden texts of a missing value, in every locale: any other text is kept, so the cell is reported instead.
const DEFAULT_MASK_TEXTS = [
	'Non renseigné',
	'Not provided',
	'Not entered',
	'Nicht angegeben',
	'No especificado',
	'No indicado',
	'Non inserito',
	'Non indicato',
	'Niet opgegeven',
	'Niet ingevuld',
	'Não conhecido',
	'Nie wprowadzono',
];

interface Replacement {
	start: number;
	end: number;
}

export function migrateComponent(sourceFile: SourceFile, path: string, tree: Tree): string {
	const replacementsByFile = new Map<string, Replacement[]>();

	extractNgTemplatesIncludingHtml(sourceFile, tree, path).forEach((template) => {
		const replacements = findReplacements(template, sourceFile);
		if (replacements.length) {
			replacementsByFile.set(template.filePath, [...(replacementsByFile.get(template.filePath) ?? []), ...replacements]);
		}
	});

	if (replacementsByFile.size) {
		const tsUpdate = tree.beginUpdate(path);
		replacementsByFile.forEach((replacements, filePath) => {
			const update = filePath === path ? tsUpdate : tree.beginUpdate(filePath);
			replace(update, replacements);
			if (update !== tsUpdate) {
				tree.commitUpdate(update);
			}
		});
		applyToUpdateRecorder(tsUpdate, [
			insertTSImportIfNeeded(sourceFile, path, 'NoValueComponent', '@lucca-front/ng/no-value'),
			insertAngularImportIfNeeded(sourceFile, path, 'NoValueComponent'),
		]);
		tree.commitUpdate(tsUpdate);
	}
	return tree.readText(path);
}

function replace(update: UpdateRecorder, replacements: Replacement[]): void {
	replacements.forEach(({ start, end }) => {
		update.remove(start, end - start);
		update.insertRight(start, NO_VALUE);
	});
}

function findReplacements(template: AngularTemplate, sourceFile: SourceFile): Replacement[] {
	const compiler = currentSchematicContext.angularCompiler;
	const replacements: Replacement[] = [];
	const offset = template.offsetStart;
	const lineOffset = template.filePath === sourceFile.fileName ? sourceFile.getLineAndCharacterOfPosition(offset).line : 0;

	const isElement = (node: unknown): node is TmplAstElement => node instanceof compiler.TmplAstElement;
	const isText = (node: unknown): node is InstanceType<typeof compiler.TmplAstText> => node instanceof compiler.TmplAstText;
	const isBlank = (node: TemplateNode) => isText(node) && !node.value.trim();
	const classesOf = (node: TmplAstElement) => (node.attributes.find((attr) => attr.name === 'class')?.value ?? '').split(/\s+/);
	const isDash = (value: string | undefined) => DASHES.includes((value ?? '').trim());
	const isTable = (node: TmplAstElement) => TABLE_ELEMENTS.includes(node.name) || classesOf(node).some((c) => TABLE_CLASSES.includes(c));
	const isLfCell = (node: TmplAstElement, inTable: boolean) =>
		['td', 'th'].includes(node.name) && (inTable || node.attributes.some((attr) => CELL_ATTRIBUTES.includes(attr.name)) || classesOf(node).some((c) => CELL_CLASS.test(c)));

	// A `span` or `div` without behavior (no input, event or reference) and with these attributes only
	const isInert = (node: TemplateNode, allowedAttributes: string[]): node is TmplAstElement =>
		isElement(node) &&
		['span', 'div'].includes(node.name) &&
		!node.inputs.length &&
		!node.outputs.length &&
		!node.references.length &&
		node.attributes.every((attr) => allowedAttributes.includes(attr.name));
	const textOf = (node: TmplAstElement) => {
		const children = node.children.filter((child) => !isBlank(child));
		return children.length === 1 && isText(children[0]) ? children[0].value.trim() : undefined;
	};
	// `<span aria-hidden="true" data-content-before="–"></span>`
	const isDashPseudoElement = (node: TemplateNode) =>
		isInert(node, ['aria-hidden', 'data-content-before']) && isDash(node.attributes.find((attr) => attr.name === 'data-content-before')?.value) && node.children.every(isBlank);
	// `<span>–</span>` or `<span aria-hidden="true">–</span>`
	const isDashElement = (node: TemplateNode) => isInert(node, ['aria-hidden']) && isDash(textOf(node));
	const isMask = (node: TemplateNode) => isElement(node) && classesOf(node).includes('pr-u-mask');
	// `<span class="pr-u-mask">Non renseigné</span>`
	const isDefaultMask = (node: TemplateNode) => isInert(node, ['class']) && isMask(node) && DEFAULT_MASK_TEXTS.includes(textOf(node) ?? '');
	const report = (node: TemplateNode, message: string) =>
		currentSchematicContext.warn(`[no-value] ${template.filePath}:${lineOffset + node.sourceSpan.start.line + 1} — ${message}`);

	const elementEnd = (node: TmplAstElement) => (node.endSourceSpan ?? node.sourceSpan).end.offset;

	const migrateContent = (nodes: TemplateNode[]) => {
		const content = nodes.filter((node) => !isBlank(node));
		const [first, second] = content;

		if (content.length === 1 && isText(first) && isDash(first.value)) {
			const raw = template.content.slice(first.sourceSpan.start.offset, first.sourceSpan.end.offset);
			const start = first.sourceSpan.start.offset + raw.indexOf(raw.trim());
			replacements.push({ start: offset + start, end: offset + start + raw.trim().length });
		} else if (content.length === 1 && (isDashPseudoElement(first) || isDashElement(first))) {
			replacements.push({ start: offset + first.sourceSpan.start.offset, end: offset + elementEnd(first as TmplAstElement) });
		} else if (content.length === 2 && isDashPseudoElement(first) && isDefaultMask(second)) {
			replacements.push({ start: offset + first.sourceSpan.start.offset, end: offset + elementEnd(second as TmplAstElement) });
		} else if (content.length === 2 && isDashPseudoElement(first) && isMask(second)) {
			report(first, `dash with a custom visually hidden text: replace it by hand with ${NO_VALUE.replace(' />', ' alt="…" />')} to keep the text.`);
		} else {
			content.forEach((node) => {
				if (node instanceof compiler.TmplAstBoundText && QUOTED_DASH.test(node.sourceSpan.toString())) {
					report(node, `${node.sourceSpan.toString().trim()}: replace the fallback dash with ${NO_VALUE} by hand.`);
				}
				blocksOf(node).forEach(migrateContent);
			});
		}
	};

	const blocksOf = (node: TemplateNode): TemplateNode[][] => {
		if (node instanceof compiler.TmplAstIfBlock) {
			return node.branches.map((branch) => branch.children);
		}
		if (node instanceof compiler.TmplAstSwitchBlock) {
			const groups = ('groups' in node ? node.groups : 'cases' in node ? node.cases : []) as { children: TemplateNode[] }[];
			return groups.map((group) => group.children);
		}
		if (node instanceof compiler.TmplAstForLoopBlock) {
			return [node.children, ...(node.empty ? [node.empty.children] : [])];
		}
		if (node instanceof compiler.TmplAstDeferredBlock || node instanceof compiler.TmplAstTemplate) {
			return [node.children];
		}
		return [];
	};

	const visit = (nodes: TemplateNode[], inTable: boolean) => {
		nodes.forEach((node) => {
			if (isElement(node) && isLfCell(node, inTable)) {
				migrateContent(node.children);
				return;
			}
			const childInTable = inTable || (isElement(node) && isTable(node));
			(isElement(node) ? [node.children] : blocksOf(node)).forEach((children) => visit(children, childInTable));
		});
	};

	visit(new HtmlAst(template.content).nodes, false);
	return replacements;
}
