import { Injectable, InjectionToken } from '@angular/core';
import { LuOptionComparer } from '@lucca-front/ng/core-select';
import type { LuMultiSelectInputComponent } from './input';

export const MULTI_SELECT_INPUT = new InjectionToken<LuMultiSelectInputComponent<unknown>>('MultiSelectInput');
@Injectable({
	providedIn: 'root',
	useFactory: () => new DefaultIsSelectedStrategy(),
})
export abstract class ɵIsSelectedStrategy<TOption> {
	abstract isSelected(option: TOption, selectedOptions: TOption[], optionComparer: LuOptionComparer<TOption>): boolean;
}

class DefaultIsSelectedStrategy<TOption> extends ɵIsSelectedStrategy<TOption> {
	isSelected(option: TOption, selectedOptions: TOption[], optionComparer: LuOptionComparer<TOption>): boolean {
		return selectedOptions.some((o) => optionComparer(o, option));
	}
}
