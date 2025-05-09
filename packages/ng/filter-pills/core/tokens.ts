import { InjectionToken } from '@angular/core';
import { FilterPillInputComponent } from './filter-pill-input-component';
import { FilterPillComponent } from '../filter-pill/filter-pill.component';

export const FILTER_PILL_INPUT_COMPONENT = new InjectionToken<FilterPillInputComponent>('FilterPills:InputComponent');

export const FILTER_PILL_HOST_COMPONENT = new InjectionToken<FilterPillComponent>('FilterPills:HostComponent');
