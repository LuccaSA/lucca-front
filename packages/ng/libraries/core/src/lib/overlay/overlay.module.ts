import { NgModule } from '@angular/core';
import { LuPopoverModule } from './popover/index';
import { LuTooltipModule } from './tooltip/index';
import { LuPopupModule } from './popup/index';

@NgModule({
	imports: [
		LuPopoverModule,
		LuTooltipModule,
		LuPopupModule,
	],
	exports: [
		LuPopoverModule,
		LuTooltipModule,
		LuPopupModule,
	]
})
export class LuOverlayModule {}
