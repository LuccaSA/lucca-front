import { ILuOptionItem } from '../item/index';
import { Observable } from 'rxjs/Observable';

export interface ILuOptionOperator<T = any> {
	inOptions$?: Observable<T[]>;
	outOptions$?: Observable<T[]>;
}
export abstract class ALuOptionOperator<T = any> implements ILuOptionOperator<T> {
	inOptions$?: Observable<T[]>;
	outOptions$?: Observable<T[]>;
}
