import { formatFileSize, KILO_BYTE, MEGA_BYTE } from './formatter';

describe('formatFileSize', () => {
	const FRENCH_LOCALE = 'fr-FR';

	const NON_BREAKING_SPACE = '\u00a0'; // Non-breaking space used by Intl.NumberFormat

	describe('bytes formatting', () => {
		it('should format small values as bytes (o)', () => {
			expect(formatFileSize(FRENCH_LOCALE, 0)).toBe('0o');
			expect(formatFileSize(FRENCH_LOCALE, 1)).toBe('1o');
			expect(formatFileSize(FRENCH_LOCALE, 500)).toBe('500o');
		});
	});

	describe('kilobytes formatting', () => {
		it('should format values >= 1KB as kilobytes (ko)', () => {
			expect(formatFileSize(FRENCH_LOCALE, KILO_BYTE)).toBe('1ko');
			expect(formatFileSize(FRENCH_LOCALE, 10_000)).toBe('10ko');
			expect(formatFileSize(FRENCH_LOCALE, 500_000)).toBe('500ko');
			expect(formatFileSize(FRENCH_LOCALE, 1_500)).toBe('1,5ko');
			expect(formatFileSize(FRENCH_LOCALE, 1_234.56)).toBe('1,2ko');
			expect(formatFileSize(FRENCH_LOCALE, 999_999)).toEqual(`1${NON_BREAKING_SPACE}kko`);
		});
	});

	describe('megabytes formatting', () => {
		it('should format values >= 1MB as megabytes (Mo)', () => {
			expect(formatFileSize(FRENCH_LOCALE, MEGA_BYTE)).toBe('1Mo');
			expect(formatFileSize(FRENCH_LOCALE, 10_000_000)).toBe('10Mo');
			expect(formatFileSize(FRENCH_LOCALE, 100_000_000)).toBe('100Mo');
			expect(formatFileSize(FRENCH_LOCALE, 1_500_000)).toBe('1,5Mo');
			expect(formatFileSize(FRENCH_LOCALE, 1_234_567.89)).toBe('1,2Mo');
			expect(formatFileSize(FRENCH_LOCALE, 10_000_000_000)).toEqual(`10${NON_BREAKING_SPACE}kMo`);
		});
	});
});
