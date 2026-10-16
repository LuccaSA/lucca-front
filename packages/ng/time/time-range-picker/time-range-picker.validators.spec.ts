import { FormControl } from '@angular/forms';
import { TimeRangePickerRange } from './time-range-picker';
import { endTimeBeforeStartTimeValidator } from './time-range-picker.validators';

describe('endTimeBeforeStartTimeValidator', () => {
	const validator = endTimeBeforeStartTimeValidator();

	it('should be valid when there is no value', () => {
		// Act
		const result = validator(new FormControl<TimeRangePickerRange | null>(null));

		// Assert
		expect(result).toBeNull();
	});

	it('should return endTimeBeforeStartTime when the end is before the start', () => {
		// Act
		const result = validator(new FormControl<TimeRangePickerRange | null>({ start: '17:30:00', end: '09:00:00' }));

		// Assert
		expect(result).toEqual({ endTimeBeforeStartTime: true });
	});

	it('should be valid when the end is after the start', () => {
		// Act
		const result = validator(new FormControl<TimeRangePickerRange | null>({ start: '09:00:00', end: '17:30:00' }));

		// Assert
		expect(result).toBeNull();
	});
});
