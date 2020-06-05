import { Injectable, Inject, LOCALE_ID, Optional } from '@angular/core';
import { LuNativeDateAdapter } from '../native/index';
import { ALuDateAdapter } from '../date-adapter.class';
import { ELuDateGranularity } from '../date-granularity.enum';
import { ILuDateAdapter } from '../date-adapter.interface';
import { ILuStringDateAdapterOptions, LU_STRING_DATE_ADAPTER_OPTIONS, luDefaultStringDateAdapterOptions } from './string-date.option';

@Injectable()
export class LuStringDateAdapter extends ALuDateAdapter<string> implements ILuDateAdapter<string> {

	// i'm going to implement this by doing some inheritance by composition
	// i'll just use the native date adapter and just parse/format to interface it with a string

	private _nativeAdapter: LuNativeDateAdapter;
	constructor(
		@Inject(LOCALE_ID) private _locale: string,
		@Inject(LU_STRING_DATE_ADAPTER_OPTIONS) @Optional() private _options: ILuStringDateAdapterOptions,

	) {
		super();
		this._options = this._options || luDefaultStringDateAdapterOptions;
		this._nativeAdapter = new LuNativeDateAdapter(this._locale, { useUtc: this._options.useUtc });
	}

	protected stringToDate(s: string): Date {
		switch (this._options.timezone) {
			case 'z':
				return new Date(s);
			case 'none':
			default:
				if (this._options.useUtc) {
					return new Date(`${s}Z`);
				} else {
					return new Date(s);
				}
		}
	}
	protected dateToString(d: Date): string {
		let result: string;
		if (d === undefined) {
			result = undefined;
		} else if (!this._nativeAdapter.isValid(d)) {
			result = this.forgeInvalid();
		} else {
			switch (this._options.timezone) {
				case 'z':
					result = d.toISOString();
					break;
				case 'gmt':
					const gmtInfo = d.toString().match(/GMT(\+|-)\d{4}/i)[0];
					result = `${d.toISOString().substring(0, 23)}${gmtInfo.substring(3)}`;
					break;
				case 'none':
				default:
					result = d.toISOString().substring(0, 23);
					break;

			}
		}

		return result;
	}

	forge(year: number, month: number, date: number): string {
		return this.dateToString(this._nativeAdapter.forge(year, month, date))
	}
	forgeToday(): string {
		return this.dateToString(this._nativeAdapter.forgeToday())
	}
	forgeInvalid(): string {
		return 'Invalid Date';
	}
	isValid(d: string): boolean {
		return this._nativeAdapter.isValid(this.stringToDate(d));
	}
	compare(a: string, b: string, granularity: ELuDateGranularity): number {
		const da = this.stringToDate(a);
		const db = this.stringToDate(b);
		
		return this._nativeAdapter.compare(da, db, granularity);
	}
	isParsable(text: string): boolean {
		return this._nativeAdapter.isParsable(text);
	}
	parse(text: string): string {
		return this.dateToString(this._nativeAdapter.parse(text));
	}
	format(d: string, format: string): string {
		return this._nativeAdapter.format(this.stringToDate(d), format);
	}
	clone(d: string): string {
		return `${d}`;
	}
	getYear(d: string): number {
		return this._nativeAdapter.getYear(this.stringToDate(d));
	}
	getMonth(d: string): number {
		return this._nativeAdapter.getMonth(this.stringToDate(d));
	}
	getDate(d: string): number {
		return this._nativeAdapter.getDate(this.stringToDate(d));
	}
	getDay(d: string): number {
		return this._nativeAdapter.getDay(this.stringToDate(d));
	}
	add(d: string, count: number, granularity: ELuDateGranularity): string {
		return this.dateToString(this._nativeAdapter.add(this.stringToDate(d), count, granularity));
	}
}