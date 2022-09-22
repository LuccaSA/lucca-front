import { NgModule } from '@angular/core';
import { LuDateAdapterModule } from './adapter/index';
import { LuCalendarInputComponent } from './calendar/index';
import { LuDateInputModule } from './input/index';
import { LuDatePickerModule } from './picker/index';
import { LuDateSelectInputComponent } from './select/index';

@NgModule({
	imports: [LuCalendarInputComponent, LuDatePickerModule, LuDateInputModule, LuDateAdapterModule, LuDateSelectInputComponent],
	exports: [LuCalendarInputComponent, LuDatePickerModule, LuDateInputModule, LuDateAdapterModule, LuDateSelectInputComponent],
})
export class LuDateModule {}
