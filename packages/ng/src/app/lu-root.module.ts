import { CommonModule } from '@angular/common';
import { LuLolModule } from './lol/lol.module';
import { NgModule } from '@angular/core';
import {LuDateRangePickerModule} from './date-range-picker/date-range-picker.module';

@NgModule({
	imports: [
		CommonModule,
		LuLolModule,
		LuDateRangePickerModule
	],
	exports: [
		LuLolModule,
		LuDateRangePickerModule
	]
})
export class LuRootModule {}
