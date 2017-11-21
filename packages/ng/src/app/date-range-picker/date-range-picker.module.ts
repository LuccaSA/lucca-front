import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {FormsModule} from '@angular/forms';
// import {
// 	DateAdapter,
// 	MAT_DATE_FORMATS,
// 	MatDatepickerModule,
// 	MatDialogModule, MatInputModule,
// 	MatSelectModule,
// } from '@angular/material';
// import {LuSharedModule} from '../shared/shared.module';
import {LuDateRangePickerComponent} from './date-range-picker.component';
// import { DateRangeModalComponent } from './date-range-modal/date-range-modal.component';

@NgModule({
// 	imports: [
// 		CommonModule,
// 		LuSharedModule,
// 		BrowserAnimationsModule,
// 		FormsModule,
// 		MatSelectModule,
// 		MatInputModule,
// 		MatDatepickerModule,
// 		MatDialogModule,
// 	],
// 	entryComponents: [DateRangeModalComponent],
 	declarations: [
		LuDateRangePickerComponent,
//		DateRangeModalComponent,
	],
// 	exports: [LuDateRangePickerComponent],
// 	providers: [
// 	]
})
export class LuDateRangePickerModule { }

export {LuDateRangePickerComponent} from './date-range-picker.component'
