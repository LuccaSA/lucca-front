import { NgModule } from '@angular/core';
import { LuCalendarInputModule } from './calendar/index';
import { LuDatePickerModule } from './picker/index';
import { LuDateInputModule } from './input/index';
import { LuDateAdapterModule } from './adapter/index';

@NgModule({
	imports: [
		LuCalendarInputModule,
		LuDatePickerModule,
		LuDateInputModule,
		LuDateAdapterModule,
	],
	exports: [
		LuCalendarInputModule,
		LuDatePickerModule,
		LuDateInputModule,
		LuDateAdapterModule,
	]
})
export class LuDateModule {}
