import { NgModule } from '@angular/core';
import { LuDateCalendarModule } from './calendar/index';
import { LuDatePickerModule } from './picker/index';

@NgModule({
	imports: [
		LuDateCalendarModule,
		LuDatePickerModule,
	],
	exports: [
		LuDateCalendarModule,
		LuDatePickerModule,
	]
})
export class LuDateModule {}
