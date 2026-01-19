import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { LuPopoverTriggerDirective } from './popover-trigger.directive';

/**
 * @deprecated use `LuPopoverTriggerDirective, OverlayModule` instead
 */
@NgModule({
	imports: [LuPopoverTriggerDirective, OverlayModule],
	exports: [LuPopoverTriggerDirective],
})
export class LuPopoverTriggerModule {}
