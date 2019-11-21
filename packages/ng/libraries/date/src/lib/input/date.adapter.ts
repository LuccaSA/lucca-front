import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { getLocaleDateFormat, FormatWidth } from '@angular/common';

@Injectable()
export class LuDateAdapter {
	private _regex = /[\/\,\.\-\s]/i;
	private _order = {
		date: 0,
		month: 1,
		year: 2,
	};
	constructor(
		@Inject(LOCALE_ID) private _locale: string,
	) {
		this.initOrder();
	}
	private initOrder() {
		const format = getLocaleDateFormat(this._locale, FormatWidth.Short);
		const groups = format.split(this._regex);
		groups.forEach((g, i) => {
			if (g.indexOf('d') !== -1) { return this._order.date = i; }
			if (g.indexOf('M') !== -1) { return this._order.month = i; }
			if (g.indexOf('y') !== -1) { return this._order.year = i; }
		});
	}
	isValidText(text: string): boolean {
		if (!text) { return false; }
		const groups = text.split(this._regex);
		if (groups.length !== 3) { return false; }
		try {
			const date = parseInt(groups[this._order.date], 10);
			const month = parseInt(groups[this._order.month], 10);
			const year = parseInt(groups[this._order.year], 10);
			const d = new Date(year, month - 1, date);
			// checking if its a valid date
			// https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
			if (!(d instanceof Date)) { return false; }
			if (isNaN(d.getTime())) { return false; }
			// d is a valid date, but
			// as i can write new Date(1234, 56, 78) and mr javascript accepts it
			// i check now that the generated date has the same year/month/date as what i entered
			// if (d.getFullYear() !== year && d.getYear() !== year) { return false; } // getYear doesn't exist anymore
			if (d.getMonth() !== month - 1) { return false; }
			if (d.getDate() !== date) { return false; }
			return true;
		} catch {
			return false;
		}
	}
	parseText(text: string): Date {
		if (!this.isValidText(text)) {
			return undefined;
		}
		const groups = text.split(this._regex);
		const date = parseInt(groups[this._order.date], 10);
		const month = parseInt(groups[this._order.month], 10);
		const year = parseInt(groups[this._order.year], 10);
		return new Date(year, month - 1, date); // month-1 cuz 0 -> january
	}
}
