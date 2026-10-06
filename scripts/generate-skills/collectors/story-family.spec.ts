import { describe, expect, it, vi } from 'vitest';
import { restrictToStoryFamily } from './storybook';
import { StorybookGroup } from '../types';

function group(titles: string[], docsTitle?: string): StorybookGroup {
	return {
		storybookName: 'Checkbox',
		slug: 'checkbox',
		category: 'Forms',
		stories: titles.map((title, i) => ({ id: `s${i}`, name: `S${i}`, title, url: '', importPath: '', framework: 'angular', frameworkConfident: true })),
		docsEntry: docsTitle ? { id: 'd', title: docsTitle, url: '' } : null,
	};
}

/**
 * `groupStoriesByComponent` keys on the component segment of the title, so two unrelated families
 * whose segment matches collapse into one group — which is how the `checkbox` page documented a
 * filter pill under `## Angular`.
 */
describe('restrictToStoryFamily', () => {
	it('drops the stories of another family', () => {
		const g = restrictToStoryFamily(group(['Documentation/Forms/Checkbox/Basic', 'Documentation/Forms/FiltersPills/Checkbox/Angular']), 'Documentation/Forms/Checkbox', 'checkbox');

		expect(g!.stories.map((s) => s.title)).toEqual(['Documentation/Forms/Checkbox/Basic']);
	});

	it('cuts at the component segment, so the framework siblings survive', () => {
		const g = restrictToStoryFamily(group(['Documentation/Actions/Button/Angular/Basic', 'Documentation/Actions/Button/HTML&CSS/Basic']), 'Documentation/Actions/Button/Angular', 'button');

		expect(g!.stories).toHaveLength(2);
	});

	it('does not read a full story title as a family prefix', () => {
		// Cutting at the component segment, not the literal prefix: the latter left data-table with 1 of 30.
		const titles = ['Documentation/Listings/Data table/Angular/Basic', 'Documentation/Listings/Data table/Angular/Sortable', 'Documentation/Listings/Data table/HTML&CSS/Basic'];
		const g = restrictToStoryFamily(group(titles), 'Documentation/Listings/Data table/Angular/Basic', 'data-table');

		expect(g!.stories).toHaveLength(3);
	});

	it('keeps the group untouched when no family is declared — grouping is the useful default', () => {
		const g = group(['Documentation/Forms/Checkbox/Basic']);
		expect(restrictToStoryFamily(g, undefined, 'checkbox')).toBe(g);
	});

	it('ignores a family that matches nothing rather than emptying the page', () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
		const g = group(['Documentation/Forms/Checkbox/Basic']);

		expect(restrictToStoryFamily(g, 'Documentation/Gone/Away', 'checkbox')).toBe(g);
		expect(warn).toHaveBeenCalled();
		warn.mockRestore();
	});

	it('drops a docs entry that belongs to the family it filtered out', () => {
		const g = restrictToStoryFamily(
			group(['Documentation/Forms/Checkbox/Basic', 'Documentation/Forms/FiltersPills/Checkbox/Angular'], 'Documentation/Forms/FiltersPills/Checkbox'),
			'Documentation/Forms/Checkbox',
			'checkbox',
		);

		expect(g!.docsEntry).toBeNull();
	});
});
