import { ViewRef } from '@angular/core';

export interface ILuInputDisplayer<T = any> {
	multiple: boolean;
	getViewRef(value: T | T[]): ViewRef;
}
export abstract class ALuInputDisplayer<T = any> implements ILuInputDisplayer<T> {
	multiple = false;
	abstract getViewRef(value: T | T[]): ViewRef;
}
