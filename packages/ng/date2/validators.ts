import { PathKind, SchemaPath, SchemaPathRules, validate } from '@angular/forms/signals';
import { isNil } from '@lucca-front/ng/core';
import { DateRange } from './calendar2/date-range';

const isInvalidDate = (date: Date | null | undefined): boolean => !isNil(date) && isNaN(date.getTime());

/**
 * Signal forms validator that requires the value to be a valid date.
 * Reports a `date` error otherwise. Use the native `minDate` / `maxDate` validators for bounds.
 */
export function validDate<TValue extends Date | null, TPathKind extends PathKind = PathKind.Root>(path: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>): void {
	validate(path, ({ value }) => (isInvalidDate(value()) ? { kind: 'date' } : undefined));
}

/**
 * Signal forms validator that requires both bounds of the range to be valid dates.
 * Reports a `date` error otherwise.
 */
export function validDateRange<TValue extends DateRange | null, TPathKind extends PathKind = PathKind.Root>(path: SchemaPath<TValue, SchemaPathRules.Supported, TPathKind>): void {
	validate(path, ({ value }) => {
		const range = value();
		return isInvalidDate(range?.start) || isInvalidDate(range?.end) ? { kind: 'date' } : undefined;
	});
}
