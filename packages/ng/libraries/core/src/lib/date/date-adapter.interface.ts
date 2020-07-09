import { ELuDateGranularity } from './date-granularity.enum';

export interface ILuDateAdapter<D> {
	forge(year: number, month: number, date: number): D;
	forgeToday(): D;
	forgeInvalid(): D;
	isValid(d: D): boolean;
	compare(a: D, b: D, granularity: ELuDateGranularity): number;
	isParsable(text: string, granularity?: ELuDateGranularity): boolean;
	parse(text: string, granularity?: ELuDateGranularity): D;
	format(d: D, format: string): string;
	clone(d: D): D;

	getYear(d: D): number;
	getMonth(d: D): number;
	getDate(d: D): number;
	getDay(d: D): number;

	add(d: D, count: number, granularity: ELuDateGranularity): D;
}
