import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdDatepickerModule, MdSelectModule} from '@angular/material';
import {LuDateRangePickerComponent} from './date-range-picker.component';

@NgModule({
	imports: [
		BrowserAnimationsModule,
		CommonModule,
		MdSelectModule,
		MdDatepickerModule,
	],
	declarations: [LuDateRangePickerComponent],
	exports: [LuDateRangePickerComponent]
})
export class LuDateRangePickerModule { }

export {LuDateRangePickerComponent} from './date-range-picker.component'
