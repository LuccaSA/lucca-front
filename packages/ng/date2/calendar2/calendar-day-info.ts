import { DayStatus } from './day-status';

export interface CalendarDayInfo {
	day: number;
	isWeekend: boolean;
	isOverflow: boolean;
	date: Date;
	status: DayStatus;
}
