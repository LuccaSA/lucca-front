import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPopoverComponent } from './popover.component';
import { LuUserModule } from '../../../src/app/user';
import { LuPopoverModule } from '../../../src/app/popover/popover.module';
import { SharedModule } from '../shared';
import { DemoPopoverBasicComponent } from './basic/basic';

@NgModule({
	imports: [
		CommonModule,
		LuPopoverModule,
		SharedModule,
		LuUserModule,
	],
	declarations: [DemoPopoverComponent, DemoPopoverBasicComponent],
	exports: [DemoPopoverComponent, DemoPopoverBasicComponent]
})
export class DemoPopoverModule { }
