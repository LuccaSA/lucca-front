import { Observable } from 'rxjs';

export interface ILuOptionOperator<T = any> {
	inOptions$?: Observable<T[]>;
	outOptions$?: Observable<T[]>;
}
export abstract class ALuOptionOperator<T = any>
	implements ILuOptionOperator<T>
{
	abstract inOptions$?: Observable<T[]>;
	abstract outOptions$?: Observable<T[]>;
}
