import { ICalendarItem } from './calendar-item.interface';
import { DateGranularity } from '../adapter/index';

export abstract class ACalendarItem<D> implements ICalendarItem<D> {
	get id() { return `${this.granularity}-${this.date.toString()}`; }
	date: D;
	mods: string[] = [];
	label: string;
	readonly granularity: DateGranularity;
}
export class DayItem<D> extends ACalendarItem<D> implements ICalendarItem<D> {
	readonly granularity = DateGranularity.day;
	constructor(
		public date: D,
		public label: string,
	) {
		super();
	}
}
export class MonthItem<D> extends ACalendarItem<D> implements ICalendarItem<D> {
	readonly granularity = DateGranularity.month;
	constructor(
		public date: D,
		public label: string,
	) {
		super();
	}
}
export class YearItem<D> extends ACalendarItem<D> implements ICalendarItem<D> {
	readonly granularity = DateGranularity.year;
	constructor(
		public date: D,
		public label: string,
		) {
		super();
	}
}
export class DecadeItem<D> extends ACalendarItem<D> implements ICalendarItem<D> {
	readonly granularity = DateGranularity.decade;
	constructor(
		public date: D,
		public label: string,
		) {
		super();
	}
}
