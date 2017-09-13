import { CommonModule } from '@angular/common';
import { LuLolModule } from './lol/lol.module';
import { NgModule } from '@angular/core';
import { MD_RIPPLE_GLOBAL_OPTIONS } from '@angular/material';
import {LuDateRangePickerModule} from './date-range-picker/date-range-picker.module';

@NgModule({
	imports: [
		CommonModule,
		LuLolModule,
		LuDateRangePickerModule,
	],
	exports: [
		LuLolModule,
		LuDateRangePickerModule,
	],
	providers: [{provide: MD_RIPPLE_GLOBAL_OPTIONS, useValue: {disabled: true}}],
})
export class LuRootModule {}
