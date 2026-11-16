import { Tree } from '@angular-devkit/schematics';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { TmplAstBoundAttribute, TmplAstElement, TmplAstTextAttribute } from '@angular/compiler';
import { applyToUpdateRecorder } from '@schematics/angular/utility/change';
import { createSourceFile, ScriptTarget } from 'typescript';
import {
	applyUpdates,
	currentSchematicContext,
	extractComponentImports,
	extractNgTemplates,
	extractNgTemplatesIncludingHtml,
	FileUpdate,
	HtmlAst,
	insertAngularImportIfNeeded,
	insertTSImportIfNeeded,
	isInterestingNode,
	removeAngularImport,
	removeAttributeUpdate,
	removeTSImport,
	TemplateNode,
	updateContent,
} from '../lib';

export type LabelConfidence = 'high' | 'low' | 'not converted';

export interface LabelReportEntry {
	file: string;
	line: number;
	target: string;
	confidence: LabelConfidence;
	reason: string;
}

/** What a run of the migration collects across files. */
export interface LabelMigrationState {
	entries: LabelReportEntry[];
	/** HTML fallbacks emitted, whose CSS no Angular component brings. */
	fallbackComponents: Set<'statusBadge' | 'tag'>;
}

const symbolEntrypoints: Record<string, string> = {
	NumericBadgeComponent: '@lucca-front/ng/numeric-badge',
	StatusBadgeComponent: '@lucca-front/ng/status-badge',
	TagComponent: '@lucca-front/ng/tag',
	TranslatePipe: '@ngx-translate/core',
};

const semanticPalettes = ['success', 'warning', 'error'];
const decorativePalettes = ['kiwi', 'lime', 'cucumber', 'mint', 'glacier', 'lagoon', 'blueberry', 'lavender', 'grape', 'watermelon', 'pumpkin', 'pineapple'];

/** Palettes accepted by each target, following the Prisme guidelines and the `palette` input types. */
const allowedPalettes = {
	numericBadge: ['success', 'warning', 'error', 'product', 'neutral', 'brand'],
	statusBadge: ['neutral', 'product', 'warning', 'error', 'success'],
	tag: ['product', 'neutral', ...decorativePalettes],
};

/** Removed or aliased palettes: `grey` and `primary` were removed in 22, `critical` is the CSS twin of `error`. */
const paletteAliases: Record<string, string> = { grey: 'neutral', primary: 'product', critical: 'error' };

const statusWords = ['status', 'state', 'statut', 'approval'];

/** Looks for whole words only: `approvalState` and `STATUS_PENDING` match, `statementTooltip` and `estate` do not. */
function hasStatusSignal(source: string): boolean {
	return source
		.split(/[^A-Za-z]+/)
		.flatMap((identifier) => identifier.split(/(?<=[a-z])(?=[A-Z])/))
		.some((word) => statusWords.includes(word.toLowerCase()));
}

type Target = 'numericBadge' | 'statusBadge' | 'tag';

const targetTags: Record<Target, string> = {
	numericBadge: 'lu-numeric-badge',
	statusBadge: 'lu-status-badge',
	tag: 'lu-tag',
};

const targetSymbols: Record<Target, string> = {
	numericBadge: 'NumericBadgeComponent',
	statusBadge: 'StatusBadgeComponent',
	tag: 'TagComponent',
};

interface TemplateContext {
	/** Path of the file holding the template, as written in the report. */
	file: string;
	/** Content of that file, used to turn offsets into line numbers. */
	fileContent: string;
	/** Offset of the template inside that file. */
	offset: number;
	symbols: Set<string>;
	state: LabelMigrationState;
}

