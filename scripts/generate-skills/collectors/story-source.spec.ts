import { describe, expect, it } from 'vitest';
import { deriveFullName, disambiguateNames, extractArgTypeDescriptions, findInputDescription } from './story-source';

/**
 * Two stories in one section must not end up under the same `###`: the page then shows two
 * identically-titled examples with different content and nothing to tell them apart. 83 such
 * collisions on 22.0.
 */
describe('deriveFullName', () => {
	it('keeps the whole file name at depth 0', () => {
		expect(deriveFullName('./stories/documentation/x/html&css/detail-basic.stories.ts')).toBe('Detail basic');
	});

	it('adds one folder of context at depth 1', () => {
		expect(deriveFullName('./stories/documentation/users/avatars/html&css/group/basic.stories.ts', 1)).toBe('Group basic');
	});

	it('skips framework folders, which are already the section', () => {
		expect(deriveFullName('./stories/documentation/users/avatars/html&css/basic.stories.ts', 1)).toBe('Avatars basic');
		expect(deriveFullName('./stories/documentation/users/popover/angular/popover.stories.ts', 1)).toBe('Users popover');
	});

	it('does not repeat a folder that matches the file name', () => {
		expect(deriveFullName('./stories/documentation/overlays/popover/popover.stories.ts', 1)).toBe('Overlays popover');
	});

	it('separates two files sharing a name in different folders', () => {
		const a = deriveFullName('./stories/documentation/overlays/popover/popover.stories.ts', 1);
		const b = deriveFullName('./stories/documentation/users/popover/angular/popover.stories.ts', 1);

		expect(a).not.toBe(b);
	});
});

/**
 * `deriveFullName` alone proved nothing: `disambiguateNames` could have stopped being called and
 * every test would still pass. This exercises the pass itself.
 */
describe('disambiguateNames', () => {
	const example = (importPath: string, name: string, framework: 'angular' | 'html-css' = 'html-css') => ({ importPath, name, framework, fileSlug: importPath, imports: [], templates: [] }) as never;

	it('leaves a unique title alone', () => {
		const examples = [example('./s/x/html&css/a-basic.stories.ts', 'Basic'), example('./s/x/html&css/a-other.stories.ts', 'Other')];

		disambiguateNames(examples);

		expect(examples.map((e: { name: string }) => e.name)).toEqual(['Basic', 'Other']);
	});

	it('expands both sides of a collision', () => {
		const examples = [example('./s/x/html&css/detail-basic.stories.ts', 'Basic'), example('./s/x/html&css/list-basic.stories.ts', 'Basic')];

		disambiguateNames(examples);

		expect(examples.map((e: { name: string }) => e.name)).toEqual(['Detail basic', 'List basic']);
	});

	it('does not touch a title shared across two sections', () => {
		// One under ## Angular and one under ## HTML/CSS never collide on the page.
		const examples = [example('./s/x/angular/basic.stories.ts', 'Basic', 'angular'), example('./s/x/html&css/basic.stories.ts', 'Basic', 'html-css')];

		disambiguateNames(examples);

		expect(examples.map((e: { name: string }) => e.name)).toEqual(['Basic', 'Basic']);
	});

	it('adds folder context when the file names are identical', () => {
		const examples = [example('./s/users/avatars/html&css/basic.stories.ts', 'Basic'), example('./s/users/avatars/html&css/group/basic.stories.ts', 'Basic')];

		disambiguateNames(examples);

		expect(new Set(examples.map((e: { name: string }) => e.name)).size).toBe(2);
	});
});

/**
 * Prettier moves a description that does not fit within the print width to the next line. Those
 * descriptions were skipped, leaving the input without description in the generated docs.
 */
