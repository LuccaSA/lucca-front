import { CalendarMode } from './calendar2/calendar-mode';
import { humanizeDate } from './date-format';

describe('humanizeDate', () => {
	const reference = new Date(2026, 2, 15, 12);

	describe('in day mode', () => {
		const testCases: { locale: string; yesterday: string; today: string; tomorrow: string }[] = [
			{ locale: 'fr-FR', yesterday: 'Hier', today: 'Aujourd’hui', tomorrow: 'Demain' },
			{ locale: 'en', yesterday: 'Yesterday', today: 'Today', tomorrow: 'Tomorrow' },
			{ locale: 'de-DE', yesterday: 'Gestern', today: 'Heute', tomorrow: 'Morgen' },
		];

		for (const { locale, yesterday, today, tomorrow } of testCases) {
			it(`should humanize the surrounding days in ${locale}`, () => {
				expect(humanizeDate(locale, new Date(2026, 2, 14, 8), 'day', reference)).toBe(yesterday);
				expect(humanizeDate(locale, new Date(2026, 2, 15, 8), 'day', reference)).toBe(today);
				expect(humanizeDate(locale, new Date(2026, 2, 16, 8), 'day', reference)).toBe(tomorrow);
			});
		}

		it('should return null for any other day', () => {
			expect(humanizeDate('en', new Date(2026, 2, 13), 'day', reference)).toBeNull();
			expect(humanizeDate('en', new Date(2026, 2, 17), 'day', reference)).toBeNull();
		});

		it('should compare calendar days and not elapsed hours', () => {
			// Two hours apart, but not the same calendar day
			expect(humanizeDate('en', new Date(2026, 2, 16, 1), 'day', new Date(2026, 2, 15, 23))).toBe('Tomorrow');
			// Almost 24 hours apart, but the same calendar day
			expect(humanizeDate('en', new Date(2026, 2, 15, 23), 'day', new Date(2026, 2, 15, 0))).toBe('Today');
		});

		it('should default to the day mode', () => {
			expect(humanizeDate('en', new Date(2026, 2, 15), undefined, reference)).toBe('Today');
		});

		it('should default the reference to the current date', () => {
			vi.useFakeTimers();
			vi.setSystemTime(reference);

			expect(humanizeDate('en', new Date(2026, 2, 15, 8))).toBe('Today');

			vi.useRealTimers();
		});
	});

	describe('in month mode', () => {
		it('should display the month name and the year', () => {
			expect(humanizeDate('fr-FR', new Date(2026, 2, 15), 'month', reference)).toBe('Mars 2026');
			expect(humanizeDate('en', new Date(2026, 2, 15), 'month', reference)).toBe('March 2026');
			expect(humanizeDate('de-DE', new Date(2026, 2, 15), 'month', reference)).toBe('März 2026');
		});

		it('should humanize any month, whatever the reference', () => {
			expect(humanizeDate('en', new Date(1998, 6, 12), 'month', reference)).toBe('July 1998');
		});
	});

	describe('in week and year modes', () => {
		for (const mode of ['week', 'year'] satisfies CalendarMode[]) {
			it(`should return null in ${mode} mode`, () => {
				expect(humanizeDate('en', new Date(2026, 2, 15), mode, reference)).toBeNull();
			});
		}
	});

	it('should return null for an invalid date', () => {
		expect(humanizeDate('en', new Date('not a date'), 'day', reference)).toBeNull();
		expect(humanizeDate('en', new Date('not a date'), 'month', reference)).toBeNull();
	});
});
