import { NgModule } from '@angular/core';

import { LuPopoverPanelComponent } from './panel/index';
import { LuPopoverTargetModule } from './target/index';
import { LuPopoverTriggerModule } from './trigger/index';

@NgModule({
	imports: [LuPopoverPanelComponent, LuPopoverTargetModule, LuPopoverTriggerModule],
	exports: [LuPopoverPanelComponent, LuPopoverTargetModule, LuPopoverTriggerModule],
})
export class LuPopoverModule {}
