import { NgModule } from '@angular/core';
import { LuTooltipPanelModule } from './panel/index';
import { LuTooltipTriggerModule } from './trigger/index';

/**
 * @deprecated use `LuTooltipTriggerDirective, OverlayModule, LuTooltipPanelComponent` instead
 */
@NgModule({
	imports: [LuTooltipTriggerModule, LuTooltipPanelModule],
	exports: [LuTooltipTriggerModule, LuTooltipPanelModule],
})
export class LuTooltipModule {}
