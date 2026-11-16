import { Tree } from '@angular-devkit/schematics';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { TmplAstBoundAttribute, TmplAstElement, TmplAstTextAttribute } from '@angular/compiler';
import { createSourceFile, ScriptTarget } from 'typescript';
import { applyUpdates, extractNgTemplatesIncludingHtml, FileUpdate, HtmlAst, isInterestingNode, TemplateNode, updateContent } from '../lib';

export type TextSizeConfidence = 'high' | 'low' | 'not converted';

export interface TextSizeReportEntry {
	file: string;
	line: number;
	from: string;
	to: string | null;
	confidence: TextSizeConfidence;
	reason: string;
}

/** What a run of the migration collects across files. */
export interface TextSizeMigrationState {
	entries: TextSizeReportEntry[];
	/** External templates already migrated: a template shared by two components is handled once. */
	templates: Set<string>;
}

/** `.(pr-)u-textXS~XXXL`: the deprecated size utilities, prefixed or not. */
export const textSizeClass = /^(pr-)?u-text(XS|S|M|L|XL|XXL|XXXL)$/;
const textSizeToken = /(?<![\w-])(?:pr-)?u-text(?:XS|S|M|L|XL|XXL|XXXL)(?![\w-])/g;

export function hasTextSizeToken(content: string): boolean {
	return new RegExp(textSizeToken.source).test(content);
}

/** Same font size and line height: body for XS ~ M, headings for L ~ XXL. XXXL has no equivalent. */
const replacements: Record<string, string | null> = {
	XS: 'pr-u-bodyXS',
	S: 'pr-u-bodyS',
	M: 'pr-u-bodyM',
	L: 'pr-u-h3',
	XL: 'pr-u-h2',
	XXL: 'pr-u-h1',
	XXXL: null,
};

