import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuTooltipTriggerDirective } from './tooltip-trigger.directive';

@NgModule({
	imports: [OverlayModule],
	declarations: [LuTooltipTriggerDirective],
	exports: [LuTooltipTriggerDirective],
})
export class LuTooltipTriggerModule {}
