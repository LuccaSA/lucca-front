import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isNil } from '@lucca-front/ng/core';
import { isEndTimeBeforeStartTime } from '../core/duration.utils';
import { TimePickerRange } from './time-picker-range';

/**
 * Validator that checks if the end time is before the start time
 * Returns an error object `endTimeBeforeStartTime: true` if the end time is before the start time
 */
export function endTimeBeforeStartTimeValidator(): ValidatorFn {
	return (control: AbstractControl<TimePickerRange | null>): ValidationErrors | null => {
		if (isNil(control.value)) {
			return null;
		}

		return isEndTimeBeforeStartTime(control.value) ? { endTimeBeforeStartTime: true } : null;
	};
}
