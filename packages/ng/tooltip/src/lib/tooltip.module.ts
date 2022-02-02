import { NgModule } from '@angular/core';
import { LuTooltipTriggerModule } from './trigger/index';
import { LuTooltipPanelModule } from './panel/index';

@NgModule({
	imports: [LuTooltipTriggerModule, LuTooltipPanelModule],
	exports: [LuTooltipTriggerModule, LuTooltipPanelModule],
})
export class LuTooltipModule {}
