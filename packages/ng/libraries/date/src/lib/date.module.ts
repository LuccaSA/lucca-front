import { NgModule } from '@angular/core';
import { LuDateCalendarModule } from './calendar/index';

@NgModule({
	imports: [
		LuDateCalendarModule,
	],
	exports: [
		LuDateCalendarModule,
	]
})
export class LuDateModule {}
