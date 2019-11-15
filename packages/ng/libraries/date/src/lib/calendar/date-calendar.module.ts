import { NgModule } from '@angular/core';
import { LuDateCalendarComponent } from './date-calendar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
	],
	exports: [
		LuDateCalendarComponent,
	],
	declarations: [
		LuDateCalendarComponent,
	],
})
export class LuDateCalendarModule {}
