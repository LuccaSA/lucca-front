import { NgModule } from '@angular/core';
import { LuCalendarInputComponent } from './calendar-input.component';

/**
 * @deprecated use `LuCalendarInputComponent` instead
 */
@NgModule({
	imports: [LuCalendarInputComponent],
	exports: [LuCalendarInputComponent],
})
export class LuCalendarInputModule {}
