import { Tree } from '@angular-devkit/schematics';
import type { TmplAstElement } from '@angular/compiler';
import { applyToUpdateRecorder } from '@schematics/angular/utility/change';
import { SourceFile } from 'typescript';
import { HtmlAst, extractNgTemplatesIncludingHtml, insertAngularImportIfNeeded, insertTSImportIfNeeded, isInterestingNode } from '../lib';

// --- Grid container ---

interface GridInputs {
	mode?: string;
	columns?: string;
	extraClasses?: string;
}

interface HtmlGrid {
	node: TmplAstElement;
	inputs: GridInputs;
	nodeOffset: number;
	filePath: string;
	componentTS: SourceFile;
}

// --- Grid column ---

interface GridColumnInputs {
	colspan?: string;
	rowspan?: string;
	column?: string;
	row?: string;
	justify?: string;
	align?: string;
	responsive?: Record<string, string>;
}

interface HtmlGridColumn {
	node: TmplAstElement;
	inputs: GridColumnInputs;
	remainingStyle?: string;
	extraClasses?: string;
	nodeOffset: number;
	filePath: string;
	componentTS: SourceFile;
}

// --- CSS custom properties helpers ---

function parseCssCustomProperties(style: string): Record<string, string> {
	const result: Record<string, string> = {};
	style.split(';').map((p) => p.trim()).filter(Boolean).forEach((part) => {
		const colonIdx = part.indexOf(':');
		if (colonIdx === -1) {
			return;
		}
		const prop = part.substring(0, colonIdx).trim();
		const value = part.substring(colonIdx + 1).trim();
		result[prop] = value;
	});
	return result;
}

// CSS custom properties that map directly to GridColumnComponent inputs
const GRID_COLUMN_DIRECT_PROPS: Record<string, string> = {
	'--grid-colspan': 'colspan',
	'--grid-rowspan': 'rowspan',
	'--grid-column': 'column',
	'--grid-row': 'row',
	'--grid-justify': 'justify',
	'--grid-align': 'align',
};

// Prefix for responsive CSS custom properties
const RESPONSIVE_PREFIX = '--grid-';

function extractGridColumnInputs(style: string): { inputs: GridColumnInputs; remainingStyle: string } {
	const cssProps = parseCssCustomProperties(style);
	const inputs: GridColumnInputs = {};
	const responsive: Record<string, string> = {};
	const remaining: string[] = [];

	for (const [prop, value] of Object.entries(cssProps)) {
		if (GRID_COLUMN_DIRECT_PROPS[prop]) {
			(inputs as Record<string, string>)[GRID_COLUMN_DIRECT_PROPS[prop]] = value;
		} else if (prop.startsWith(RESPONSIVE_PREFIX) && prop.includes('AtMedia')) {
			// e.g. --grid-colspanAtMediaMinXS → colspanAtMediaMinXS
			const key = prop.substring(RESPONSIVE_PREFIX.length);
			responsive[key] = value;
		} else if (prop.startsWith('--grid-')) {
			// Unknown grid property — drop it (it was grid-specific)
		} else {
			remaining.push(`${prop}: ${value}`);
		}
	}

	if (Object.keys(responsive).length > 0) {
		inputs.responsive = responsive;
	}

	return { inputs, remainingStyle: remaining.join('; ') };
}

const NEUTRAL_HTML_ELEMENTS = ['div', 'span', 'section'] as const;
type NeutralHtmlElement = (typeof NEUTRAL_HTML_ELEMENTS)[number];

function isNeutralElement(name: string): name is NeutralHtmlElement {
	return (NEUTRAL_HTML_ELEMENTS as readonly string[]).includes(name);
}

// --- Main migration ---

