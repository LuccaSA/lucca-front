import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material';
import { LuUserModule } from './user';
import { LuPopoverModule } from './popover/popover.module';
import { LuApiModule } from './api';

@NgModule({
	imports: [
		CommonModule,
		LuUserModule,
		LuPopoverModule,
	],
	exports: [LuUserModule, LuPopoverModule],
	providers: [
		{ provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: { disabled: true } },
	],
})
export class LuRootModule {}