export function migrateComponent(path: string, content: string, tree: Tree, state: LabelMigrationState): string {
	const sourceFile = createSourceFile(path, content, ScriptTarget.ESNext);
	const symbols = new Set<string>();
	const migratedTemplates: string[] = [];
	const firstEntry = state.entries.length;

	// External templates are rewritten in place, they are not part of the component file.
	extractNgTemplatesIncludingHtml(sourceFile, tree, path)
		.filter((template) => template.filePath !== path)
		.forEach((template) => {
			const migrated = migrateTemplate(template.content, { file: template.filePath, fileContent: template.content, offset: 0, symbols, state });
			migratedTemplates.push(migrated);

			if (migrated !== template.content) {
				tree.overwrite(template.filePath, migrated);
			}
		});

	const result = applyUpdates(
		content,
		extractNgTemplates(sourceFile).map((template) => {
			const migrated = migrateTemplate(template.content, { file: path, fileContent: content, offset: template.offsetStart, symbols, state });
			migratedTemplates.push(migrated);
			return { position: template.offsetStart, oldContent: template.content, newContent: migrated };
		}),
	);

	if (symbols.size === 0) {
		return result;
	}

	// A component declared in an NgModule cannot have `imports`: its module has to import the new components.
	if (/standalone\s*:\s*false/.test(content)) {
		state.entries.slice(firstEntry).forEach((entry) => {
			if (entry.target.startsWith('lu-')) {
				entry.confidence = 'low';
				entry.reason += `; standalone: false, import ${[...symbols].join(', ')} in the NgModule`;
			}
		});
		return result;
	}

	const componentImports = extractComponentImports(sourceFile);
	// A converted `translate` directive may have been the last one of the component.
	const removeTranslateDirective = symbols.has('TranslatePipe') && componentImports.includes('TranslateDirective') && !migratedTemplates.some(usesTranslateDirective);

	if (componentImports.includes('TranslateModule')) {
		symbols.delete('TranslatePipe');
	}

	// Imports are inserted one symbol at a time: every insertion shifts the offsets the next one relies on.
	tree.overwrite(path, result);

	// Removed before TranslatePipe is added: the shared helper leaves a dangling comma after the last specifier of an import.
	if (removeTranslateDirective) {
		[removeAngularImport, removeTSImport].forEach((remove) => {
			const updatedSourceFile = createSourceFile(path, tree.readText(path), ScriptTarget.ESNext);
			const recorder = tree.beginUpdate(path);
			applyToUpdateRecorder(recorder, [remove(updatedSourceFile, path, 'TranslateDirective')]);
			tree.commitUpdate(recorder);
		});
	}

	symbols.forEach((symbol) => {
		const updatedSourceFile = createSourceFile(path, tree.readText(path), ScriptTarget.ESNext);
		const recorder = tree.beginUpdate(path);
		applyToUpdateRecorder(recorder, [insertTSImportIfNeeded(updatedSourceFile, path, symbol, symbolEntrypoints[symbol]), insertAngularImportIfNeeded(updatedSourceFile, path, symbol)]);
		tree.commitUpdate(recorder);
	});

	return tree.readText(path);
}

function usesTranslateDirective(template: string): boolean {
	let used = false;
	new HtmlAst(template).visitNodes((node) => {
		if (isInterestingNode(node) && [...node.attributes, ...node.inputs].some((attribute) => attribute.name === 'translate')) {
			used = true;
		}
	});
	return used;
}

function migrateTemplate(template: string, context: TemplateContext): string {
	return updateContent(template, (updates) => {
		const parents = new Map<TemplateNode, TemplateNode | undefined>();
		const htmlAst = new HtmlAst(template);

		htmlAst.visitNodes((node, parent) => {
			// Parents are visited first: the whole ancestor chain is known when a label is reached.
			parents.set(node, parent);

			if (!isInterestingNode(node)) {
				return;
			}

			const update = migrateElement(template, node, context, getSurroundings(node, parents, htmlAst.nodes));

			if (update) {
				updates.push(update);
			}
		});
	});
}

