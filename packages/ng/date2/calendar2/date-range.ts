import { Palette } from '@lucca-front/ng/core';
import { CalendarMode } from './calendar-mode';

export interface DateRangeInput {
	class?: `palette-${Palette}` | string;
	/**
	 * Start bound of the range. Optional: a range can be open on its start, for instance when
	 * a filter only expresses an "until" date.
	 */
	start?: Date | string | null;
	/**
	 * End bound of the range. Optional: a range can be open on its end, for instance when
	 * a filter only expresses a "from" date.
	 */
	end?: Date | string | null;
	label?: string;
	scope?: CalendarMode;
}
export interface DateRange extends DateRangeInput {
	start?: Date | null;
	end?: Date | null;
}
