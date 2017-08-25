import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MdDatepickerModule, MdDialogModule, MdInputModule, MdNativeDateModule, MdSelectModule} from '@angular/material';
import {LuDateRangePickerComponent} from './date-range-picker.component';
import { CustomRangePickerComponent } from './custom-range-picker/custom-range-picker.component';

@NgModule({
	imports: [
		BrowserAnimationsModule,
		CommonModule,
		FormsModule,
		MdSelectModule,
		MdInputModule,
		MdDatepickerModule,
		MdNativeDateModule,
		MdDialogModule
	],
	entryComponents: [CustomRangePickerComponent],
	declarations: [LuDateRangePickerComponent, CustomRangePickerComponent],
	exports: [LuDateRangePickerComponent]
})
export class LuDateRangePickerModule { }

export {LuDateRangePickerComponent} from './date-range-picker.component'
