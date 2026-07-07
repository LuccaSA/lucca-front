import { findClassAttributeValues, getClassAttributeContext } from './class-context';

function at(input: string) {
	const offset = input.indexOf('|');
	const text = input.replace('|', '');
	return getClassAttributeContext(text, offset);
}

describe('getClassAttributeContext', () => {
	it('detects inside a double-quoted class attribute', () => {
		const ctx = at('<div class="pr-u-disp|">');
		expect(ctx?.token).toBe('pr-u-disp');
	});

	it('detects inside a single-quoted class attribute', () => {
		const ctx = at("<div class='pr-u-mar|'>");
		expect(ctx?.token).toBe('pr-u-mar');
	});

	it('handles className (JSX-style) attributes', () => {
		const ctx = at('<div className="pr-u-|">');
		expect(ctx).toBeDefined();
	});

	it('handles multiple classes and returns the token under the cursor', () => {
		const ctx = at('<div class="pr-u-displayFlex pr-u-gap|">');
		expect(ctx?.token).toBe('pr-u-gap');
	});

	it('works across multiline class attributes', () => {
		const ctx = at('<div\n  class="pr-u-a\n         pr-u-b|"\n>');
		expect(ctx?.token).toBe('pr-u-b');
	});

	it('returns undefined outside any class attribute', () => {
		expect(at('<div id="foo|">')).toBeUndefined();
	});

	it('returns undefined once the attribute value is closed', () => {
		expect(at('<div class="pr-u-x"> text| ')).toBeUndefined();
	});

	it('rejects when a tag close intervenes (broken input)', () => {
		expect(at('<div class="a"> <span>pr-u-x| ')).toBeUndefined();
	});

	it('ignores a second, unrelated class attribute earlier in the doc', () => {
		const ctx = at('<a class="x"></a><b class="pr-u-y|">');
		expect(ctx?.token).toBe('pr-u-y');
	});
});

describe('findClassAttributeValues', () => {
	it('finds all class attribute value spans', () => {
		const text = '<div class="a b"></div><p class="c"></p>';
		const spans = findClassAttributeValues(text);
		expect(spans.map((s) => text.slice(s.start, s.end))).toEqual(['a b', 'c']);
	});
});
