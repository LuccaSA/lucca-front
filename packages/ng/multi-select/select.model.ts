import { Injectable, InjectionToken } from '@angular/core';
import { LuOptionComparer } from '@lucca-front/ng/core-select';
import type { LuMultiSelectInputComponent } from './input';

export const MULTI_SELECT_INPUT = new InjectionToken<LuMultiSelectInputComponent<unknown>>('MultiSelectInput');

export type LuMultiSelection<T> = { mode: 'include'; values: T[] } | { mode: 'exclude'; values: T[] } | { mode: 'none' } | { mode: 'all' };

export type LuMultiSelectionMode = LuMultiSelection<unknown>['mode'];

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
