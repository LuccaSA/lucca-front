import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuPopoverTriggerDirective } from './popover-trigger.directive';
import { LuPopoverPanelModule } from '../panel/index';
import { LuPopoverTargetModule } from '../target/index';
import {	LayoutModule } from '@angular/cdk/layout';

@NgModule({
	imports: [
		CommonModule,
		OverlayModule,
		LuPopoverPanelModule,
		LuPopoverTargetModule,
		LayoutModule,
	],
	declarations: [
		LuPopoverTriggerDirective,
	],
	exports: [
		LuPopoverTriggerDirective,
	],
})
export class LuPopoverTriggerModule {}
