import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material';
import { LuLolModule } from './lol/lol.module';
import { LuDateRangePickerModule } from './date-range-picker/date-range-picker.module';
import { LuUserTileModule } from './user';
import { LuPopoverModule } from './popover/popover.module';

@NgModule({
	imports: [
		CommonModule,
		LuLolModule,
		LuDateRangePickerModule,
		LuUserTileModule,
		LuPopoverModule,
	],
	exports: [
		LuLolModule,
		LuDateRangePickerModule,
		LuUserTileModule,
		LuPopoverModule,
	],
	providers: [{provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: {disabled: true}}],
})
export class LuRootModule {}
