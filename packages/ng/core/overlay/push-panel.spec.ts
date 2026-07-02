import { getPushPanelInlineSize, getPushPanelViewportMargin } from './push-panel';

describe('push-panel overlay helpers', () => {
	let getComputedStyleSpy: jest.SpyInstance;

	function withPushPanelValue(value: string): Element {
		getComputedStyleSpy.mockReturnValue({
			getPropertyValue: (prop: string) => (prop === '--commons-pushPanel-inlineSize' ? value : ''),
		});
		return {} as unknown as Element;
	}

	beforeEach(() => {
		getComputedStyleSpy = jest.spyOn(window, 'getComputedStyle');
	});

	afterEach(() => {
		getComputedStyleSpy.mockRestore();
	});

	describe('getPushPanelInlineSize', () => {
		it('parses a pixel value', () => {
			expect(getPushPanelInlineSize(withPushPanelValue('200px'))).toBe(200);
		});

		it('resolves a flat calc() sum of pixels', () => {
			expect(getPushPanelInlineSize(withPushPanelValue('calc(32px + 348px)'))).toBe(380);
		});

		it('resolves a calc() difference of pixels', () => {
			expect(getPushPanelInlineSize(withPushPanelValue('calc(400px - 20px)'))).toBe(380);
		});

		it('returns 0 for a calc() mixing non-pixel units', () => {
			expect(getPushPanelInlineSize(withPushPanelValue('calc(2rem + 348px)'))).toBe(0);
		});

		it('returns 0 when the token is unset', () => {
			expect(getPushPanelInlineSize(withPushPanelValue(''))).toBe(0);
		});

		it('returns 0 when the token is not parseable', () => {
			expect(getPushPanelInlineSize(withPushPanelValue('var(--whatever)'))).toBe(0);
		});

		it('returns 0 for a non-pixel unit', () => {
			expect(getPushPanelInlineSize(withPushPanelValue('2rem'))).toBe(0);
		});

		it('returns 0 for a negative pixel value', () => {
			expect(getPushPanelInlineSize(withPushPanelValue('-200px'))).toBe(0);
		});
	});

	describe('getPushPanelViewportMargin', () => {
		it('reserves the push size on the inline-end only', () => {
			expect(getPushPanelViewportMargin(withPushPanelValue('200px'))).toEqual({ start: 0, end: 200, top: 0, bottom: 0 });
		});

		it('adds the base margin to every side and the push on top of the inline-end', () => {
			expect(getPushPanelViewportMargin(withPushPanelValue('200px'), 8)).toEqual({ start: 8, end: 208, top: 8, bottom: 8 });
		});

		it('falls back to the base margin when no push is set', () => {
			expect(getPushPanelViewportMargin(withPushPanelValue('0px'), 8)).toEqual({ start: 8, end: 8, top: 8, bottom: 8 });
		});
	});
});
