import { NgModule } from '@angular/core';
import { LuOverlayTooltipTriggerModule } from './trigger/index';
import { LuOverlayTooltipPanelModule } from './panel/index';

@NgModule({
	imports: [
		LuOverlayTooltipTriggerModule,
		LuOverlayTooltipPanelModule,
	],
	exports: [
		LuOverlayTooltipTriggerModule,
		LuOverlayTooltipPanelModule,
	]
})
export class LuOverlayTooltipModule {}
