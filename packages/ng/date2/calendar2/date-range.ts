import { Palette } from '@lucca-front/ng/core';
import { CalendarMode } from './calendar-mode';

export interface DateRange {
	class?: `palette-${Palette}` | string;
	start: Date;
	end?: Date;
	label?: string;
	scope?: CalendarMode;
	startsOutside?: boolean;
	endsOutside?: boolean;
	outside?: boolean;
}
