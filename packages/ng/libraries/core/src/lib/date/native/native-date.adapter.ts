import { ALuDateAdapter } from '../date-adapter.class';
import { ELuDateGranularity } from '../date-granularity.enum';
import { ILuDateAdapter } from '../date-adapter.interface';
import { LOCALE_ID, Inject, Injectable, Optional } from '@angular/core';
import { getLocaleDateFormat, FormatWidth, formatDate } from '@angular/common';
import { ILuNativeDateAdapterOptions, LU_NATIVE_DATE_ADAPTER_OPTIONS, luDefaultNativeDateAdapterOptions } from './native-date.option';

@Injectable()
export class LuNativeDateAdapter extends ALuDateAdapter<Date> implements ILuDateAdapter<Date> {

	private _regex = /[\/\,\.\-\s]/i;
	private _order = {
		date: 0,
		month: 1,
		year: 2,
	};
	constructor(
		@Inject(LOCALE_ID) private _locale: string,
		@Inject(LU_NATIVE_DATE_ADAPTER_OPTIONS) @Optional() private _options: ILuNativeDateAdapterOptions,
	) {
		super();
		this._options = this._options || luDefaultNativeDateAdapterOptions;
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
	isParsable(text: string): boolean {
		if (!text) { return false; }
		const groups = text.split(this._regex);
		if (groups.length !== 3 && groups.length !== 2) { return false; }
		try {
			const date = parseInt(groups[this._order.date], 10);
			const month = parseInt(groups[this._order.month], 10);
			const year = parseInt(groups[this._order.year], 10) || new Date().getFullYear();
			let d : Date;
			if (this._options.useUtc) {
				d = new Date(Date.UTC(year, month - 1, date));
			} else {
				d = new Date(year, month - 1, date);
			}
			// checking if its a valid date
			// https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
			if (!(d instanceof Date)) { return false; }
			if (isNaN(d.getTime())) { return false; }
			// d is a valid date, but
			// as i can write new Date(1234, 56, 78) and mr javascript accepts it
			// i check now that the generated date has the same year/month/date as what i entered
			if (this._options.useUtc) {
				if (d.getUTCFullYear() % 100 !== year) { return false; }
				if (d.getUTCMonth() !== month - 1) { return false; }
				if (d.getUTCDate() !== date) { return false; }
			} else {
				if (d.getFullYear() % 100 !== year) { return false; }
				if (d.getMonth() !== month - 1) { return false; }
				if (d.getDate() !== date) { return false; }
			}

			return true;
		} catch {
			return false;
		}
	}
	parse(text: string): Date {
		if (!text) { return undefined; }
		if (!this.isParsable(text)) {
			this.forgeInvalid();
		}

		const groups = text.split(this._regex);
		const date = parseInt(groups[this._order.date], 10);
		const month = parseInt(groups[this._order.month], 10);
		const year = parseInt(groups[this._order.year], 10) || new Date().getFullYear();

		return this.forge(year, month, date);
	}
	format(d: Date, format: string): string {
		if (this._options.useUtc) {
			return formatDate(d, format, this._locale, 'UTC');
		} else {
			return formatDate(d, format, this._locale);
		}
	}
	forge(year: number, month: number, date: number): Date {
		if (this._options.useUtc) {
			return new Date(Date.UTC(year, month - 1, date)); // month-1 cuz 0 -> january
		} else {
			return new Date(year, month - 1, date); // month-1 cuz 0 -> january
		}
	}
	forgeToday(): Date {
		if (this._options.useUtc) {
			const nonUTCToday = new Date();
			return new Date(Date.UTC(nonUTCToday.getFullYear(), nonUTCToday.getMonth(), nonUTCToday.getDate()));
		} else {
			const today = new Date();
			return new Date(today.getFullYear(), today.getMonth(), today.getDate());
		}
	}
	forgeInvalid(): Date {
		return new Date('Invalid Date');
	}
	isValid(d: Date): boolean {
		if (!(d instanceof Date)) { return false; }
		if (isNaN(d.getTime())) { return false; }
		return true;
	}

	clone(d: Date): Date {
		return new Date(d);
	}

	getYear(d: Date): number {
		if (this._options.useUtc) {
			return d.getUTCFullYear();
		} else {
			return d.getFullYear();
		}
	}
	getMonth(d: Date): number {
		if (this._options.useUtc) {
			return d.getUTCMonth() + 1;
		} else {
			return d.getMonth() + 1;
		}
	}
	getDate(d: Date): number {
		if (this._options.useUtc) {
			return d.getUTCDate();
		} else {
			return d.getDate();
		}
	}
	getDay(d: Date): number {
		if (this._options.useUtc) {
			return d.getUTCDay();
		} else {
			return d.getDay();
		}
	}

	add(d: Date, count: number, granularity: ELuDateGranularity): Date {
		let year = this.getYear(d);
		let month = this.getMonth(d);
		let date = this.getDate(d);
		switch (granularity) {
			case ELuDateGranularity.decade:
				year += 10 * count;
				break;
			case ELuDateGranularity.year:
				year += count;
				break;
			case ELuDateGranularity.month:
				month += count;
				break;
			case ELuDateGranularity.day:
				date += count;
				break;
		}
		return this.forge(year, month, date);
	}

}
