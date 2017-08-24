import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoDateRangePickerComponent } from './date-range-picker.component';
import { BasicComponent } from './basic/basic.component';
import {LuDateRangePickerModule} from '../../../src/app/date-range-picker/date-range-picker.module';
import {SharedModule} from '../shared/index';

@NgModule({
	imports: [
		CommonModule,
		LuDateRangePickerModule,
		SharedModule,
	],
	declarations: [DemoDateRangePickerComponent, BasicComponent]
})
export class DemoDateRangePickerModule { }