/** Where the label sits: some Prisme contexts tell which component it should become. */
interface Surroundings {
	/** Inside a table: a status column, rarely a count. */
	table: boolean;
	/** Inside a button or a navigation item, where the NumericBadge guideline puts counts. */
	counterHost: 'button' | 'navigation' | null;
	/** Next to or inside a heading, where the StatusBadge guideline puts the status of a resource. */
	heading: 'large' | 'small' | null;
}

const tableElements = ['table', 'tr', 'td', 'th', 'lu-data-table', 'lu-index-table'];
const tableClass = /^(table|indexTable|dataTable)(-|$)/;
const navigationClass = /^(tabs|horizontalNavigation|verticalNavigation|mobileNavigation|segmentedControl|menu)(-|$)/;
const navigationElement = /^lu-(horizontal-navigation|vertical-navigation|segmented-control)/;
const navigationAttributes = ['luHorizontalNavigationLink', 'luVerticalNavigationLink'];

function getSurroundings(element: TmplAstElement, parents: Map<TemplateNode, TemplateNode | undefined>, rootNodes: TemplateNode[]): Surroundings {
	const surroundings: Surroundings = { table: false, counterHost: null, heading: null };

	for (let ancestor = parents.get(element); ancestor; ancestor = parents.get(ancestor)) {
		if (!isInterestingNode(ancestor)) {
			continue;
		}
		const classes = getClasses(ancestor);
		const attributes = [...ancestor.attributes, ...ancestor.inputs].map((attribute) => attribute.name);

		surroundings.table ||= tableElements.includes(ancestor.name) || classes.some((cls) => tableClass.test(cls));
		surroundings.heading ??= getHeading(ancestor);

		if (!surroundings.counterHost) {
			if (ancestor.name === 'button' || attributes.includes('luButton') || classes.includes('button')) {
				surroundings.counterHost = 'button';
			} else if (navigationElement.test(ancestor.name) || attributes.some((name) => navigationAttributes.includes(name)) || classes.some((cls) => navigationClass.test(cls))) {
				surroundings.counterHost = 'navigation';
			}
		}
	}

	// A label right after a heading, like `<h1>Title</h1><span class="label">`.
	const siblings = getSiblings(element, parents.get(element), rootNodes).filter(isInterestingNode);
	const previous = siblings[siblings.indexOf(element) - 1];
	surroundings.heading ??= previous ? getHeading(previous) : null;

	return surroundings;
}

function getClasses(element: TmplAstElement): string[] {
	return element.attributes.find((attribute) => attribute.name === 'class')?.value.split(/\s+/).filter(Boolean) ?? [];
}

/** The StatusBadge guideline asks for the large size next to a level 1 or 2 heading. */
function getHeading(element: TmplAstElement): 'large' | 'small' | null {
	const classes = getClasses(element);

	if (['h1', 'h2'].includes(element.name) || classes.some((cls) => ['pageHeader-title', 'pr-u-h1', 'pr-u-h2'].includes(cls))) {
		return 'large';
	}

	return ['h3', 'h4'].includes(element.name) || classes.some((cls) => ['pr-u-h3', 'pr-u-h4'].includes(cls)) ? 'small' : null;
}

function getSiblings(element: TmplAstElement, parent: TemplateNode | undefined, rootNodes: TemplateNode[]): TemplateNode[] {
	if (!parent) {
		return rootNodes;
	}

	const compiler = currentSchematicContext.angularCompiler;

	if (parent instanceof compiler.TmplAstIfBlock) {
		return parent.branches.find((branch) => branch.children.includes(element))?.children ?? [];
	}

	if (parent instanceof compiler.TmplAstForLoopBlock && parent.empty?.children.includes(element)) {
		return parent.empty.children;
	}

	return 'children' in parent && Array.isArray(parent.children) ? parent.children : [];
}

