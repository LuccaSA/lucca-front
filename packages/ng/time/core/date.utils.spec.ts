import { ISO8601Time } from './date-primitives';
import {
	castToIsoTime,
	convertStringToIsoTime,
	createIsoTimeFromHoursAndMinutes,
	formatAMPM,
	getHoursDisplayPartFromIsoTime,
	getHoursPartFromIsoTime,
	getMinutesDisplayPartFromIsoTime,
	getMinutesPartFromIsoTime,
	getSecondsPartFromIsoTime,
	isoTimeToSeconds,
} from './date.utils';

describe('DateUtils', () => {
	describe('castToIsoTime', () => {
		it('should return the string as-is', () => {
			expect(castToIsoTime('12:34:56')).toBe('12:34:56');
		});
	});

	describe('convertStringToIsoTime', () => {
		it('should keep a hh:mm:ss string unchanged', () => {
			expect(convertStringToIsoTime('12:34:56')).toBe('12:34:56');
		});

		it('should keep a h:mm:ss string unchanged', () => {
			expect(convertStringToIsoTime('9:05:30')).toBe('9:05:30');
		});

		it('should append seconds to a hh:mm string', () => {
			expect(convertStringToIsoTime('12:34')).toBe('12:34:00');
		});

		it('should convert a hh"h"mm string to hh:mm:ss', () => {
			expect(convertStringToIsoTime('12h34')).toBe('12:34:00');
		});

		it('should convert a h"h"mm string to h:mm:ss', () => {
			expect(convertStringToIsoTime('9h05')).toBe('9:05:00');
		});

		it('should throw when the format is not supported', () => {
			expect(() => convertStringToIsoTime('12')).toThrowError('Invalid time format: 12');
		});

		it('should throw when the string is empty', () => {
			expect(() => convertStringToIsoTime('')).toThrowError('Invalid time format: ');
		});
	});

	describe('createIsoTimeFromHoursAndMinutes', () => {
		it('should default seconds to 00', () => {
			expect(createIsoTimeFromHoursAndMinutes(12, 34)).toBe('12:34:00');
		});

		it('should pad every part to two digits', () => {
			expect(createIsoTimeFromHoursAndMinutes(1, 2, 3)).toBe('01:02:03');
		});

		it('should handle midnight', () => {
			expect(createIsoTimeFromHoursAndMinutes(0, 0, 0)).toBe('00:00:00');
		});
	});

	describe('isoTimeToSeconds', () => {
		it('should convert midnight to 0 seconds', () => {
			expect(isoTimeToSeconds('00:00:00')).toBe(0);
		});

		it('should sum hours, minutes and seconds', () => {
			expect(isoTimeToSeconds('02:35:30')).toBe(9330);
		});

		it('should ignore non numeric parts', () => {
			expect(isoTimeToSeconds('––:––:––' as ISO8601Time)).toBe(0);
		});
	});

	describe('getHoursPartFromIsoTime', () => {
		it('should return the hours part', () => {
			expect(getHoursPartFromIsoTime('13:45:30')).toBe(13);
		});

		it('should return 0 when the hours part is not a number', () => {
			expect(getHoursPartFromIsoTime('––:45:30' as ISO8601Time)).toBe(0);
		});
	});

	describe('getMinutesPartFromIsoTime', () => {
		it('should return the minutes part', () => {
			expect(getMinutesPartFromIsoTime('13:45:30')).toBe(45);
		});

		it('should return 0 when the minutes part is not a number', () => {
			expect(getMinutesPartFromIsoTime('13:––:30' as ISO8601Time)).toBe(0);
		});
	});

	describe('getSecondsPartFromIsoTime', () => {
		it('should return the seconds part', () => {
			expect(getSecondsPartFromIsoTime('13:45:30')).toBe(30);
		});

		it('should return 0 when the seconds part is not a number', () => {
			expect(getSecondsPartFromIsoTime('13:45:––' as ISO8601Time)).toBe(0);
		});
	});

	describe('getHoursDisplayPartFromIsoTime', () => {
		it('should return the 24h hours part by default', () => {
			expect(getHoursDisplayPartFromIsoTime('15:30:00')).toBe(15);
		});

		it('should return the placeholder when hours are not filled', () => {
			expect(getHoursDisplayPartFromIsoTime('––:30:00' as ISO8601Time)).toBe('––');
		});

		it('should return the 12h hours part when ampm is enabled', () => {
			expect(getHoursDisplayPartFromIsoTime('15:30:00', true)).toBe(3);
		});

		it('should display midnight as 12 when ampm is enabled', () => {
			expect(getHoursDisplayPartFromIsoTime('00:30:00', true)).toBe(12);
		});
	});

	describe('formatAMPM', () => {
		it('should return 12 AM for midnight', () => {
			expect(formatAMPM(0)).toEqual({ hours: 12, suffix: 'AM' });
		});

		it('should return 12 PM for noon', () => {
			expect(formatAMPM(12)).toEqual({ hours: 12, suffix: 'PM' });
		});

		it('should keep morning hours unchanged', () => {
			expect(formatAMPM(9)).toEqual({ hours: 9, suffix: 'AM' });
		});

		it('should convert afternoon hours to 12h format', () => {
			expect(formatAMPM(23)).toEqual({ hours: 11, suffix: 'PM' });
		});
	});

	describe('getMinutesDisplayPartFromIsoTime', () => {
		it('should return the minutes part', () => {
			expect(getMinutesDisplayPartFromIsoTime('15:30:00')).toBe(30);
		});

		it('should return the placeholder when minutes are not filled', () => {
			expect(getMinutesDisplayPartFromIsoTime('15:––:00' as ISO8601Time)).toBe('––');
		});
	});
});
