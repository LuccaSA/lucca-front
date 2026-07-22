import { InjectionToken, Signal, WritableSignal } from '@angular/core';
import { CalendarMode } from './calendar-mode';
import { Calendar2CellDirective } from './calendar2-cell.directive';

export const CALENDAR_CELLS = new InjectionToken<Signal<Calendar2CellDirective[]>>('Calendar2:Calendar2Cells');
export const CALENDAR_TABBABLE_DATE = new InjectionToken<WritableSignal<Date>>('Calendar2:TabbableDate');
export const CALENDAR_DISPLAY_MODE = new InjectionToken<Signal<CalendarMode | null>>('Calendar2:DisplayMode');
