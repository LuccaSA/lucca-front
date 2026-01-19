import { Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

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

export type LuOptionComparer<T> = (a: T, b: T) => boolean;

export type CoreSelectAddOptionStrategy = 'never' | 'always' | 'if-empty-clue' | 'if-not-empty-clue';

export const SELECT_ID = new InjectionToken<number>('LuSelectPanelData');
export const SELECT_LABEL = new InjectionToken<HTMLLabelElement | undefined>('LuSelectLabel');
export const SELECT_LABEL_ID = new InjectionToken<string>('LuSelectLabelId');

export interface CoreSelectApiTotalCountProvider {
	totalCount$: Observable<number>;
}

export const CORE_SELECT_API_TOTAL_COUNT_PROVIDER = new InjectionToken<CoreSelectApiTotalCountProvider>('CoreSelectApiTotalCountProvider');

@Injectable({
	providedIn: 'root',
	useFactory: () => new DefaultIsSelectedStrategy(),
})
export abstract class ɵIsSelectedStrategy<TOption> {
	abstract isSelected(option: TOption, selectedOptions: TOption[], optionComparer: LuOptionComparer<TOption>): boolean;
	abstract isGroupSelected(options: TOption[], notSelectedOptions: TOption[]): boolean;
}

class DefaultIsSelectedStrategy<TOption> extends ɵIsSelectedStrategy<TOption> {
	isSelected(option: TOption, selectedOptions: TOption[], optionComparer: LuOptionComparer<TOption>): boolean {
		return selectedOptions.some((o) => optionComparer(o, option));
	}

	isGroupSelected(options: TOption[], notSelectedOptions: TOption[]): boolean {
		return !notSelectedOptions.length && notSelectedOptions.length !== options.length;
	}
}
