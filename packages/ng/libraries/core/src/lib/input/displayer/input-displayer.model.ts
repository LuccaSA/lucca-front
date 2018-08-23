import { ViewRef, ElementRef } from '@angular/core';

export interface ILuInputDisplayer<T = any> {
	getViewRef(value: T): ViewRef;
}
export abstract class ALuInputDisplayer<T = any> implements ILuInputDisplayer<T> {
	abstract getViewRef(value: T): ViewRef;
}
