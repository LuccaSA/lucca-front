import { ELuDateGranularity, LuDateGranularity } from '@lucca-front/ng/core';
import { ICalendarItem } from './calendar-item.interface';

export abstract class ACalendarItem<D> implements ICalendarItem<D> {
	get id() {
		return `${this.granularity}-${this.date.toString()}`;
	}
	date: D;
	mods: string[] = [];
	isDisabled = false;
	label: string;
	readonly granularity: LuDateGranularity;
}
export class DayItem<D> extends ACalendarItem<D> implements ICalendarItem<D> {
	override readonly granularity = ELuDateGranularity.day;
	constructor(public override date: D, public override label: string) {
		super();
	}
}
export class MonthItem<D> extends ACalendarItem<D> implements ICalendarItem<D> {
	override readonly granularity = ELuDateGranularity.month;
	constructor(public override date: D, public override label: string) {
		super();
	}
}
export class YearItem<D> extends ACalendarItem<D> implements ICalendarItem<D> {
	override readonly granularity = ELuDateGranularity.year;
	constructor(public override date: D, public override label: string) {
		super();
	}
}
export class DecadeItem<D> extends ACalendarItem<D> implements ICalendarItem<D> {
	override readonly granularity = ELuDateGranularity.decade;
	constructor(public override date: D, public override label: string) {
		super();
	}
}
