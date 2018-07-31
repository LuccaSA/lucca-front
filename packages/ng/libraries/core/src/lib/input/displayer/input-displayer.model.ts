import { ViewRef, ElementRef } from '@angular/core';

export interface ILuInputDisplayer<T = any> {
	getViewRef(value: T): ViewRef;
	getElementRef(value: T): ElementRef;
}
export abstract class ALuInputDisplayer<T = any> implements ILuInputDisplayer<T> {
	abstract getViewRef(value: T): ViewRef;
	abstract getElementRef(value: T): ElementRef;
}