function migrateElement(template: string, element: TmplAstElement, context: TemplateContext, surroundings: Surroundings): FileUpdate | null {
	const classAttribute = element.attributes.find((attribute) => attribute.name === 'class');
	const classes = classAttribute?.value.split(/\s+/).filter(Boolean) ?? [];
	const report = (target: string, confidence: LabelConfidence, reason: string) => {
		const position = context.offset + element.startSourceSpan.start.offset;
		const line = context.fileContent.slice(0, position).split('\n').length;
		context.state.entries.push({ file: context.file.replace(/^\//, ''), line, target, confidence, reason });
	};

	if (!classAttribute || !classes.includes('label')) {
		if (element.inputs.some((input) => isBoundLabelClass(template, input))) {
			report('—', 'not converted', 'dynamic class: label added by a binding');
		}
		return null;
	}

	const interaction = getInteraction(element);

	if (interaction) {
		report('—', 'not converted', `interactive: ${interaction} on the label`);
		return null;
	}

	const palette = getPalette(template, element, classes);

	if ('error' in palette) {
		report('—', 'not converted', palette.error);
		return null;
	}

	const content = getContent(template, element);
	const isNumber = classes.includes('mod-number');
	const values = [palette.base ?? 'product', ...(palette.condition ? [palette.condition.palette] : [])];
	const semantic = values.find((value) => semanticPalettes.includes(value));

	let target: Target;
	// The StatusBadge guideline puts the status of a resource in a table column and next to its name.
	const statusSignal = hasStatusSignal(withoutAttribute(template, element, classAttribute))
		? 'status signal'
		: surroundings.table
			? 'in a table'
			: surroundings.heading
				? 'next to a heading'
				: null;
	// Digits or a single interpolation: what a count looks like in a button or a navigation item.
	const numericContent = content.kind === 'text' && content.icons.length === 0 && !content.translateKey && /^value="(\d[\d\s.,]*|\{\{[\s\S]*\}\})"$/.test(content.single ?? '');
	const counterHost = surroundings.counterHost && numericContent ? surroundings.counterHost : null;

	if (isNumber || counterHost) {
		target = 'numericBadge';
	} else if (semantic) {
		if (!statusSignal) {
			report('—', 'not converted', `semantic palette (${semantic}) without status signal`);
			return null;
		}
		target = 'statusBadge';
	} else {
		target = 'tag';
	}

	const unsupported = values.find((value) => !allowedPalettes[target].includes(value));

	if (unsupported) {
		report('—', 'not converted', `palette ${unsupported} is not allowed on ${targetTags[target]}`);
		return null;
	}

	if (target === 'numericBadge') {
		if (content.kind !== 'text' || content.icons.length > 0 || content.translateKey || !content.single) {
			report('—', 'not converted', 'mod-number with complex content');
			return null;
		}
	}

	if (content.kind === 'complex') {
		const fallbackTarget = target as 'statusBadge' | 'tag';
		context.state.fallbackComponents.add(fallbackTarget);
		report(`${fallbackTarget} (HTML)`, 'low', `${content.reason}, HTML fallback`);
		return buildHtmlFallback(template, element, classAttribute, classes, fallbackTarget, palette);
	}

	const notes: string[] = [];
	const inputs: string[] = [];

	if (target === 'numericBadge') {
		inputs.push(content.single!);
		const size = classes.find((cls) => cls === 'mod-S' || cls === 'mod-XS');
		if (size) {
			inputs.push(`size="${size.replace('mod-', '')}"`);
		}
	} else {
		inputs.push(content.label!);
		if (target === 'statusBadge' && surroundings.heading === 'large') {
			inputs.push('size="L"');
		}
		if (content.icons.length > 0) {
			if (target === 'tag') {
				inputs.push(`icon="${content.icons[0]}"`);
			} else {
				notes.push('icon dropped (not allowed on a StatusBadge)');
			}
		}
	}

	inputs.push(paletteInput(palette));

	if (target === 'tag') {
		inputs.push('outlined');
	}

	if (content.translateKey) {
		context.symbols.add('TranslatePipe');
	}

	context.symbols.add(targetSymbols[target]);

	// The NumericBadge goes with a button or a navigation item: in a table cell, the count is more likely plain data.
	if (target === 'numericBadge' && surroundings.table && !surroundings.counterHost) {
		notes.push('count in a table, plain text may fit better');
	}

	const confidence: LabelConfidence = notes.length > 0 || (target === 'tag' && values.includes('product')) ? 'low' : 'high';
	const description = target === 'numericBadge' && !isNumber ? `count in a ${counterHost}` : describeTarget(target, palette, semantic, statusSignal);
	report(targetTags[target], confidence, [description, ...notes].join('; '));

	return buildComponent(template, element, classAttribute, classes, targetTags[target], inputs, palette, content.translateAttribute);
}

function describeTarget(target: Target, palette: Palette, semantic?: string, statusSignal?: string | null): string {
	switch (target) {
		case 'numericBadge':
			return 'mod-number';
		case 'statusBadge':
			return `semantic palette (${semantic}) + ${statusSignal}`;
		case 'tag':
			if (palette.condition) {
				return 'conditional palette, may be an ongoing status';
			}
			if (!palette.base) {
				return 'no palette (product), may be an ongoing status';
			}
			return palette.base === 'product' ? 'palette product, may be an ongoing status' : `palette ${palette.base}`;
	}
}

/** `[class.label]`, `[class]` / `[ngClass]` / interpolated `class` producing `label`. */
function isBoundLabelClass(template: string, input: TmplAstBoundAttribute): boolean {
	const source = template.slice(input.sourceSpan.start.offset, input.sourceSpan.end.offset);

	if (/^\[class\.label\]/.test(source)) {
		return true;
	}

	// `label` as a class token, a string or an object key: `class="label {{ x }}"`, `'label'`, `{ label: cond }`.
	return /^(\[class\]|\[ngClass\]|class=)/.test(source) && /(^|[\s'"{,])label([\s'":,}]|$)/.test(source.slice(source.indexOf('=') + 2));
}

function getInteraction(element: TmplAstElement): string | null {
	if (element.outputs.length > 0) {
		return `(${element.outputs[0].name})`;
	}

	const link = [...element.attributes, ...element.inputs].find((attribute) => ['routerLink', 'href'].includes(attribute.name));

	if (link) {
		return link.name;
	}

	return ['a', 'button'].includes(element.name) ? `<${element.name}>` : null;
}

interface Palette {
	/** Static palette, aliases resolved. */
	base?: string;
	/** Static palette as written in the template, for the HTML fallback. */
	baseClass?: string;
	condition?: { palette: string; expression: string; input: TmplAstBoundAttribute };
}

function getPalette(template: string, element: TmplAstElement, classes: string[]): Palette | { error: string } {
	const staticPalettes = classes.filter((cls) => cls.startsWith('palette-'));

	if (staticPalettes.length > 1) {
		return { error: 'several static palettes' };
	}

	const dynamicClass = element.inputs.find((input) => /^(\[class\]|\[ngClass\]|class=)/.test(template.slice(input.sourceSpan.start.offset, input.sourceSpan.end.offset)));

	if (dynamicClass) {
		return { error: `dynamic palette: ${dynamicClass.name === 'ngClass' ? '[ngClass]' : '[class]'}` };
	}

	const conditions = element.inputs.filter((input) => input.name.startsWith('palette-') && template.slice(input.sourceSpan.start.offset).startsWith('[class.'));

	if (conditions.length > 1) {
		return { error: 'dynamic palette: several conditions' };
	}

	const palette: Palette = {};

	if (staticPalettes.length === 1) {
		palette.baseClass = staticPalettes[0];
		palette.base = resolvePalette(staticPalettes[0].replace('palette-', ''));
	}

	if (conditions.length === 1) {
		const input = conditions[0];
		const expression = input.valueSpan ? template.slice(input.valueSpan.start.offset, input.valueSpan.end.offset).trim() : '';
		palette.condition = { palette: resolvePalette(input.name.replace('palette-', '')), expression, input };
	}

	return palette;
}

function resolvePalette(palette: string): string {
	return paletteAliases[palette] ?? palette;
}

function paletteInput(palette: Palette): string {
	const base = palette.base ?? 'product';

	if (!palette.condition) {
		return `palette="${base}"`;
	}

	const { expression } = palette.condition;
	// Pipes and ternaries have a lower precedence than the generated ternary.
	const condition = /(^|[^|])\|([^|]|$)|(?<!\?)\?(?![.?])/.test(expression) ? `(${expression})` : expression;
	return `[palette]="${condition} ? '${palette.condition.palette}' : '${base}'"`;
}

interface Content {
	kind: 'text' | 'complex';
	/** Why the content does not fit in an input, for the report. */
	reason?: string;
	icons: string[];
	/** `value` input of a NumericBadge, when the content is a single text or interpolation. */
	single?: string;
	/** `label` input of a StatusBadge or a Tag. */
	label?: string;
	translateKey?: string;
	translateAttribute?: TmplAstTextAttribute;
}

function getContent(template: string, element: TmplAstElement): Content {
	const compiler = currentSchematicContext.angularCompiler;
	const icons: string[] = [];
	const texts: string[] = [];
	let complex = false;

	for (const child of element.children) {
		if (child instanceof compiler.TmplAstText) {
			if (child.value.trim()) {
				texts.push(child.value);
			}
		} else if (child instanceof compiler.TmplAstBoundText) {
			texts.push(template.slice(child.sourceSpan.start.offset, child.sourceSpan.end.offset));
		} else if (isInterestingNode(child) && getIcon(child)) {
			icons.push(getIcon(child)!);
		} else {
			complex = true;
		}
	}

	const text = texts.join('').trim().replace(/\s+/g, ' ');
	// `translate="yes"` / `translate="no"` is the native HTML attribute, not the ngx-translate directive.
	const translateAttribute = element.attributes.find((attribute) => attribute.name === 'translate' && !['yes', 'no'].includes(attribute.value));
	const hasTranslateBindings = element.inputs.some((input) => input.name.startsWith('translate'));
	// Angular i18n marks the content: moving it to an input would drop the translation.
	const hasI18n = !!element.i18n || element.attributes.some((attribute) => attribute.name.startsWith('i18n'));

	const complexReason = [
		[complex, 'nested HTML'],
		[icons.length > 1, 'several icons'],
		[text.includes('"'), 'double quotes in the text'],
		[hasTranslateBindings, 'bound translate directive'],
		[hasI18n, 'Angular i18n'],
	].find(([matches]) => matches)?.[1] as string | undefined;

	if (complexReason) {
		return { kind: 'complex', icons, reason: complexReason };
	}

	if (translateAttribute) {
		const key = translateAttribute.value || text;

		if (!key || (translateAttribute.value && text) || key.includes('{{') || key.includes("'") || icons.length > 0) {
			return { kind: 'complex', icons, reason: 'translate directive with mixed content' };
		}

		return { kind: 'text', icons, label: `[label]="'${key}' | translate"`, translateKey: key, translateAttribute };
	}

	if (!text) {
		return { kind: 'complex', icons, reason: 'empty content' };
	}

	// Attribute interpolation keeps the string conversion the text content had: a property binding would pass the raw
	// type (`string | undefined`, numbers) to `label`, and a number `value` would be capped at `maxValue` ("999+").
	const isSingleValue = !text.includes('{{') || /^\{\{(?:(?!\{\{|\}\})[\s\S])*\}\}$/.test(text);

	return { kind: 'text', icons, single: isSingleValue ? `value="${text}"` : undefined, label: `label="${text}"` };
}

/** `<lu-icon icon="…">` or `<span class="label-icon lucca-icon icon-…">`. */
function getIcon(element: TmplAstElement): string | null {
	if (element.name === 'lu-icon') {
		return element.attributes.find((attribute) => attribute.name === 'icon')?.value || null;
	}

	const classes = element.attributes.find((attribute) => attribute.name === 'class')?.value.split(/\s+/) ?? [];

	if (!classes.includes('label-icon') || element.children.length > 0) {
		return null;
	}

	return classes.find((cls) => cls.startsWith('icon-'))?.replace('icon-', '') || null;
}

/** Source of the element without the given attribute, where a status signal is looked for. */
function withoutAttribute(template: string, element: TmplAstElement, attribute: TmplAstTextAttribute): string {
	const end = (element.endSourceSpan ?? element.startSourceSpan).end.offset;
	return template.slice(element.startSourceSpan.start.offset, attribute.sourceSpan.start.offset) + template.slice(attribute.sourceSpan.end.offset, end);
}

const removedClasses = ['label', 'mod-number', 'mod-S', 'mod-XS'];

function buildComponent(
	template: string,
	element: TmplAstElement,
	classAttribute: TmplAstTextAttribute,
	classes: string[],
	tagName: string,
	inputs: string[],
	palette: Palette,
	translateAttribute?: TmplAstTextAttribute,
): FileUpdate {
	const start = element.startSourceSpan.start.offset;
	const end = (element.endSourceSpan ?? element.startSourceSpan).end.offset;
	const opening = template.slice(start, element.startSourceSpan.end.offset);
	const relative = (update: FileUpdate): FileUpdate => ({ ...update, position: update.position - start });
	const updates: FileUpdate[] = [
		{ position: 1, oldContent: element.name, newContent: tagName },
		{ position: 1 + element.name.length, oldContent: '', newContent: ` ${inputs.join(' ')}` },
	];

	const remainingClasses = classes.filter((cls) => !removedClasses.includes(cls) && !cls.startsWith('palette-'));

	if (remainingClasses.length === 0) {
		updates.push(relative(removeAttributeUpdate(template, classAttribute)));
	} else if (classAttribute.valueSpan) {
		updates.push(relative({ position: classAttribute.valueSpan.start.offset, oldContent: classAttribute.value, newContent: remainingClasses.join(' ') }));
	}

	if (palette.condition) {
		updates.push(relative(removeAttributeUpdate(template, palette.condition.input)));
	}

	if (translateAttribute) {
		updates.push(relative(removeAttributeUpdate(template, translateAttribute)));
	}

	// The content moved to the inputs: the element closes itself.
	let tail = opening.endsWith('/>') ? opening.length - 2 : opening.length - 1;
	while (tail > 0 && /\s/.test(opening[tail - 1])) {
		tail--;
	}
	updates.push({ position: tail, oldContent: opening.slice(tail), newContent: ' />' });

	return { position: start, oldContent: template.slice(start, end), newContent: applyUpdates(opening, updates) };
}

function buildHtmlFallback(template: string, element: TmplAstElement, classAttribute: TmplAstTextAttribute, classes: string[], target: 'statusBadge' | 'tag', palette: Palette): FileUpdate {
	const componentClasses = target === 'tag' ? ['tag', 'mod-outlined'] : ['statusBadge'];
	const newClasses = classes.flatMap((cls) => {
		if (cls === 'label') {
			// The Tag has no default palette, the Label used to fall back on product.
			return target === 'tag' && !palette.base ? [...componentClasses, 'palette-product'] : componentClasses;
		}
		if (cls === palette.baseClass) {
			const name = cls.replace('palette-', '');
			// critical stays: it is a valid CSS palette, only the Angular inputs lack it.
			return [`palette-${name === 'critical' ? name : resolvePalette(name)}`];
		}
		return [cls];
	});

	return { position: classAttribute.valueSpan!.start.offset, oldContent: classAttribute.value, newContent: newClasses.join(' ') };
}
