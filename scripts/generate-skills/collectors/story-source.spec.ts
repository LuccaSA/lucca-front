import { describe, expect, it } from 'vitest';
import { deriveFullName, disambiguateNames } from './story-source';

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
	const example = (importPath: string, name: string, framework: 'angular' | 'html-css' = 'html-css') =>
		({ importPath, name, framework, fileSlug: importPath, imports: [], templates: [] }) as never;

	it('leaves a unique title alone', () => {
		const examples = [example('./s/x/html&css/a-basic.stories.ts', 'Basic'), example('./s/x/html&css/a-other.stories.ts', 'Other')];

		disambiguateNames(examples);

		expect(examples.map((e: { name: string }) => e.name)).toEqual(['Basic', 'Other']);
	});

	it('expands both sides of a collision', () => {
		const examples = [
			example('./s/x/html&css/detail-basic.stories.ts', 'Basic'),
			example('./s/x/html&css/list-basic.stories.ts', 'Basic'),
		];

		disambiguateNames(examples);

		expect(examples.map((e: { name: string }) => e.name)).toEqual(['Detail basic', 'List basic']);
	});

	it('does not touch a title shared across two sections', () => {
		// One under ## Angular and one under ## HTML/CSS never collide on the page.
		const examples = [
			example('./s/x/angular/basic.stories.ts', 'Basic', 'angular'),
			example('./s/x/html&css/basic.stories.ts', 'Basic', 'html-css'),
		];

		disambiguateNames(examples);

		expect(examples.map((e: { name: string }) => e.name)).toEqual(['Basic', 'Basic']);
	});

	it('adds folder context when the file names are identical', () => {
		const examples = [
			example('./s/users/avatars/html&css/basic.stories.ts', 'Basic'),
			example('./s/users/avatars/html&css/group/basic.stories.ts', 'Basic'),
		];

		disambiguateNames(examples);

		expect(new Set(examples.map((e: { name: string }) => e.name)).size).toBe(2);
	});
});
