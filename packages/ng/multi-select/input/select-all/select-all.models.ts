import { InjectionToken, Signal } from '@angular/core';
import { LuMultiSelectionMode } from '../../select.model';
import { ILuMultiSelectLabel } from '../../select.translate';

export interface LuMultiSelectWithSelectAllContext {
	setSelectAll(value: boolean): void;
	mode: Signal<LuMultiSelectionMode>;
	values: Signal<unknown[]>;
	displayerLabel: Signal<string>;
	totalCount: Signal<number>;
	displayerCount: Signal<number>;
	intl: Signal<ILuMultiSelectLabel>;
}

export const MULTI_SELECT_WITH_SELECT_ALL_CONTEXT = new InjectionToken<LuMultiSelectWithSelectAllContext>('LuMultiSelectWithSelectAllContext');
