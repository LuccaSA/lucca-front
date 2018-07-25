import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { OverlayModule } from '@angular/cdk/overlay';
// import { LuPopoverComponent } from './popover.component';
// import { LuPopoverTrigger } from './popover.triggers';
// import { LuPopoverTarget } from './popover.target';

import { LuPopoverPanelModule } from './panel/index';
import { LuPopoverTargetModule } from './target/index';
import { LuPopoverTriggerModule } from './trigger/index';

@NgModule({
	imports: [
		LuPopoverPanelModule,
		LuPopoverTargetModule,
		LuPopoverTriggerModule,
	],
	exports: [
		LuPopoverPanelModule,
		LuPopoverTargetModule,
		LuPopoverTriggerModule,
	],
})
export class LuPopoverModule {}
