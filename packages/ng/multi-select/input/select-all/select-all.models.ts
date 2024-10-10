import { InjectionToken, Signal } from '@angular/core';
import { LuMultiSelectWithSelectAllMode } from '../../select.model';

export interface LuMultiSelectWithSelectAllContext {
	selectAll: Signal<boolean>;
	setSelectAll(value: boolean): void;
	mode: Signal<LuMultiSelectWithSelectAllMode>;
	values: Signal<unknown[]>;
	displayerLabel: Signal<string>;
	totalCount: Signal<number>;
}

export const MULTI_SELECT_WITH_SELECT_ALL_CONTEXT = new InjectionToken<LuMultiSelectWithSelectAllContext>('LuMultiSelectWithSelectAllContext');
