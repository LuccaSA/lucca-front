import { transformDateInputToDate, transformDateRangeToDateRangeInput, transformDateToDateISO } from './utils';

function dateWithYear(year: number, monthIndex: number, day: number): Date {
	// The Date constructor maps years 0 to 99 to 1900-1999, setFullYear does not
	const date = new Date(2000, 0, 1);
	date.setFullYear(year, monthIndex, day);
	return date;
}

describe(transformDateToDateISO.name, () => {
	it('should return null for null', () => {
		expect(transformDateToDateISO(null)).toBeNull();
	});

	it('should pad the month and the day', () => {
		expect(transformDateToDateISO(new Date(2024, 2, 5))).toBe('2024-03-05');
	});

	it('should write a leap day', () => {
		expect(transformDateToDateISO(new Date(2024, 1, 29))).toBe('2024-02-29');
	});

	it('should write the local day whatever the time of day', () => {
		expect(transformDateToDateISO(new Date(2023, 11, 31, 23, 59, 59, 999))).toBe('2023-12-31');
		expect(transformDateToDateISO(new Date(2024, 0, 1, 0, 0, 0, 0))).toBe('2024-01-01');
	});

	it('should pad years under 1000 to four digits', () => {
		expect(transformDateToDateISO(dateWithYear(5, 0, 1))).toBe('0005-01-01');
		expect(transformDateToDateISO(dateWithYear(999, 11, 31))).toBe('0999-12-31');
	});

	it('should write years over 9999 in full', () => {
		expect(transformDateToDateISO(dateWithYear(10000, 0, 1))).toBe('10000-01-01');
	});

	it('should throw on an invalid date', () => {
		expect(() => transformDateToDateISO(new Date(NaN))).toThrow(RangeError);
	});

	it('should be read back as the same day', () => {
		const date = new Date(2024, 9, 27, 18, 45);

		expect(transformDateInputToDate(transformDateToDateISO(date))).toEqual(new Date(2024, 9, 27));
	});
});

describe(transformDateRangeToDateRangeInput.name, () => {
	it('should write both bounds as ISO dates', () => {
		expect(transformDateRangeToDateRangeInput({ start: new Date(2024, 0, 31), end: new Date(2024, 1, 29) })).toEqual({
			start: '2024-01-31',
			end: '2024-02-29',
		});
	});

	it('should keep an open bound null', () => {
		expect(transformDateRangeToDateRangeInput({ start: null, end: new Date(2024, 11, 31) })).toEqual({ start: null, end: '2024-12-31' });
		expect(transformDateRangeToDateRangeInput({ start: new Date(2024, 0, 1), end: null })).toEqual({ start: '2024-01-01', end: null });
	});
});
