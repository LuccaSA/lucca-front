import { Palette } from '@lucca-front/ng/core';
import { CalendarMode } from './calendar-mode';

export interface DateRangeInput {
	class?: `palette-${Palette}` | string;
	start: Date | string;
	end?: Date | string;
	label?: string;
	scope?: CalendarMode;
}
export interface DateRange extends DateRangeInput {
	start: Date;
	end?: Date;
}
