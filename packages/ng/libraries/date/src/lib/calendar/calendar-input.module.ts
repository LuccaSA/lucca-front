import { NgModule } from '@angular/core';
import { LuCalendarInputComponent } from './calendar-input.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
	],
	exports: [
		LuCalendarInputComponent,
	],
	declarations: [
		LuCalendarInputComponent,
	],
})
export class LuCalendarInputModule {}
