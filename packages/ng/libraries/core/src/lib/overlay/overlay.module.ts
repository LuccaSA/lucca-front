import { NgModule } from '@angular/core';
import { LuPopoverModule } from './popover/index';
import { LuTooltipModule } from './tooltip/index';
import { LuPopupModule } from './popup/index';
import { LuModalModule } from './modal/index';
import { LuSidepanelModule } from './sidepanel/index';

@NgModule({
	imports: [
		LuPopoverModule,
		LuTooltipModule,
		LuPopupModule,
		LuModalModule,
		LuSidepanelModule,
	],
	exports: [
		LuPopoverModule,
		LuTooltipModule,
		LuPopupModule,
		LuModalModule,
		LuSidepanelModule,
	]
})
export class LuOverlayModule {}
