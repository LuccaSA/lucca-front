import { InjectionToken, TemplateRef, Type } from '@angular/core';
import { Observable } from 'rxjs';

export interface ILuSelectPanelData<T> {
	options$: Observable<T[]>;
	loading$: Observable<boolean>;
	optionComparer: (option1: T, option2: T) => boolean;
	initialValue: T | undefined;
	optionTpl: TemplateRef<LuOptionContext<T>> | Type<unknown>;
	searchable: boolean;
}

export interface LuOptionContext<T> {
	$implicit: T;
}

export const SELECT_ID = new InjectionToken<number>('LuSelectPanelData');
export const SELECT_PANEL_DATA = new InjectionToken<unknown>('LuSelectId');
export const SELECT_LABEL = new InjectionToken<HTMLLabelElement | undefined>('LuSelectLabel');
export const SELECT_LABEL_ID = new InjectionToken<string>('LuSelectLabelId');
