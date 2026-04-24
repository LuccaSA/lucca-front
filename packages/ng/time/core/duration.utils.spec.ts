import { TimeRangePickerRange } from '../time-range-picker/time-range-picker';
import { getTotalSeconds, isEndTimeBeforeStartTime, isValidTimeRangePicker } from './duration.utils';

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
			expect(isBefore).toBe(true);
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
			expect(isBefore).toBe(true);
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
			expect(isBefore).toBe(false);
		});
	});
});
