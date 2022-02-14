import { NgModule } from '@angular/core';
import { LuCalendarInputComponent } from './calendar-input.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LuCalendarItemFactory } from './calendar-item.factory';

@NgModule({
	imports: [FormsModule, CommonModule],
	exports: [LuCalendarInputComponent],
	declarations: [LuCalendarInputComponent],
	providers: [LuCalendarItemFactory],
})
export class LuCalendarInputModule {}
