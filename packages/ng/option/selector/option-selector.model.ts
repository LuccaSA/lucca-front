import { Observable } from 'rxjs';

export interface ILuOptionSelector<T> {
	multiple: boolean;
	onSelectValue: Observable<T | readonly T[]>;
	setValue(value: T | readonly T[]): void;
}
export abstract class ALuOptionSelector<T> implements ILuOptionSelector<T> {
	multiple: boolean;
	abstract onSelectValue: Observable<T | readonly T[]>;
	abstract setValue(value: T | readonly T[]): void;
}
