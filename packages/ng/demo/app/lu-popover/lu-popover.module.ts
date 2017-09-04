import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPopoverComponent } from './lu-popover.component';
import { LuPopoverModule } from '../../../src';
import { SharedModule } from '../shared';
import { BasicComponent } from './basic/basic.component';

@NgModule({
  imports: [
    CommonModule,
    LuPopoverModule,
    SharedModule,
  ],
  declarations: [DemoPopoverComponent, BasicComponent],
  exports: [DemoPopoverComponent, BasicComponent]
})
export class DemoPopoverModule { }
