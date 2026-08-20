import { findInlineTemplateRegions, getInlineTemplateRegionAt } from './inline-template';

describe('findInlineTemplateRegions', () => {
	it('finds a single inline template', () => {
		const ts = '@Component({ template: `<div class="pr-u-x"></div>` })';
		const regions = findInlineTemplateRegions(ts);
		expect(regions).toHaveLength(1);
		expect(ts.slice(regions[0].start, regions[0].end)).toBe('<div class="pr-u-x"></div>');
	});

	it('finds multiple components in one file', () => {
		const ts = 'template: `<a></a>` ; template : `<b></b>`';
		const regions = findInlineTemplateRegions(ts);
		expect(regions).toHaveLength(2);
		expect(ts.slice(regions[1].start, regions[1].end)).toBe('<b></b>');
	});

	it('respects escaped backticks inside the template', () => {
		const ts = 'template: `a \\` b`';
		const regions = findInlineTemplateRegions(ts);
		expect(regions).toHaveLength(1);
		expect(ts.slice(regions[0].start, regions[0].end)).toBe('a \\` b');
	});

	it('locates the region containing an offset', () => {
		const ts = 'x; template: `<div></div>`; y';
		const inside = ts.indexOf('<div') + 2;
		expect(getInlineTemplateRegionAt(ts, inside)).toBeDefined();
		expect(getInlineTemplateRegionAt(ts, 0)).toBeUndefined();
	});
});
