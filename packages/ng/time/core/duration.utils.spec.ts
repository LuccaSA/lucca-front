import { TimeRangePickerRange } from '../time-range-picker/time-range-picker';
import { ISO8601Time } from './date-primitives';
import { createDurationFromMilliDays, getDecimalsFromMilliDays, getTotalSeconds, isEndTimeBeforeStartTime, isISO8601Duration, isoDurationToMilliDays, isValidTimeRangePicker } from './duration.utils';

describe('DurationUtils', () => {
	describe('getTotalSeconds', () => {
		it('should convert midnight to 0 seconds', () => {
			// Arrange
			const time: ISO8601Time = '00:00:00';

			// Act
			const totalSeconds = getTotalSeconds(time);

			// Assert
			expect(totalSeconds).toBe(0);
		});

		it('should convert 02:35:30 to 9330 seconds', () => {
			// Arrange
			const time: ISO8601Time = '02:35:30';

			// Act
			const totalSeconds = getTotalSeconds(time);

			// Assert
			expect(totalSeconds).toBe(9330);
		});
	});

	describe('isISO8601Duration', () => {
		it('should accept a decimal number of days', () => {
			// Arrange & Act & Assert
			expect(isISO8601Duration('P0.5D')).toBe(true);
			expect(isISO8601Duration('P0.125D')).toBe(true);
		});

		it('should still reject a non duration', () => {
			// Arrange & Act & Assert
			expect(isISO8601Duration('0.5')).toBe(false);
		});
	});

	describe('isoDurationToMilliDays', () => {
		it('should convert a decimal number of days', () => {
			// Arrange & Act & Assert
			expect(isoDurationToMilliDays('P0.5D')).toBe(500);
			expect(isoDurationToMilliDays('P0.125D')).toBe(125);
			expect(isoDurationToMilliDays('P1D')).toBe(1000);
		});

		it('should convert a duration expressed in hours', () => {
			// Arrange & Act & Assert
			expect(isoDurationToMilliDays('PT12H')).toBe(500);
			expect(isoDurationToMilliDays('PT0S')).toBe(0);
		});
	});

	describe('createDurationFromMilliDays', () => {
		it('should serialize milli-days as a number of days', () => {
			// Arrange & Act & Assert
			expect(createDurationFromMilliDays(0)).toBe('P0D');
			expect(createDurationFromMilliDays(125)).toBe('P0.125D');
			expect(createDurationFromMilliDays(300)).toBe('P0.3D');
			expect(createDurationFromMilliDays(2000)).toBe('P2D');
		});

		it('should round-trip every supported step', () => {
			// Arrange
			const steps = [1000, 500, 250, 125, 100];

			// Act & Assert
			steps.forEach((step) => expect(isoDurationToMilliDays(createDurationFromMilliDays(step))).toBe(step));
		});
	});

	describe('getDecimalsFromMilliDays', () => {
		it('should derive the number of decimals from the step', () => {
			// Arrange & Act & Assert
			expect(getDecimalsFromMilliDays(1000)).toBe(0);
			expect(getDecimalsFromMilliDays(500)).toBe(1);
			expect(getDecimalsFromMilliDays(100)).toBe(1);
			expect(getDecimalsFromMilliDays(250)).toBe(2);
			expect(getDecimalsFromMilliDays(125)).toBe(3);
		});
	});

	describe('isValidTimeRangePicker', () => {
		it('should return true when start and end are defined', () => {
			// Arrange
			const range: TimeRangePickerRange = {
				start: '09:00:00',
				end: '17:00:00',
			};

			// Act
			const isValid = isValidTimeRangePicker(range);

			// Assert
			expect(isValid).toBe(true);
		});

		it('should return false when start is undefined', () => {
			// Arrange
			const range: TimeRangePickerRange = {
				end: '17:00:00',
			};

			// Act
			const isValid = isValidTimeRangePicker(range);

			// Assert
			expect(isValid).toBe(false);
		});

		it('should return false when end is undefined', () => {
			// Arrange
			const range: TimeRangePickerRange = {
				start: '09:00:00',
			};

			// Act
			const isValid = isValidTimeRangePicker(range);

			// Assert
			expect(isValid).toBe(false);
		});

		it('should return false when both start and end are undefined', () => {
			// Arrange
			const range: TimeRangePickerRange = {};

			// Act
			const isValid = isValidTimeRangePicker(range);

			// Assert
			expect(isValid).toBe(false);
		});
	});

	describe('isEndTimeBeforeStartTime', () => {
		it('should return true when end time is after start time', () => {
			// Arrange
			const range: TimeRangePickerRange = {
				start: '09:00:00',
				end: '17:00:00',
			};

			// Act
			const isBefore = isEndTimeBeforeStartTime(range);

			// Assert
			expect(isBefore).toBe(false);
		});

		it('should return true when end time equals start time', () => {
			// Arrange
			const range: TimeRangePickerRange = {
				start: '12:00:00',
				end: '12:00:00',
			};

			// Act
			const isBefore = isEndTimeBeforeStartTime(range);

			// Assert
			expect(isBefore).toBe(false);
		});

		it('should return false when end time is before start time', () => {
			// Arrange
			const range: TimeRangePickerRange = {
				start: '17:00:00',
				end: '09:00:00',
			};

			// Act
			const isBefore = isEndTimeBeforeStartTime(range);

			// Assert
			expect(isBefore).toBe(true);
		});
	});
});
