import { DateRange } from './date-range';
import { CellStatus } from './cell-status';

export interface CalendarDayInfo {
	day: number;
	isWeekend: boolean;
	isOverflow: boolean;
	date: Date;
	status: CellStatus;
	isCurrent: boolean;
	classes: string[];
	rangeInfo: {
		range?: DateRange;
		isStart: boolean;
		isEnd: boolean;
		label?: string;
	};
}
