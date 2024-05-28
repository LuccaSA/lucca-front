import { InjectionToken } from '@angular/core';
import type { LuMultiSelectInputComponent } from './input';

export const MULTI_SELECT_INPUT = new InjectionToken<LuMultiSelectInputComponent<unknown>>('MultiSelectInput');
