import { InjectionToken, TemplateRef, Type } from '@angular/core';
import { LuOptionContext } from '@lucca-front/ng/core-select';
import { Observable } from 'rxjs';

export interface ILuMultiSelectPanelData<T> {
	options$: Observable<T[]>;
	loading$: Observable<boolean>;
	optionComparer: (option1: T, option2: T) => boolean;
	initialValue: T[] | undefined;
	optionTpl: TemplateRef<LuOptionContext<T>> | Type<unknown>;
	expanded: boolean;
}

export const MULTI_SELECT_PANEL_DATA = new InjectionToken<ILuMultiSelectPanelData<unknown>>('MultiSelectPanelData');