const boldElements = ['strong', 'b', 'th', 'dt', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const monospaceElements = ['code', 'kbd', 'pre', 'samp'];
const italicElements = ['em', 'i', 'cite'];
const boldClass = /^(pr-)?u-(h[1-4]|fontWeight(600|700|900|Bold|SemiBold))$/;
const italicClass = /^(pr-)?u-fontStyleItalic$/;
const familyClass = /^(pr-)?u-fontFamily/;
/** Font utilities are `!important`: on the element itself, they keep winning over the `font` shorthand of the replacement. */
const weightUtility = /^(pr-)?u-fontWeight(400|600|700|900|Normal|Bold|Regular|SemiBold)$/;

interface TemplateContext {
	file: string;
	fileContent: string;
	offset: number;
	entries: TextSizeReportEntry[];
}

export function migrateComponent(path: string, content: string, tree: Tree, state: TextSizeMigrationState): string {
	const sourceFile = createSourceFile(path, content, ScriptTarget.ESNext);
	const templates = extractNgTemplatesIncludingHtml(sourceFile, tree, path);
	const inlineTemplates = templates.filter((template) => template.filePath === path);

	// External templates are rewritten in place, they are not part of the component file.
	templates
		.filter((template) => template.filePath !== path && !state.templates.has(template.filePath))
		.forEach((template) => {
			state.templates.add(template.filePath);
			const migrated = migrateTemplate(template.content, { file: template.filePath, fileContent: template.content, offset: 0, entries: state.entries });
			if (migrated !== template.content) {
				tree.overwrite(template.filePath, migrated);
			}
		});

	if (!hasTextSizeToken(content)) {
		return content;
	}

	// Outside templates, the element carrying the class is unknown: listed, never converted.
	reportOccurrences(path, content, state.entries, 'TypeScript string', inlineTemplates.map((template) => [template.offsetStart, template.offsetStart + template.content.length]));

	return applyUpdates(
		content,
		inlineTemplates.map((template) => ({
			position: template.offsetStart,
			oldContent: template.content,
			newContent: migrateTemplate(template.content, { file: path, fileContent: content, offset: template.offsetStart, entries: state.entries }),
		})),
	);
}

/** Lists the size utilities found in a file, outside the given ranges and positions. */
export function reportOccurrences(path: string, content: string, entries: TextSizeReportEntry[], reason: string, excludedRanges: [number, number][] = [], excludedPositions = new Set<number>(), offset = 0, fileContent = content): void {
	for (const match of content.matchAll(textSizeToken)) {
		const position = match.index ?? 0;
		if (excludedPositions.has(position) || excludedRanges.some(([start, end]) => position >= start && position < end)) {
			continue;
		}
		entries.push({ file: cleanPath(path), line: lineOf(fileContent, offset + position), from: match[0], to: null, confidence: 'not converted', reason });
	}
}

function migrateTemplate(template: string, context: TemplateContext): string {
	if (!hasTextSizeToken(template)) {
		return template;
	}

	return updateContent(template, (updates) => {
		const parents = new Map<TemplateNode, TemplateNode | undefined>();
		const handled = new Set<number>();

		new HtmlAst(template).visitNodes((node, parent) => {
			// Parents are visited first: the whole ancestor chain is known when an element is reached.
			parents.set(node, parent);

			if (isInterestingNode(node)) {
				updates.push(...migrateElement(template, node, parents, context, handled));
			}
		});

		// Anything else (an input of a custom component, a computed class, a `@defer` placeholder…) is only listed.
		reportOccurrences(context.file, template, context.entries, 'unsupported place in the template', [], handled, context.offset, context.fileContent);
	});
}

function ancestorsOf(element: TmplAstElement, parents: Map<TemplateNode, TemplateNode | undefined>): TmplAstElement[] {
	const ancestors: TmplAstElement[] = [];
	for (let ancestor = parents.get(element); ancestor; ancestor = parents.get(ancestor)) {
		if (isInterestingNode(ancestor)) {
			ancestors.push(ancestor);
		}
	}
	return ancestors;
}

function getClasses(element: TmplAstElement): string[] {
	return element.attributes.find((attribute) => attribute.name === 'class')?.value.split(/\s+/).filter(Boolean) ?? [];
}

function migrateElement(template: string, element: TmplAstElement, parents: Map<TemplateNode, TemplateNode | undefined>, context: TemplateContext, handled: Set<number>): FileUpdate[] {
	const classAttribute = element.attributes.find((attribute) => attribute.name === 'class');
	// Static classes, `[class.x]`, `[ngClass]`, `[class]` and interpolated `class` all carry the utility as a token.
	const sources: (TmplAstTextAttribute | TmplAstBoundAttribute)[] = [
		...(classAttribute ? [classAttribute] : []),
		...element.inputs.filter((input) => input.name === 'class' || input.name === 'ngClass' || textSizeClass.test(input.name)),
	];
	const updates: FileUpdate[] = [];

	for (const source of sources) {
		const start = source.sourceSpan.start.offset;
		const text = template.slice(start, source.sourceSpan.end.offset);

		for (const match of text.matchAll(textSizeToken)) {
			const from = match[0];
			const to = replacements[from.replace(/^(pr-)?u-text/, '')];
			const position = start + (match.index ?? 0);
			const verdict = judge(element, ancestorsOf(element, parents), getClasses(element), to);

			handled.add(position);
			context.entries.push({
				file: cleanPath(context.file),
				line: lineOf(context.fileContent, context.offset + position),
				from,
				to: verdict.confidence === 'not converted' ? null : to,
				confidence: verdict.confidence,
				reason: verdict.reason,
			});

			if (verdict.confidence !== 'not converted') {
				updates.push({ position, oldContent: from, newContent: to! });
			}
		}
	}

	return updates;
}

function judge(element: TmplAstElement, ancestors: TmplAstElement[], classes: string[], to: string | null): { confidence: TextSizeConfidence; reason: string } {
	if (!to) {
		return { confidence: 'not converted', reason: 'no equivalent' };
	}

	if (classes.includes('skeleton-item')) {
		return { confidence: 'high', reason: 'skeleton' };
	}

	// The `font` shorthand of every replacement resets the family and the style, not only the weight.
	const fontLoss = getFontLoss(element, ancestors);
	if (fontLoss) {
		return { confidence: 'not converted', reason: fontLoss };
	}

	const boldAncestor = ancestors.find((ancestor) => boldElements.includes(ancestor.name) || getClasses(ancestor).some((cls) => boldClass.test(cls)));
	const hasWeightUtility = classes.some((cls) => weightUtility.test(cls));

	if (to.startsWith('pr-u-h')) {
		// The heading utilities also set the heading colour.
		if (element.name === 'a' || classes.includes('link')) {
			return { confidence: 'not converted', reason: 'link colour (headings set their own colour)' };
		}
		return hasWeightUtility || boldElements.includes(element.name) || boldAncestor ? { confidence: 'high', reason: '' } : { confidence: 'low', reason: 'becomes bold' };
	}

	if (hasWeightUtility) {
		return { confidence: 'high', reason: '' };
	}

	if (boldElements.includes(element.name)) {
		return { confidence: 'not converted', reason: `bold element (${element.name})` };
	}

	if (boldAncestor) {
		const boldUtility = getClasses(boldAncestor).find((cls) => boldClass.test(cls));
		return { confidence: 'not converted', reason: `inside a bold context (${describe(boldAncestor, boldUtility)})` };
	}

	return { confidence: 'high', reason: '' };
}

function getFontLoss(element: TmplAstElement, ancestors: TmplAstElement[]): string | null {
	const monospace = [element, ...ancestors].find((node) => monospaceElements.includes(node.name));
	if (monospace) {
		return `monospace (${monospace.name})`;
	}

	const italic = [element, ...ancestors].find((node) => italicElements.includes(node.name));
	if (italic) {
		return `italic (${italic.name})`;
	}

	// On the element itself, these utilities are `!important` and survive; inherited, they are reset.
	for (const ancestor of ancestors) {
		const style = getClasses(ancestor).find((cls) => italicClass.test(cls) || familyClass.test(cls));
		if (style) {
			return `inside a font context (${describe(ancestor, style)})`;
		}
	}

	return null;
}

function describe(element: TmplAstElement, cls?: string): string {
	return `${element.name}${cls ? `.${cls}` : ''}`;
}

function lineOf(content: string, position: number): number {
	let line = 1;
	for (let index = content.indexOf('\n'); index !== -1 && index < position; index = content.indexOf('\n', index + 1)) {
		line++;
	}
	return line;
}

function cleanPath(path: string): string {
	return path.replace(/^\//, '');
}
