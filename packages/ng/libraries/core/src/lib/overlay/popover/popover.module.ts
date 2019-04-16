import { NgModule } from '@angular/core';

import { LuOverlayPopoverPanelModule } from './panel/index';
import { LuOverlayPopoverTargetModule } from './target/index';
import { LuOverlayPopoverTriggerModule } from './trigger/index';

@NgModule({
	imports: [
		LuOverlayPopoverPanelModule,
		LuOverlayPopoverTargetModule,
		LuOverlayPopoverTriggerModule,
	],
	exports: [
		LuOverlayPopoverPanelModule,
		LuOverlayPopoverTargetModule,
		LuOverlayPopoverTriggerModule,
	],
})
export class LuOverlayPopoverModule {}
