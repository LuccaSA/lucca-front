import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPopoverComponent } from './popover.component';
import { LuUserModule, LuPopoverModule } from '@lucca-front/ng';
import { SharedModule } from '../shared';
import { DemoPopoverBasicComponent } from './basic/basic';
import { DemoPopoverTriggerComponent } from './trigger/trigger';
import { DemoPopoverScrollComponent } from './scroll/scroll';

@NgModule({
	imports: [CommonModule, LuPopoverModule, SharedModule, LuUserModule],
	declarations: [
		DemoPopoverComponent,
		DemoPopoverBasicComponent,
		DemoPopoverTriggerComponent,
		DemoPopoverScrollComponent,
	],
	exports: [
		DemoPopoverComponent,
		DemoPopoverBasicComponent,
		DemoPopoverTriggerComponent,
		DemoPopoverScrollComponent,
	],
})
export class DemoPopoverModule {}
