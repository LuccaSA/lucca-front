import { DateRange } from './date-range';
import { DayStatus } from './day-status';

export interface CalendarDayInfo {
	day: number;
	isWeekend: boolean;
	isOverflow: boolean;
	date: Date;
	status: DayStatus;
	isCurrent: boolean;
	classes: string[];
	rangeInfo: {
		range?: DateRange;
		isStart: boolean;
		isEnd: boolean;
		label?: string;
	};
}
