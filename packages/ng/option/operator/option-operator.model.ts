import { Observable } from 'rxjs';

export interface ILuOptionOperator<T> {
	inOptions$?: Observable<T[] | readonly T[]>;
	outOptions$?: Observable<T[] | readonly T[]>;
}
export abstract class ALuOptionOperator<T> implements ILuOptionOperator<T> {
	abstract inOptions$?: Observable<T[]>;
	abstract outOptions$?: Observable<T[]>;
}
