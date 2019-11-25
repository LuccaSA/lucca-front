import { ILuDateAdapter } from './date-adapter.interface';
import { DateGranularity } from './date-granularity.enum';

export abstract class ALuDateAdapter<D> implements ILuDateAdapter<D> {
	abstract forge(year: number, month: number, date: number): D;
	abstract forgeInvalid(): D;
	abstract isValid(d: D): boolean;
	abstract compare(a: D, b: D, granularity: DateGranularity): number;
	abstract isParsable(text: string): boolean;
	abstract parse(text: string): D;
	abstract format(d: D, format: string): string;
}
