import { NgModule } from '@angular/core';
import { LuDateAdapterPipe } from './adapter/index';
import { LuCalendarInputComponent } from './calendar/index';
import { LuDateInputDirective } from './input/index';
import { LuDatePickerComponent } from './picker/index';
import { LuDateSelectInputComponent } from './select/index';

/**
 * @deprecated use `LuCalendarInputComponent, LuDatePickerComponent, LuDateInputDirective, LuDateAdapterPipe, LuDateSelectInputComponent` instead
 */
@NgModule({
	imports: [LuCalendarInputComponent, LuDatePickerComponent, LuDateInputDirective, LuDateAdapterPipe, LuDateSelectInputComponent],
	exports: [LuCalendarInputComponent, LuDatePickerComponent, LuDateInputDirective, LuDateAdapterPipe, LuDateSelectInputComponent],
})
export class LuDateModule {}
