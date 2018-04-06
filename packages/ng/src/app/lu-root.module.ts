import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material';
import { LuDateRangePickerModule } from './date-range-picker/date-range-picker.module';
import { LuUserModule } from './user';
import { LuPopoverModule } from './popover/popover.module';
import { LuApiModule } from './api';

@NgModule({
	imports: [
		CommonModule,
		LuDateRangePickerModule,
		LuUserModule,
		LuPopoverModule,
	],
	exports: [LuDateRangePickerModule, LuUserModule, LuPopoverModule],
	providers: [
		{ provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: { disabled: true } },
	],
})
export class LuRootModule {}
