import { ViewRef } from '@angular/core';

export interface ILuInputDisplayer<T> {
	multiple: boolean;
	getViewRef(value: T | T[]): ViewRef;
}
export abstract class ALuInputDisplayer<T> implements ILuInputDisplayer<T> {
	multiple = false;
	abstract getViewRef(value: T | T[]): ViewRef;
}