describe('extractArgTypeDescriptions', () => {
	const story = (argTypes: string) => `export default {\n\targTypes: {\n${argTypes}\n\t},\n};`;

	it('reads a description on the same line', () => {
		const content = story("\t\tlabel: {\n\t\t\tdescription: 'Short label.',\n\t\t\ttable: { category: 'inputs' },\n\t\t},");

		expect(extractArgTypeDescriptions(content)).toEqual([{ name: 'label', description: 'Short label.', host: null, scopedHosts: [] }]);
	});

	it('reads a description wrapped onto the next line', () => {
		const content = story("\t\tlabel: {\n\t\t\tdescription:\n\t\t\t\t'Wrapped <code>label</code>.',\n\t\t\ttable: { category: 'inputs' },\n\t\t},");

		expect(extractArgTypeDescriptions(content)).toEqual([{ name: 'label', description: 'Wrapped label.', host: null, scopedHosts: [] }]);
	});

	it('unescapes escaped quotes', () => {
		const content = story("\t\tlabel: {\n\t\t\tdescription: 'Type <code>Config&lt;\\'fixed\\'&gt;</code>.',\n\t\t},");

		expect(extractArgTypeDescriptions(content)).toEqual([{ name: 'label', description: "Type Config&lt;'fixed'&gt;.", host: null, scopedHosts: [] }]);
	});

	it('keeps an escaped backslash apart from a line break', () => {
		const content = story("\t\tlabel: {\n\t\t\tdescription: 'Keeps `\\\\n` as text.\\nNext line.',\n\t\t},");

		expect(extractArgTypeDescriptions(content)).toEqual([{ name: 'label', description: 'Keeps `\\n` as text. Next line.', host: null, scopedHosts: [] }]);
	});

	it('ignores a control of the story itself', () => {
		const content = story("\t\tresponsive: {\n\t\t\tdescription: 'Story-only @let.',\n\t\t\ttable: { category: 'story' },\n\t\t},");

		expect(extractArgTypeDescriptions(content)).toEqual([]);
	});

	it('records the host of a per-host category', () => {
		const content = story(
			"\t\tsmall: {\n\t\t\tdescription: 'List size.',\n\t\t\ttable: { category: 'inputs' },\n\t\t},\n\t\tclickable: {\n\t\t\tdescription: 'Item click.',\n\t\t\ttable: { category: 'inputs (sortable-list-item)' },\n\t\t},",
		);

		expect(extractArgTypeDescriptions(content)).toEqual([
			{ name: 'small', description: 'List size.', host: null, scopedHosts: ['sortable-list-item'] },
			{ name: 'clickable', description: 'Item click.', host: 'sortable-list-item', scopedHosts: ['sortable-list-item'] },
		]);
	});

	it('ignores a description key not followed by a string', () => {
		const content = story('\t\tlabel: {\n\t\t\tdescription:\n\t\t\t\tgetDescription(),\n\t\t},');

		expect(extractArgTypeDescriptions(content)).toEqual([]);
	});
});

/**
 * Inputs are matched by name across every class of the entrypoint: without the host, a list's
 * `small` documented the item's `small` too.
 */
describe('findInputDescription', () => {
	const api = (...selectors: string[]) => ({ selectors }) as never;
	const input = { bindingName: 'small', propName: 'small' };
	const scopedHosts = ['sortable-list-item', 'th[luDataTableCell]', 'luSkipLinkTarget'];
	const main = { name: 'small', description: 'List size.', host: null, scopedHosts };

	it('gives a plain description to the main host', () => {
		expect(findInputDescription([main], api('lu-sortable-list'), input)).toBe('List size.');
	});

	it('keeps a plain description away from a host documented on its own', () => {
		expect(findInputDescription([main], api('lu-sortable-list-item'), input)).toBeUndefined();
	});

	it('gives a per-host description to that host only', () => {
		const item = { name: 'small', description: 'Item size.', host: 'sortable-list-item', scopedHosts };

		expect(findInputDescription([item, main], api('lu-sortable-list-item'), input)).toBe('Item size.');
		expect(findInputDescription([item, main], api('lu-sortable-list'), input)).toBe('List size.');
	});

	it('matches attribute and directive selectors', () => {
		const cell = { name: 'small', description: 'Cell.', host: 'th[luDataTableCell]', scopedHosts };
		const target = { name: 'small', description: 'Target.', host: 'luSkipLinkTarget', scopedHosts };

		expect(findInputDescription([cell], api('th[luDataTableCell]'), input)).toBe('Cell.');
		expect(findInputDescription([target], api('[luSkipLinkTarget]'), input)).toBe('Target.');

		const action = { name: 'small', description: 'Action.', host: 'list-action', scopedHosts: ['list-action'] };
		expect(findInputDescription([action], api('a[lu-list-action]'), input)).toBe('Action.');
	});

	it('applies no description of a host that is not a class', () => {
		const ngModel = { name: 'small', description: 'Form control.', host: 'ngModel', scopedHosts: ['ngModel'] };

		expect(findInputDescription([ngModel], api('lu-sortable-list'), input)).toBeUndefined();
	});
});
