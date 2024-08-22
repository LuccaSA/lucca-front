import { InjectionToken, Signal, WritableSignal } from '@angular/core';
import { LuMultiSelectWithSelectAllMode } from '../../select.model';

export interface LuMultiSelectWithSelectAllContext {
	selectAll: WritableSignal<boolean>;
	mode: Signal<LuMultiSelectWithSelectAllMode>;
	values: Signal<unknown[]>;
	displayerLabel: Signal<string>;
}

export const MULTI_SELECT_WITH_SELECT_ALL_CONTEXT = new InjectionToken<LuMultiSelectWithSelectAllContext>('LuMultiSelectWithSelectAllContext');
