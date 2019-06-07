import { Observable } from 'rxjs';

export interface ILuOptionItem<T = any> {
	value: T;
	onSelect: Observable<this>;
}
export abstract class ALuOptionItem<T = any> implements ILuOptionItem<T> {
	value: T;
	onSelect: Observable<this>;
}
