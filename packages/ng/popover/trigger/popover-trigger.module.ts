import { NgModule } from '@angular/core';
import { LuPopoverTriggerDirective } from './popover-trigger.directive';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
	imports: [LuPopoverTriggerDirective, OverlayModule],
	exports: [LuPopoverTriggerDirective],
})
export class LuPopoverTriggerModule {}
