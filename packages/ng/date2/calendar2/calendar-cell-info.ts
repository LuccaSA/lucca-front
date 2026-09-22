import { CellStatus } from './cell-status';
import { DateRange } from './date-range';

export interface RangeInfo {
	range?: DateRange;
	/**
	 * Bound the range is anchored on: its start when it has one, its end otherwise.
	 * A range without start date is rendered from its end, the same way an incomplete
	 * range is rendered from its start.
	 */
	anchor: Date;
	isStart: boolean;
	isEnd: boolean;
	label?: string;
}

export interface CalendarCellInfo {
	day: number;
	week: number;
	date: Date;
	status: CellStatus;
	disabled: boolean;
	isWeekend: boolean;
	isCurrent: boolean;
	isOverflow: boolean;
	isSelected: boolean;
	noButton: boolean;
	label?: string;
	rangeInfo: RangeInfo | null;
	classes: Record<string, boolean>;
}

export interface CalendarMonthInfo {
	date: Date;
	short: string;
	long: string;
	isCurrent: boolean;
	status: CellStatus;
	rangeInfo: RangeInfo | null;
	classes: Record<string, boolean>;
}

export interface CalendarYearInfo {
	date: Date;
	name: string;
	isCurrent: boolean;
	status: CellStatus;
	rangeInfo: RangeInfo | null;
	classes: Record<string, boolean>;
}
