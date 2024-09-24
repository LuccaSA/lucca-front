import { InjectionToken, Signal } from '@angular/core';
import { Calendar2DCellDirective } from './calendar2-day.directive';

export const CALENDAR_CELLS = new InjectionToken<Signal<Calendar2DCellDirective[]>>('Calendar2:Calendar2Cells');
