import { formatSize, KILO_BYTE, MEGA_BYTE } from './formatter';

describe('formatSize', () => {
	const FRENCH_LOCALE = 'fr-FR';

	const NON_BREAKING_SPACE = '\u00a0'; // Non-breaking space used by Intl.NumberFormat

	describe('bytes formatting', () => {
		it('should format small values as bytes (o)', () => {
			expect(formatSize(FRENCH_LOCALE, 0)).toBe('0o');
			expect(formatSize(FRENCH_LOCALE, 1)).toBe('1o');
			expect(formatSize(FRENCH_LOCALE, 500)).toBe('500o');
		});
	});

	describe('kilobytes formatting', () => {
		it('should format values >= 1KB as kilobytes (ko)', () => {
			expect(formatSize(FRENCH_LOCALE, KILO_BYTE)).toBe('1ko');
			expect(formatSize(FRENCH_LOCALE, 10_000)).toBe('10ko');
			expect(formatSize(FRENCH_LOCALE, 500_000)).toBe('500ko');
			expect(formatSize(FRENCH_LOCALE, 1_500)).toBe('1,5ko');
			expect(formatSize(FRENCH_LOCALE, 1_234.56)).toBe('1,2ko');
			expect(formatSize(FRENCH_LOCALE, 999_999)).toEqual(`1${NON_BREAKING_SPACE}kko`);
		});
	});

	describe('megabytes formatting', () => {
		it('should format values >= 1MB as megabytes (Mo)', () => {
			expect(formatSize(FRENCH_LOCALE, MEGA_BYTE)).toBe('1Mo');
			expect(formatSize(FRENCH_LOCALE, 10_000_000)).toBe('10Mo');
			expect(formatSize(FRENCH_LOCALE, 100_000_000)).toBe('100Mo');
			expect(formatSize(FRENCH_LOCALE, 1_500_000)).toBe('1,5Mo');
			expect(formatSize(FRENCH_LOCALE, 1_234_567.89)).toBe('1,2Mo');
			expect(formatSize(FRENCH_LOCALE, 10_000_000_000)).toEqual(`10${NON_BREAKING_SPACE}kMo`);
		});
	});
});
