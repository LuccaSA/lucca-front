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
	date: Date;
	status: CellStatus;
	disabled: boolean;
	isWeekend: boolean;
	isCurrent: boolean;
	isOverflow: boolean;
	isSelected: boolean;
	noButton: boolean;
	label?: string;
	rangeInfo: RangeInfo;
	classes: Record<string, boolean>;
}

export interface CalendarMonthInfo {
	date: Date;
	short: string;
	long: string;
	isCurrent: boolean;
	status: CellStatus;
	rangeInfo: RangeInfo;
	classes: Record<string, boolean>;
}

export interface CalendarYearInfo {
	date: Date;
	name: string;
	isCurrent: boolean;
	status: CellStatus;
	rangeInfo: RangeInfo;
	classes: Record<string, boolean>;
}
