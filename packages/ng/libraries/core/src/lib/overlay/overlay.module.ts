import { NgModule } from '@angular/core';
import { LuOverlayPopoverModule } from './popover/index';
import { LuOverlayTooltipModule } from './tooltip/index';

@NgModule({
	imports: [
		LuOverlayPopoverModule,
		LuOverlayTooltipModule,
	],
	exports: [
		LuOverlayPopoverModule,
		LuOverlayTooltipModule,
	]
})
export class LuOverlayModule {}
