import { ICalendarItem } from './calendar-item.interface';
import { ELuDateGranularity } from '@lucca-front/ng/core';

export abstract class ACalendarItem<D> implements ICalendarItem<D> {
	get id() { return `${this.granularity}-${this.date.toString()}`; }
	date: D;
	mods: string[] = [];
	isDisabled: boolean = false;
	label: string;
	readonly granularity: ELuDateGranularity;
}
export class DayItem<D> extends ACalendarItem<D> implements ICalendarItem<D> {
	readonly granularity = ELuDateGranularity.day;
	constructor(
		public date: D,
		public label: string,
	) {
		super();
	}
}
export class MonthItem<D> extends ACalendarItem<D> implements ICalendarItem<D> {
	readonly granularity = ELuDateGranularity.month;
	constructor(
		public date: D,
		public label: string,
	) {
		super();
	}
}
export class YearItem<D> extends ACalendarItem<D> implements ICalendarItem<D> {
	readonly granularity = ELuDateGranularity.year;
	constructor(
		public date: D,
		public label: string,
		) {
		super();
	}
}
export class DecadeItem<D> extends ACalendarItem<D> implements ICalendarItem<D> {
	readonly granularity = ELuDateGranularity.decade;
	constructor(
		public date: D,
		public label: string,
		) {
		super();
	}
}
