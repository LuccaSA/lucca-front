import { NgModule } from '@angular/core';
import { LuCalendarInputModule } from './calendar/index';
import { LuDatePickerModule } from './picker/index';
import { LuDateInputModule } from './input';

@NgModule({
	imports: [
		LuCalendarInputModule,
		LuDatePickerModule,
		LuDateInputModule,
	],
	exports: [
		LuCalendarInputModule,
		LuDatePickerModule,
		LuDateInputModule,
	]
})
export class LuDateModule {}
