import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuPopoverTriggerDirective } from './popover-trigger.directive';
import { LuOverlayPopoverPanelModule } from '../panel/index';
import { LuOverlayPopoverTargetModule } from '../target/index';

@NgModule({
	imports: [
		CommonModule,
		OverlayModule,
		LuOverlayPopoverPanelModule,
		LuOverlayPopoverTargetModule,
	],
	declarations: [
		LuPopoverTriggerDirective,
	],
	exports: [
		LuPopoverTriggerDirective,
	],
})
export class LuOverlayPopoverTriggerModule {}
