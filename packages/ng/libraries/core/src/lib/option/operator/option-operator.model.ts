import { ILuOptionItem } from '../item/index';
import { Observable } from 'rxjs/Observable';

export interface ILuOptionOperator<T = any> {
	inOptions$?: Observable<ILuOptionItem<T>[]>;
	outOptions$?: Observable<ILuOptionItem<T>[]>;
}
export abstract class ALuOptionOperator<T = any> implements ILuOptionOperator<T> {
	inOptions$?: Observable<ILuOptionItem<T>[]>;
	outOptions$?: Observable<ILuOptionItem<T>[]>;
}
