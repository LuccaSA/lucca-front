import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MD_RIPPLE_GLOBAL_OPTIONS } from '@angular/material';
import { LuLolModule } from './lol/lol.module';
import {LuDateRangePickerModule} from './date-range-picker/date-range-picker.module';
import {LuUserTileModule} from './user-tile/user-tile.module';

@NgModule({
	imports: [
		CommonModule,
		LuLolModule,
		LuDateRangePickerModule,
		LuUserTileModule,
	],
	exports: [
		LuLolModule,
		LuDateRangePickerModule,
		LuUserTileModule,
	],
	providers: [{provide: MD_RIPPLE_GLOBAL_OPTIONS, useValue: {disabled: true}}],
})
export class LuRootModule {}
