import { Observable } from 'rxjs';
import { ElementRef } from '@angular/core';

export interface ILuOptionItem<T = any> {
	value: T;
	onSelect: Observable<this>;
	element: ElementRef;
	selected: boolean;
	highlighted: boolean;
}
export abstract class ALuOptionItem<T = any> implements ILuOptionItem<T> {
	abstract value: T;
	abstract onSelect: Observable<this>;
	abstract element: ElementRef;
	abstract selected: boolean;
	abstract highlighted: boolean;
}
