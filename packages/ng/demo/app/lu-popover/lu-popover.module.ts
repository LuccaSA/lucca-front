import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPopoverComponent } from './lu-popover.component';
import { LuUserModule } from '../../../src/app/user';
import { LuPopoverModule } from '../../../src/app/popover/popover.module';
import { SharedModule } from '../shared';
import { BasicComponent } from './basic/basic.component';

@NgModule({
	imports: [
		CommonModule,
		LuPopoverModule,
		SharedModule,
		LuUserModule,
	],
	declarations: [DemoPopoverComponent, BasicComponent],
	exports: [DemoPopoverComponent, BasicComponent]
})
export class DemoPopoverModule { }
