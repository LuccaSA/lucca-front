import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DemoDateRangePickerComponent } from './date-range-picker.component';
import { BasicComponent } from './basic/basic.component';
// import {LuDateRangePickerModule} from '../../../src/app/date-range-picker/date-range-picker.module';
// import {SharedModule} from '../shared/index';
// import {LuEmptyModule} from '../../../src/app/empty';

@NgModule({
	imports: [
		CommonModule,
		// LuDateRangePickerModule,
		// SharedModule,
		FormsModule,
		// LuEmptyModule,
	],
	exports: [DemoDateRangePickerComponent],
	declarations: [DemoDateRangePickerComponent, BasicComponent],
})
export class DemoDateRangePickerModule {}
