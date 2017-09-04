import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MATERIAL_COMPATIBILITY_MODE, MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material';
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
	providers: [{provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: {disabled: true}}, {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}],
})
export class LuRootModule {}
