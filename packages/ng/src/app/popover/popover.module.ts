import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuPopoverComponent } from './popover.component';
import { LuPopover } from './popover.directive';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule
  ],
  declarations: [LuPopoverComponent, LuPopover],
  exports: [LuPopoverComponent, LuPopover]
})
export class LuPopoverModule { }
export { LuPopoverComponent } from './popover.component';
export { LuPopover } from './popover.directive';