export function migrateComponent(sourceFile: SourceFile, path: string, tree: Tree): string {
	const htmlGrids = findHTMLGrids(sourceFile, path, tree);
	const htmlGridColumns = findHTMLGridColumns(sourceFile, path, tree);

	if (htmlGrids.length === 0 && htmlGridColumns.length === 0) {
		return tree.readText(path);
	}

	const tsUpdate = tree.beginUpdate(path);
	const firstItem = htmlGrids[0] || htmlGridColumns[0];
	const isInlineTemplate = firstItem.filePath === path;
	const templateUpdate = isInlineTemplate ? tsUpdate : tree.beginUpdate(firstItem.filePath);

	htmlGrids.forEach((grid) => migrateGridNode(grid, templateUpdate));
	htmlGridColumns.forEach((col) => migrateGridColumnNode(col, templateUpdate));

	const changesToApply = [];
	if (htmlGrids.length > 0) {
		changesToApply.push(
			insertTSImportIfNeeded(sourceFile, path, 'GridComponent', '@lucca-front/ng/grid'),
			insertAngularImportIfNeeded(sourceFile, path, 'GridComponent'),
		);
	}
	if (htmlGridColumns.length > 0) {
		changesToApply.push(
			insertTSImportIfNeeded(sourceFile, path, 'GridColumnComponent', '@lucca-front/ng/grid'),
			insertAngularImportIfNeeded(sourceFile, path, 'GridColumnComponent'),
		);
	}
	applyToUpdateRecorder(tsUpdate, changesToApply);

	tree.commitUpdate(tsUpdate);
	if (!isInlineTemplate) {
		tree.commitUpdate(templateUpdate);
	}

	return tree.readText(path);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function migrateGridNode(grid: HtmlGrid, templateUpdate: any): void {
	const { node, nodeOffset, inputs } = grid;
	const divLength = node.name.length;
	const classesNode = node.attributes.find((attr) => attr.name === 'class');
	const styleNode = node.attributes.find((attr) => attr.name === 'style');

	// Build inputs string (everything that comes after the element name)
	let thingsToAdd = 'lu-grid';
	if (inputs.mode) {
		thingsToAdd += ` mode="${inputs.mode}"`;
	}
	if (inputs.columns) {
		thingsToAdd += ` columns="${inputs.columns}"`;
	}

	// Remove element name 'div'
	templateUpdate.remove(nodeOffset + node.startSourceSpan.start.offset + 1, divLength);

	if (node.children.length > 0 && node.endSourceSpan) {
		// Has children — replace end tag
		templateUpdate.remove(nodeOffset + node.endSourceSpan.start.offset + 1, divLength + 1);
		templateUpdate.insertRight(nodeOffset + node.startSourceSpan.start.offset + 1, thingsToAdd);
		templateUpdate.insertLeft(nodeOffset + node.endSourceSpan.start.offset + 1, '/lu-grid');
	} else if (!node.isSelfClosing) {
		// Empty, not self-closing
		const endSpanOffset = node.endSourceSpan?.start.offset || -1;
		templateUpdate.remove(nodeOffset + node.startSourceSpan.end.offset, endSpanOffset - node.startSourceSpan.end.offset);
		if (node.endSourceSpan?.start?.offset) {
			templateUpdate.remove(nodeOffset + node.endSourceSpan.start.offset, node.endSourceSpan.toString().length);
		}
		templateUpdate.insertRight(nodeOffset + node.startSourceSpan.start.offset + 1, thingsToAdd);
		templateUpdate.insertRight(nodeOffset + node.startSourceSpan.end.offset - 1, ` /`);
	}

	// Modify class attribute — remove 'grid' and mode-related classes
	if (classesNode && classesNode.keySpan) {
		const classes = classesNode.value;
		const cleanedClasses = classes.split(' ').filter((c) => c !== 'grid' && c !== 'mod-auto' && c !== 'mod-form').join(' ');
		templateUpdate.remove(nodeOffset + classesNode.keySpan.start.offset - 1, classesNode.sourceSpan.toString().length + 1);
		if (cleanedClasses) {
			templateUpdate.insertRight(nodeOffset + classesNode.keySpan.start.offset, ` class="${cleanedClasses}"`);
		}
	}

	// Modify style attribute — remove --grid-columns, keep the rest
	if (styleNode && styleNode.keySpan) {
		const cssProps = parseCssCustomProperties(styleNode.value);
		const remaining = Object.entries(cssProps)
			.filter(([key]) => key !== '--grid-columns')
			.map(([key, val]) => `${key}: ${val}`)
			.join('; ');
		templateUpdate.remove(nodeOffset + styleNode.keySpan.start.offset - 1, styleNode.sourceSpan.toString().length + 1);
		if (remaining) {
			templateUpdate.insertRight(nodeOffset + styleNode.keySpan.start.offset, ` style="${remaining}"`);
		}
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function migrateGridColumnNode(col: HtmlGridColumn, templateUpdate: any): void {
	const { node, nodeOffset, inputs, remainingStyle, extraClasses } = col;
	const divLength = node.name.length;
	const classesNode = node.attributes.find((attr) => attr.name === 'class');
	const styleNode = node.attributes.find((attr) => attr.name === 'style');

	// Build inputs string
	let thingsToAdd = 'lu-grid-column';
	if (inputs.colspan) {
		thingsToAdd += ` colspan="${inputs.colspan}"`;
	}
	if (inputs.rowspan) {
		thingsToAdd += ` rowspan="${inputs.rowspan}"`;
	}
	if (inputs.column) {
		thingsToAdd += ` column="${inputs.column}"`;
	}
	if (inputs.row) {
		thingsToAdd += ` row="${inputs.row}"`;
	}
	if (inputs.justify) {
		thingsToAdd += ` justify="${inputs.justify}"`;
	}
	if (inputs.align) {
		thingsToAdd += ` align="${inputs.align}"`;
	}
	if (inputs.responsive) {
		const responsiveEntries = Object.entries(inputs.responsive)
			.map(([key, val]) => `${key}: ${val}`)
			.join(', ');
		thingsToAdd += ` [responsive]="{ ${responsiveEntries} }"`;
	}

	// Remove element name 'div'
	templateUpdate.remove(nodeOffset + node.startSourceSpan.start.offset + 1, divLength);

	if (node.children.length > 0 && node.endSourceSpan) {
		templateUpdate.remove(nodeOffset + node.endSourceSpan.start.offset + 1, divLength + 1);
		templateUpdate.insertRight(nodeOffset + node.startSourceSpan.start.offset + 1, thingsToAdd);
		templateUpdate.insertLeft(nodeOffset + node.endSourceSpan.start.offset + 1, '/lu-grid-column');
	} else if (!node.isSelfClosing) {
		const endSpanOffset = node.endSourceSpan?.start.offset || -1;
		templateUpdate.remove(nodeOffset + node.startSourceSpan.end.offset, endSpanOffset - node.startSourceSpan.end.offset);
		if (node.endSourceSpan?.start?.offset) {
			templateUpdate.remove(nodeOffset + node.endSourceSpan.start.offset, node.endSourceSpan.toString().length);
		}
		templateUpdate.insertRight(nodeOffset + node.startSourceSpan.start.offset + 1, thingsToAdd);
		templateUpdate.insertRight(nodeOffset + node.startSourceSpan.end.offset - 1, ` /`);
	}

	// Class attribute: remove 'grid-column', keep extra classes
	if (classesNode && classesNode.keySpan) {
		templateUpdate.remove(nodeOffset + classesNode.keySpan.start.offset - 1, classesNode.sourceSpan.toString().length + 1);
		if (extraClasses) {
			templateUpdate.insertRight(nodeOffset + classesNode.keySpan.start.offset, ` class="${extraClasses}"`);
		}
	}

	// Style attribute: remove grid-specific properties, keep the rest
	if (styleNode && styleNode.keySpan) {
		templateUpdate.remove(nodeOffset + styleNode.keySpan.start.offset - 1, styleNode.sourceSpan.toString().length + 1);
		if (remainingStyle) {
			templateUpdate.insertRight(nodeOffset + styleNode.keySpan.start.offset, ` style="${remainingStyle}"`);
		}
	}
}

// --- Finders ---

function findHTMLGrids(sourceFile: SourceFile, basePath: string, tree: Tree): HtmlGrid[] {
	const results: HtmlGrid[] = [];
	const ngTemplates = extractNgTemplatesIncludingHtml(sourceFile, tree, basePath);

	ngTemplates.forEach((template) => {
		const htmlAst = new HtmlAst(template.content);
		htmlAst.visitNodes((node) => {
			if (!isInterestingNode(node) || !isNeutralElement(node.name)) {
				return;
			}
			const classes = node.attributes.find((attr) => attr.name === 'class')?.value;
			if (!classes?.match(/(^|\s)grid(\s|$)/)) {
				return;
			}

			const styleAttr = node.attributes.find((attr) => attr.name === 'style')?.value || '';
			const cssProps = parseCssCustomProperties(styleAttr);

			const classParts = classes.split(' ');
			const extraClasses = classParts.filter((c) => c !== 'grid' && c !== 'mod-auto' && c !== 'mod-form').join(' ');

			const inputs: GridInputs = {
				mode: classParts.includes('mod-auto') ? 'auto' : classParts.includes('mod-form') ? 'form' : undefined,
				columns: cssProps['--grid-columns'],
				extraClasses: extraClasses || undefined,
			};

			results.push({
				node,
				inputs,
				nodeOffset: template.offsetStart,
				filePath: template.filePath,
				componentTS: sourceFile,
			});
		});
	});

	return results;
}

function findHTMLGridColumns(sourceFile: SourceFile, basePath: string, tree: Tree): HtmlGridColumn[] {
	const results: HtmlGridColumn[] = [];
	const ngTemplates = extractNgTemplatesIncludingHtml(sourceFile, tree, basePath);

	ngTemplates.forEach((template) => {
		const htmlAst = new HtmlAst(template.content);
		htmlAst.visitNodes((node, parent) => {
			if (!isInterestingNode(node) || !isNeutralElement(node.name)) {
				return;
			}
			const classes = node.attributes.find((attr) => attr.name === 'class')?.value;
			if (!classes?.match(/(^|\s)grid-column(\s|$)/)) {
				return;
			}

			// Only migrate grid-column if its parent grid container is also being migrated
			if (!isInterestingNode(parent) || !isNeutralElement(parent.name)) {
				return;
			}
			const parentClasses = parent.attributes.find((attr) => attr.name === 'class')?.value;
			if (!parentClasses?.match(/(^|\s)grid(\s|$)/)) {
				return;
			}

			const styleAttr = node.attributes.find((attr) => attr.name === 'style')?.value || '';
			const { inputs, remainingStyle } = extractGridColumnInputs(styleAttr);

			const classParts = classes.split(' ');
			const extraClasses = classParts.filter((c) => c !== 'grid-column').join(' ');

			results.push({
				node,
				inputs,
				remainingStyle: remainingStyle || undefined,
				extraClasses: extraClasses || undefined,
				nodeOffset: template.offsetStart,
				filePath: template.filePath,
				componentTS: sourceFile,
			});
		});
	});

	return results;
}
