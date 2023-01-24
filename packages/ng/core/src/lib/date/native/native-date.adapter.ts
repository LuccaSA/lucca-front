import { formatDate, FormatWidth, getLocaleDateFormat } from '@angular/common';
import { Inject, Injectable, LOCALE_ID, Optional } from '@angular/core';
import { ALuDateAdapter } from '../date-adapter.class';
import { ILuDateAdapter } from '../date-adapter.interface';
import { ELuDateGranularity } from '../date-granularity.enum';
import { ILuNativeDateAdapterOptions, luDefaultNativeDateAdapterOptions, LU_NATIVE_DATE_ADAPTER_OPTIONS } from './native-date.option';

@Injectable()
export class LuNativeDateAdapter extends ALuDateAdapter<Date> implements ILuDateAdapter<Date> {
	private _regex = /[/,.\-\s]/i;
	private _order = {
		date: 0,
		month: 1,
		year: 2,
	};
	constructor(
		@Inject(LOCALE_ID) private _locale: string,
		@Inject(LU_NATIVE_DATE_ADAPTER_OPTIONS)
		@Optional()
		private _options: ILuNativeDateAdapterOptions,
	) {
		super();
		this._options = this._options || luDefaultNativeDateAdapterOptions;
		this.initOrder();
	}
	private initOrder() {
		const format = getLocaleDateFormat(this._locale, FormatWidth.Short);
		const groups = format.split(this._regex);
		groups.forEach((g, i) => {
			if (g.indexOf('d') !== -1) {
				this._order.date = i;
			}
			if (g.indexOf('M') !== -1) {
				this._order.month = i;
			}
			if (g.indexOf('y') !== -1) {
				this._order.year = i;
			}
		});
	}
	private extract(text: string, granularity: ELuDateGranularity = ELuDateGranularity.day): { date: number; month: number; year: number } {
		const groups = text.split(this._regex);
		let date = 1,
			month = 1,
			year = 1;
		switch (granularity) {
			case ELuDateGranularity.year:
				year = parseInt(groups[Math.max(this._order.year - 2, 0)], 10);
				break;
			case ELuDateGranularity.month:
				month = parseInt(groups[Math.max(this._order.month - 1, 0)], 10);
				year = parseInt(groups[Math.max(this._order.year - 1, 0)], 10) || new Date().getFullYear();
				break;
			case ELuDateGranularity.day:
			default:
				date = parseInt(groups[this._order.date], 10);
				month = parseInt(groups[this._order.month], 10);
				year = parseInt(groups[this._order.year], 10) || new Date().getFullYear();
		}
		return { date, month, year };
	}
	isParsable(text: string, granularity = ELuDateGranularity.day): boolean {
		if (!text) {
			return false;
		}
		const groups = text.split(this._regex);
		if (groups.length !== 3 && groups.length !== 2) {
			return false;
		}
		try {
			const { date, month, year } = this.extract(text, granularity);

			// When year is greater than 10_000 ISO string goes from 2000-01-01 to +010000-01-01 which is not supported by backends
			if (year > 10_000) {
				return false;
			}

			let d: Date;
			if (this._options.useUtc) {
				d = new Date(Date.UTC(year, month - 1, date));
			} else {
				d = new Date(year, month - 1, date);
			}
			// checking if its a valid date
			// https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript
			if (!(d instanceof Date)) {
				return false;
			}
			if (isNaN(d.getTime())) {
				return false;
			}
			// d is a valid date, but
			// as i can write new Date(1234, 56, 78) and mr javascript accepts it
			// i check now that the generated date has the same year/month/date as what i entered
			if (this._options.useUtc) {
				if (d.getUTCFullYear() !== year) {
					return false;
				}
				if (d.getUTCMonth() !== month - 1) {
					return false;
				}
				if (d.getUTCDate() !== date) {
					return false;
				}
			} else {
				if (d.getFullYear() !== year) {
					return false;
				}
				if (d.getMonth() !== month - 1) {
					return false;
				}
				if (d.getDate() !== date) {
					return false;
				}
			}

			return true;
		} catch {
			return false;
		}
	}
	parse(text: string, granularity = ELuDateGranularity.day): Date {
		if (!text) {
			return undefined;
		}
		if (!this.isParsable(text, granularity)) {
			return this.forgeInvalid();
		}

		const { date, month, year } = this.extract(text, granularity);

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
		if (!(d instanceof Date)) {
			return false;
		}
		if (isNaN(d.getTime())) {
			return false;
		}
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
