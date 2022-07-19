import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LuCalendarInputComponent } from './calendar-input.component';

@NgModule({
	imports: [FormsModule, CommonModule],
	exports: [LuCalendarInputComponent],
	declarations: [LuCalendarInputComponent],
})
export class LuCalendarInputModule {}
