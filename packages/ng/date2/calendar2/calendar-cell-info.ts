import { CellStatus } from './cell-status';
import { DateRange } from './date-range';

export interface RangeInfo {
	range?: DateRange;
	isStart: boolean;
	isEnd: boolean;
	label?: string;
}

export interface CalendarCellInfo {
	day: number;
	isWeekend: boolean;
	isOverflow: boolean;
	date: Date;
	status: CellStatus;
	isCurrent: boolean;
	classes: string[];
	disabled: boolean;
	label?: string;
	rangeInfo: RangeInfo;
	isLastDayOfMonth: boolean;
}

export interface CalendarMonthInfo {
	date: Date;
	short: string;
	long: string;
	isCurrent: boolean;
	status: CellStatus;
	rangeInfo: RangeInfo;
}

export interface CalendarYearInfo {
	date: Date;
	label: string;
	isCurrent: boolean;
	status: CellStatus;
	rangeInfo: RangeInfo;
}
