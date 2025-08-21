import { InjectionToken } from '@angular/core';
import type { LuMultiSelectInputComponent } from './input';

export const MULTI_SELECT_INPUT = new InjectionToken<LuMultiSelectInputComponent<unknown>>('MultiSelectInput');

export type LuMultiSelection<T> = { mode: 'include'; values: T[] } | { mode: 'exclude'; values: T[] } | { mode: 'none' } | { mode: 'all' };

export type LuMultiSelectionMode = LuMultiSelection<unknown>['mode'];
