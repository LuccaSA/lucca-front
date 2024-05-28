import { InjectionToken } from '@angular/core';
import type { LuSimpleSelectInputComponent } from './input';

export const SIMPLE_SELECT_INPUT = new InjectionToken<LuSimpleSelectInputComponent<unknown>>('SimpleSelectInput');
