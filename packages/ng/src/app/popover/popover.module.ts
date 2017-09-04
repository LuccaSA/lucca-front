import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuPopoverComponent } from './popover.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule
  ],
  declarations: [LuPopoverComponent],
  exports: [LuPopoverComponent]
})
export class LuPopoverModule { }
export { LuPopoverComponent } from './popover.component';
