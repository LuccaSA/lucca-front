import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {
	DateAdapter,
	MAT_DATE_FORMATS,
	MatDatepickerModule,
	MatDialogModule, MatInputModule,
	MatNativeDateModule,
	MatSelectModule,
} from '@angular/material';
import {LuSharedModule} from '../shared/shared.module';
import {LuDateRangePickerComponent} from './date-range-picker.component';
import { DateRangeModalComponent } from './date-range-modal/date-range-modal.component';
import {MomentDateAdapter} from '../shared/moment/moment-date-adapter';
import {MAT_MOMENT_DATE_FORMATS} from '../shared/moment/moment-date-formats';

@NgModule({
	imports: [
		CommonModule,
		LuSharedModule,
		BrowserAnimationsModule,
		FormsModule,
		MatSelectModule,
		MatInputModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatDialogModule,
	],
	entryComponents: [DateRangeModalComponent],
	declarations: [LuDateRangePickerComponent, DateRangeModalComponent],
	exports: [LuDateRangePickerComponent],
	providers: [
		{provide: DateAdapter, useClass: MomentDateAdapter},
		{provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
	]
})
export class LuDateRangePickerModule { }

export {LuDateRangePickerComponent} from './date-range-picker.component'
