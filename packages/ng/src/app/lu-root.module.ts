import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material';
import { LuUserModule } from './user';
import { LuPopoverModule } from './popover/popover.module';
import { LuApiModule } from './api';
import { LuSelectModule } from './select';

@NgModule({
	imports: [
		CommonModule,
		LuUserModule,
		LuSelectModule,
		LuPopoverModule,
	],
	exports: [
		LuUserModule,
		LuPopoverModule,
		LuSelectModule,
	],
	providers: [
		{ provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: { disabled: true } },
	],
})
export class LuRootModule {}
