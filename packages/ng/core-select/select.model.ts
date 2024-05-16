import { InjectionToken } from '@angular/core';

export interface LuOptionContext<T> {
	$implicit: T;
}

export interface LuOptionGroupByContext<T, TGroup> {
	$implicit: LuOptionGroup<T, TGroup>;
}

export interface LuOptionGroup<T, TGroup> {
	key: TGroup;
	options: T[];
}

export type CoreSelectAddOptionStrategy = 'never' | 'always' | 'if-empty-clue' | 'if-not-empty-clue';

export const SELECT_ID = new InjectionToken<number>('LuSelectPanelData');
export const SELECT_LABEL = new InjectionToken<HTMLLabelElement | undefined>('LuSelectLabel');
export const SELECT_LABEL_ID = new InjectionToken<string>('LuSelectLabelId');
