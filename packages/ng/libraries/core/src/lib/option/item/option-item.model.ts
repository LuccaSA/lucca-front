import { Observable } from 'rxjs/Observable';

export interface ILuOptionItem<T = any> {
	onSelect: Observable<T>;
}
export abstract class ALuOptionItem<T = any> implements ILuOptionItem<T> {
	onSelect: Observable<T>;
}
