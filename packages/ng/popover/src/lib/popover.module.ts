import { NgModule } from '@angular/core';

import { LuPopoverPanelModule } from './panel/index';
import { LuPopoverTargetModule } from './target/index';
import { LuPopoverTriggerModule } from './trigger/index';

@NgModule({
	imports: [LuPopoverPanelModule, LuPopoverTargetModule, LuPopoverTriggerModule],
	exports: [LuPopoverPanelModule, LuPopoverTargetModule, LuPopoverTriggerModule],
})
export class LuPopoverModule {}
