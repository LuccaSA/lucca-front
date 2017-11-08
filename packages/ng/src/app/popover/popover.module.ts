import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuPopoverComponent } from './popover.component';
import { LuPopoverTrigger } from './popover.triggers';
import { LuPopoverTarget } from './popover-target';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule
  ],
	declarations: [LuPopoverComponent, LuPopoverTrigger, LuPopoverTarget],
	exports: [LuPopoverComponent, LuPopoverTrigger, LuPopoverTarget]
})
export class LuPopoverModule { }
export { LuPopoverComponent } from './popover.component';
export { LuPopoverTrigger } from './popover.triggers';
export { LuPopoverTarget } from './popover-target';
