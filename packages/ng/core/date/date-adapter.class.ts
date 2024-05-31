import { ILuDateAdapter } from './date-adapter.interface';
import { ELuDateGranularity, LuDateGranularity } from './date-granularity.enum';

export abstract class ALuDateAdapter<D> implements ILuDateAdapter<D> {
	abstract forge(year: number, month: number, date: number): D;
	abstract forgeToday(): D;
	abstract forgeInvalid(): D;
	abstract isValid(d: D): boolean;
	compare(a: D, b: D, granularity: LuDateGranularity): number {
		if (!a || !b || !this.isValid(a) || !this.isValid(b)) {
			throw new Error('you must provide valid and not null dates to be compared');
		}
		const aDecade = Math.floor(this.getYear(a) / 10);
		const bDecade = Math.floor(this.getYear(b) / 10);
		if (aDecade < bDecade) {
			return -1;
		}
		if (aDecade > bDecade) {
			return 1;
		}
		if (granularity === ELuDateGranularity.decade) {
			return 0;
		}

		const aYear = this.getYear(a);
		const bYear = this.getYear(b);
		if (aYear < bYear) {
			return -1;
		}
		if (aYear > bYear) {
			return 1;
		}
		if (granularity === ELuDateGranularity.year) {
			return 0;
		}

		const aMonth = this.getMonth(a);
		const bMonth = this.getMonth(b);
		if (aMonth < bMonth) {
			return -1;
		}
		if (aMonth > bMonth) {
			return 1;
		}
		if (granularity === ELuDateGranularity.month) {
			return 0;
		}

		const aDate = this.getDate(a);
		const bDate = this.getDate(b);
		if (aDate < bDate) {
			return -1;
		}
		if (aDate > bDate) {
			return 1;
		}
		if (granularity === ELuDateGranularity.day) {
			return 0;
		}

		return 0;
	}
	abstract isParsable(text: string, granularity?: LuDateGranularity): boolean;
	abstract parse(text: string, granularity?: LuDateGranularity): D;
	abstract format(d: D, format: string): string;
	abstract clone(d: D): D;

	abstract getYear(d: D): number;
	abstract getMonth(d: D): number;
	abstract getDate(d: D): number;
	abstract getDay(d: D): number;

	abstract add(d: D, count: number, granularity: LuDateGranularity): D;
}
