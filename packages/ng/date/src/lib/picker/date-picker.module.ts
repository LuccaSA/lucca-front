import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LuCalendarInputModule } from '../calendar/index';
import { LuDatePickerComponent } from './date-picker.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { LuDateInputModule } from '../input/index';

@NgModule({
	imports: [FormsModule, CommonModule, LuCalendarInputModule, LuDateInputModule, OverlayModule, A11yModule],
	exports: [LuDatePickerComponent],
	declarations: [LuDatePickerComponent],
})
export class LuDatePickerModule {}
