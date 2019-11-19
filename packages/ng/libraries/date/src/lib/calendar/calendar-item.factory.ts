import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { DayItem, MonthItem, YearItem } from './calendar-item.class';

@Injectable()
export class LuCalendarItemFactory {
	constructor(
		@Inject(LOCALE_ID) private _locale: string,
	) {}
	forgeDay(date: Date): DayItem {
		return new DayItem(date, formatDate(date, 'd', this._locale));
	}
	forgeMonth(date: Date): MonthItem {
		return new MonthItem(date, formatDate(date, 'MMM', this._locale));
	}
	forgeYear(date: Date): YearItem {
		return new YearItem(date, formatDate(date, 'y', this._locale));
	}
}
