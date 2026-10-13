import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PathKind, SchemaPath, SchemaPathRules, validate } from '@angular/forms/signals';
import { isNil } from '@lucca-front/ng/core';
import { isEndTimeBeforeStartTime, isValidTimeRangePicker } from '../core/duration.utils';
import { TimeRangePickerRange } from './time-range-picker';

/**
 * Validator that checks if the end time is before the start time
 * Returns an error object `endTimeBeforeStartTime: true` if the end time is before the start time
 */
export function endTimeBeforeStartTimeValidator(): ValidatorFn {
	return (control: AbstractControl<TimeRangePickerRange | null>): ValidationErrors | null => {
		if (isNil(control.value)) {
			return null;
		}

		return isEndTimeBeforeStartTime(control.value) ? { endTimeBeforeStartTime: true } : null;
	};
}

/**
 * Signal forms validator that requires the range to have both a start and an end time.
 * Reports a `time` error otherwise.
 */
export function validTimeRange<TValue extends TimeRangePickerRange | null, TPathKind extends PathKind = PathKind.Root>(path: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>): void {
	validate(path, ({ value }) => {
		const range = value();
		return isNil(range) || isValidTimeRangePicker(range) ? undefined : { kind: 'time' };
	});
}

/**
 * Signal forms validator that requires the end time not to be before the start time.
 * Reports an `endTimeBeforeStartTime` error otherwise.
 */
export function endTimeBeforeStartTime<TValue extends TimeRangePickerRange | null, TPathKind extends PathKind = PathKind.Root>(path: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>): void {
	validate(path, ({ value }) => {
		const range = value();
		return !isNil(range) && isEndTimeBeforeStartTime(range) ? { kind: 'endTimeBeforeStartTime' } : undefined;
	});
}
