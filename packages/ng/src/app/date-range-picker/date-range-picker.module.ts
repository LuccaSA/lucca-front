import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LuDateRangePickerComponent } from './date-range-picker.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [LuDateRangePickerComponent],
	exports: [LuDateRangePickerComponent]
})
export class LuDateRangePickerModule { }

export {LuDateRangePickerComponent} from './date-range-picker.component'
