import { Injectable } from '@angular/core';
import { ALuDateAdapter } from '@lucca-front/ng/core';
import { DayItem, DecadeItem, MonthItem, YearItem } from './calendar-item.class';

@Injectable()
export class LuCalendarItemFactory<D> {
	constructor(private _adapter: ALuDateAdapter<D>) {}
	forgeDay(d: D, format = 'd'): DayItem<D> {
		const date = this._adapter.clone(d);
		return new DayItem(date, this._adapter.format(date, format));
	}
	forgeMonth(d: D, format = 'MMM'): MonthItem<D> {
		const year = this._adapter.getYear(d);
		const month = this._adapter.getMonth(d);
		const monthStart = this._adapter.forge(year, month, 1);
		return new MonthItem(monthStart, this._adapter.format(monthStart, format));
	}
	forgeYear(d: D, format = 'y'): YearItem<D> {
		const year = this._adapter.getYear(d);
		const yearStart = this._adapter.forge(year, 1, 1);
		return new YearItem(yearStart, this._adapter.format(yearStart, format));
	}
	forgeDecade(d: D, format = 'y'): DecadeItem<D> {
		const year = this._adapter.getYear(d);
		const decadeStart = this._adapter.forge(10 * Math.floor(year / 10), 1, 1);
		const decadeEnd = this._adapter.forge(10 * Math.floor(year / 10) + 9, 1, 1);
		const label = `${this._adapter.format(decadeStart, format)} - ${this._adapter.format(decadeEnd, format)}`;
		return new DecadeItem(decadeStart, label);
	}
}
