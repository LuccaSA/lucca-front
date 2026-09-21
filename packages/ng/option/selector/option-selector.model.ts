import { Observable } from 'rxjs';

export interface ILuOptionSelector<T> {
	multiple: boolean;
	onSelectValue: Observable<T | T[]>;
	setValue(value: T | T[] | undefined): void;
}
export abstract class ALuOptionSelector<T> implements ILuOptionSelector<T> {
	multiple: boolean;
	abstract onSelectValue: Observable<T | T[]>;
	abstract setValue(value: T | T[] | undefined): void;
}
