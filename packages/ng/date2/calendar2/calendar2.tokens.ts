import { InjectionToken, Signal } from '@angular/core';
import { Calendar2DayDirective } from './calendar2-day.directive';

export const CALENDAR_DAYS = new InjectionToken<Signal<Calendar2DayDirective[]>>('Calendar2:Calendar2Days');
