import { NgModule } from '@angular/core';
import { LuCalendarInputModule } from './calendar/index';
import { LuDatePickerModule } from './picker/index';
import { LuDateInputModule } from './input/index';
import { LuDateAdapterModule } from './adapter/index';
import { LuDateSelectInputModule } from './select/index';

@NgModule({
	imports: [LuCalendarInputModule, LuDatePickerModule, LuDateInputModule, LuDateAdapterModule, LuDateSelectInputModule],
	exports: [LuCalendarInputModule, LuDatePickerModule, LuDateInputModule, LuDateAdapterModule, LuDateSelectInputModule],
})
export class LuDateModule {}
