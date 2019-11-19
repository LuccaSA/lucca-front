import { NgModule } from '@angular/core';
import { LuCalendarInputModule } from './calendar/index';
import { LuDatePickerModule } from './picker/index';

@NgModule({
	imports: [
		LuCalendarInputModule,
		LuDatePickerModule,
	],
	exports: [
		LuCalendarInputModule,
		LuDatePickerModule,
	]
})
export class LuDateModule {}
