import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { ALuDateAdapter } from '../date-adapter.class';
import { ILuDateAdapter } from '../date-adapter.interface';
import { LuDateGranularity } from '../date-granularity.enum';
import { LuNativeDateAdapter } from '../native/index';

/** bind to a string with iso 26001 format YYYY-MM-DD */
@Injectable()
export class LuStringDateAdapter extends ALuDateAdapter<string> implements ILuDateAdapter<string> {
	// i'm going to implement this by doing some inheritance by composition
	// i'll just use the native date adapter and just parse/format to interface it with a string

	private _nativeAdapter: LuNativeDateAdapter;

	constructor(@Inject(LOCALE_ID) private _locale: string) {
		super();
		this._nativeAdapter = new LuNativeDateAdapter(this._locale, {
			useUtc: true,
		});
	}

	forge(year: number, month: number, date: number): string {
		return this.dateToString(this._nativeAdapter.forge(year, month, date));
	}

	forgeToday(): string {
		return this.dateToString(this._nativeAdapter.forgeToday());
	}

	forgeInvalid(): string {
		return 'Invalid Date';
	}

	isValid(d: string): boolean {
		return this._nativeAdapter.isValid(this.stringToDate(d));
	}

	override compare(a: string, b: string, granularity: LuDateGranularity): number {
		const da = this.stringToDate(a);
		const db = this.stringToDate(b);

		return this._nativeAdapter.compare(da, db, granularity);
	}

	isParsable(text: string): boolean {
		return this._nativeAdapter.isParsable(text);
	}

	parse(text: string, granularity: LuDateGranularity): string {
		return this.dateToString(this._nativeAdapter.parse(text, granularity));
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

	add(d: string, count: number, granularity: LuDateGranularity): string {
		return this.dateToString(this._nativeAdapter.add(this.stringToDate(d), count, granularity));
	}

	protected stringToDate(s: string): Date {
		return new Date(`${s}T00:00:00Z`);
	}

	protected dateToString(d: Date): string {
		let result: string;

		if (d === undefined) {
			result = undefined;
		} else if (!this._nativeAdapter.isValid(d)) {
			result = this.forgeInvalid();
		} else {
			result = d.toISOString().substring(0, 10);
		}

		return result;
	}
}
