import { Observable } from 'rxjs';

export interface ILuOptionOperator<T> {
	inOptions$?: Observable<T[]>;
	outOptions$?: Observable<T[]>;
}
export abstract class ALuOptionOperator<T> implements ILuOptionOperator<T> {
	abstract inOptions$?: Observable<T[]>;
	abstract outOptions$?: Observable<T[]>;
}
