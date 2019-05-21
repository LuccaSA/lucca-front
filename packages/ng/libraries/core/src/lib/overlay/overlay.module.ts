import { NgModule } from '@angular/core';
import { LuPopoverModule } from './popover/index';
import { LuTooltipModule } from './tooltip/index';
import { LuPopupModule } from './popup/index';
import { LuModalModule } from './modal/index';

@NgModule({
	imports: [
		LuPopoverModule,
		LuTooltipModule,
		LuPopupModule,
		LuModalModule,
	],
	exports: [
		LuPopoverModule,
		LuTooltipModule,
		LuPopupModule,
		LuModalModule,
	]
})
export class LuOverlayModule {}
