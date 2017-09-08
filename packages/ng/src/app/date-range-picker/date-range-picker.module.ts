import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {
	DateAdapter,
	MD_DATE_FORMATS,
	MdDatepickerModule,
	MdDialogModule, MdInputModule,
	MdNativeDateModule,
	MdSelectModule,
} from '@angular/material';
import {LuSharedModule} from '../shared/shared.module';
import {LuDateRangePickerComponent} from './date-range-picker.component';
import { CustomRangePickerComponent } from './date-range-modal/date-range-modal.component';
import {MomentDateAdapter} from '../shared/moment/moment.date-adapter';
import {MOMENT_DATE_FORMATS} from '../shared/moment/moment.date-formats';

@NgModule({
	imports: [
		CommonModule,
		LuSharedModule,
		BrowserAnimationsModule,
		FormsModule,
		MdSelectModule,
		MdInputModule,
		MdDatepickerModule,
		MdNativeDateModule,
		MdDialogModule,
	],
	entryComponents: [CustomRangePickerComponent],
	declarations: [LuDateRangePickerComponent, CustomRangePickerComponent],
	exports: [LuDateRangePickerComponent],
	providers: [
		{provide: DateAdapter, useClass: MomentDateAdapter},
		{provide: MD_DATE_FORMATS, useValue: MOMENT_DATE_FORMATS}
	]
})
export class LuDateRangePickerModule { }

export {LuDateRangePickerComponent} from './date-range-picker.component'
