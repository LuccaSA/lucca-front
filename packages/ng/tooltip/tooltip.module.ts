import { NgModule } from '@angular/core';
import { LuTooltipPanelModule } from './panel/index';
import { LuTooltipTriggerModule } from './trigger/index';

@NgModule({
	imports: [LuTooltipTriggerModule, LuTooltipPanelModule],
	exports: [LuTooltipTriggerModule, LuTooltipPanelModule],
})
export class LuTooltipModule {}
