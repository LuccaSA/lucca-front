import { InjectionToken, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export interface ILuSelectPanelData<T> {
	options$: Observable<T[]>;
	optionComparer: (option1: T, option2: T) => boolean;
	initialValue: T | undefined;
	optionTpl: TemplateRef<{ $implicit: T }>;
	searchable: boolean;
}

export const SELECT_ID = new InjectionToken<number>('LuSelectPanelData');
export const SELECT_PANEL_DATA = new InjectionToken<number>('LuSelectId');
export const SELECT_LABEL = new InjectionToken<HTMLLabelElement | undefined>('LuSelectLabel');
export const SELECT_LABEL_ID = new InjectionToken<string>('LuSelectLabelId');
