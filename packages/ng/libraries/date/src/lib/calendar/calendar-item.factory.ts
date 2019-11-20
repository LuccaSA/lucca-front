import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { DayItem, MonthItem, YearItem, DecadeItem } from './calendar-item.class';

@Injectable()
export class LuCalendarItemFactory {
	constructor(
		@Inject(LOCALE_ID) private _locale: string,
	) {}
	forgeDay(date: Date, format = 'd'): DayItem {
		return new DayItem(date, formatDate(date, format, this._locale));
	}
	forgeMonth(date: Date, format = 'MMM'): MonthItem {
		date.setDate(1);
		return new MonthItem(date, formatDate(date, format, this._locale));
	}
	forgeYear(date: Date, format = 'y'): YearItem {
		date.setMonth(0);
		date.setDate(1);
		return new YearItem(date, formatDate(date, format, this._locale));
	}
	forgeDecade(date: Date, format = 'y'): DecadeItem {
		date.setMonth(0);
		date.setDate(1);
		date.setFullYear(10 * Math.floor(date.getFullYear() / 10));
		const decadeEnd = new Date(date);
		decadeEnd.setFullYear(date.getFullYear() + 9);
		const label = `${formatDate(date, format, this._locale)} - ${formatDate(decadeEnd, format, this._locale)}`;
		return new DecadeItem(date, label);
	}
}
