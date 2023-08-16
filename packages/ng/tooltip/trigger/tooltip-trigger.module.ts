import { NgModule } from '@angular/core';
import { LuTooltipTriggerDirective } from './tooltip-trigger.directive';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
	imports: [LuTooltipTriggerDirective, OverlayModule],
	exports: [LuTooltipTriggerDirective],
})
export class LuTooltipTriggerModule {}
