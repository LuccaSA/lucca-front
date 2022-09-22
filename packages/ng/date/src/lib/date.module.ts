import { NgModule } from '@angular/core';
import { LuDateAdapterModule } from './adapter/index';
import { LuCalendarInputComponent } from './calendar/index';
import { LuDateInputModule } from './input/index';
import { LuDatePickerModule } from './picker/index';
import { LuDateSelectInputModule } from './select/index';

@NgModule({
	imports: [LuCalendarInputComponent, LuDatePickerModule, LuDateInputModule, LuDateAdapterModule, LuDateSelectInputModule],
	exports: [LuCalendarInputComponent, LuDatePickerModule, LuDateInputModule, LuDateAdapterModule, LuDateSelectInputModule],
})
export class LuDateModule {}
