import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuPopoverTargetDirective } from './popover-target.directive';

@NgModule({
	imports: [CommonModule, OverlayModule],
	declarations: [LuPopoverTargetDirective],
	exports: [LuPopoverTargetDirective],
})
export class LuPopoverTargetModule {}
