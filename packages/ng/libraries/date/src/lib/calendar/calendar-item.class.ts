import { ICalendarItem, CalendarGranularity } from './calendar-item.interface';

export abstract class ACalendarItem implements ICalendarItem {
	get id() { return `${this.granularity}-${this.date.toISOString()}`; }
	date: Date;
	mods: string[] = [];
	label: string;
	readonly granularity: CalendarGranularity;
}
export class DayItem extends ACalendarItem implements ICalendarItem {
	readonly granularity = CalendarGranularity.day;
	constructor(
		public date: Date,
		public label: string,
	) {
		super();
	}
}
export class MonthItem extends ACalendarItem implements ICalendarItem {
	readonly granularity = CalendarGranularity.month;
	constructor(
		public date: Date,
		public label: string,
	) {
		super();
	}
}
export class YearItem extends ACalendarItem implements ICalendarItem {
	readonly granularity = CalendarGranularity.year;
	constructor(
		public date: Date,
		public label: string,
		) {
		super();
	}
}
export class DecadeItem extends ACalendarItem implements ICalendarItem {
	readonly granularity = CalendarGranularity.decade;
	constructor(
		public date: Date,
		public label: string,
		) {
		super();
	}
}
