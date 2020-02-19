import { DateGranularity } from './date-granularity.enum';

export interface ILuDateAdapter<D> {
	forge(year: number, month: number, date: number): D;
	forgeToday(): D;
	forgeInvalid(): D;
	isValid(d: D): boolean;
	compare(a: D, b: D, granularity: DateGranularity): number;
	isParsable(text: string): boolean;
	parse(text: string): D;
	format(d: D, format: string): string;
	clone(d: D): D;

	getYear(d: D): number;
	getMonth(d: D): number;
	getDate(d: D): number;
	getDay(d: D): number;
}
