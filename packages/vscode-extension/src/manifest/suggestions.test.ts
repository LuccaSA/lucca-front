import { closestUtilities } from './suggestions';

const candidates = ['pr-u-displayFlex', 'pr-u-displayNone', 'pr-u-displayBlock', 'pr-u-marginInlineStart100', 'pr-u-colorTextBrand'];

describe('closestUtilities', () => {
	it('suggests the obvious fix for a trailing typo', () => {
		expect(closestUtilities('pr-u-displayFlexx', candidates)[0]).toBe('pr-u-displayFlex');
	});

	it('handles a transposition', () => {
		expect(closestUtilities('pr-u-dispalyFlex', candidates)[0]).toBe('pr-u-displayFlex');
	});

	it('is case-insensitive', () => {
		expect(closestUtilities('PR-U-DISPLAYFLEX', candidates)[0]).toBe('pr-u-displayFlex');
	});

	it('returns nothing when there is no close match', () => {
		expect(closestUtilities('pr-u-somethingCompletelyDifferent', candidates)).toEqual([]);
	});

	it('caps the number of results', () => {
		expect(closestUtilities('pr-u-display', candidates, 2).length).toBeLessThanOrEqual(2);
	});

	it('orders closer matches first', () => {
		const result = closestUtilities('pr-u-displayFlex', ['pr-u-displayFlexx', 'pr-u-displayFlex'], 2);
		expect(result[0]).toBe('pr-u-displayFlex');
	});
});
