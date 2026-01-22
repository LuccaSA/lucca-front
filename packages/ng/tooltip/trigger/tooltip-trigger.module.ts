import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { LuTooltipTriggerDirective } from './tooltip-trigger.directive';

/**
 * @deprecated use `LuTooltipTriggerDirective, OverlayModule` instead
 */
@NgModule({
	imports: [LuTooltipTriggerDirective, OverlayModule],
	exports: [LuTooltipTriggerDirective],
})
export class LuTooltipTriggerModule {}
