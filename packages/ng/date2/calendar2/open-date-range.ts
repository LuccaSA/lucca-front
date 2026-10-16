import { DateRange, DateRangeInput } from './date-range';

/**
 * Range that can be open on one side, for instance when a filter only expresses a "from" or an "until" date.
 * Internal on purpose: making `start` optional on the public `DateRange` is a breaking change for consumers
 * reading `range.start` under `strict`, it is postponed to the next major.
 */
export interface OpenDateRangeInput extends Omit<DateRangeInput, 'start'> {
	start?: Date | string | null;
}

export interface OpenDateRange extends Omit<DateRange, 'start'> {
	start?: Date | null;
}
