import { DayStatus } from './day-status';

export interface CalendarDayInfo {
	day: number;
	isWeekend: boolean;
	date: Date;
	status: DayStatus;
}
