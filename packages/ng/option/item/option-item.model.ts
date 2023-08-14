import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

export interface ILuOptionItem<T> {
	value: T;
	onSelect: Observable<this>;
	element: ElementRef<HTMLElement>;
	selected: boolean;
	highlighted: boolean;
	disabled: boolean;
}
export abstract class ALuOptionItem<T> implements ILuOptionItem<T> {
	abstract value: T;
	abstract onSelect: Observable<this>;
	abstract element: ElementRef;
	abstract selected: boolean;
	abstract highlighted: boolean;
	abstract disabled: boolean;
}
