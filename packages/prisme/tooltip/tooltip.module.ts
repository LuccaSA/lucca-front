import { NgModule } from '@angular/core';
import { LuTooltipPanelComponent } from './panel/index';
import { LuTooltipTriggerModule } from './trigger/index';

/**
 * @deprecated use `LuTooltipTriggerDirective, LuTooltipPanelComponent` instead
 */
@NgModule({
	imports: [LuTooltipTriggerModule, LuTooltipPanelComponent],
	exports: [LuTooltipTriggerModule, LuTooltipPanelComponent],
})
export class LuTooltipModule {}
