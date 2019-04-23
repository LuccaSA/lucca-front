import { NgModule } from '@angular/core';
import { LuPopoverModule } from './popover/index';
import { LuTooltipModule } from './tooltip/index';

@NgModule({
	imports: [
		LuPopoverModule,
		LuTooltipModule,
	],
	exports: [
		LuPopoverModule,
		LuTooltipModule,
	]
})
export class LuOverlayModule {}
