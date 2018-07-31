import { Observable } from 'rxjs/Observable';
import { ViewRef } from '@angular/core';

export interface ILuOptionItem<T = any> {
	value: T;
	onSelect: Observable<T>;
	viewRef?: ViewRef;
}
export abstract class ALuOptionItem<T = any> implements ILuOptionItem<T> {
	value: T;
	onSelect: Observable<T>;
	viewRef?: ViewRef;
}
