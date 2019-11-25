import { ICalendarItem, CalendarGranularity } from './calendar-item.interface';

export abstract class ACalendarItem<D> implements ICalendarItem<D> {
	get id() { return `${this.granularity}-${this.date.toString()}`; }
	date: D;
	mods: string[] = [];
	label: string;
	readonly granularity: CalendarGranularity;
}
export class DayItem<D> extends ACalendarItem<D> implements ICalendarItem<D> {
	readonly granularity = CalendarGranularity.day;
	constructor(
		public date: D,
		public label: string,
	) {
		super();
	}
}
export class MonthItem<D> extends ACalendarItem<D> implements ICalendarItem<D> {
	readonly granularity = CalendarGranularity.month;
	constructor(
		public date: D,
		public label: string,
	) {
		super();
	}
}
export class YearItem<D> extends ACalendarItem<D> implements ICalendarItem<D> {
	readonly granularity = CalendarGranularity.year;
	constructor(
		public date: D,
		public label: string,
		) {
		super();
	}
}
export class DecadeItem<D> extends ACalendarItem<D> implements ICalendarItem<D> {
	readonly granularity = CalendarGranularity.decade;
	constructor(
		public date: D,
		public label: string,
		) {
		super();
	}
}
