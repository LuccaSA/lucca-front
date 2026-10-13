import { InjectionToken } from '@angular/core';
import { FilterPillHostComponent } from './filter-pill-host-component';
import { FilterPillInputComponent } from './filter-pill-input-component';

export const FILTER_PILL_INPUT_COMPONENT = new InjectionToken<FilterPillInputComponent>('FilterPills:InputComponent');

export const FILTER_PILL_HOST_COMPONENT = new InjectionToken<FilterPillHostComponent>('FilterPills:HostComponent');
