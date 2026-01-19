import { NgModule } from '@angular/core';

import { LuPopoverPanelComponent } from './panel/index';
import { LuPopoverTargetDirective } from './target/index';
import { LuPopoverTriggerDirective } from './trigger/index';

/**
 * @deprecated use `LuPopoverPanelComponent, LuPopoverTargetDirective, LuPopoverTriggerDirective` instead
 */
@NgModule({
	imports: [LuPopoverPanelComponent, LuPopoverTargetDirective, LuPopoverTriggerDirective],
	exports: [LuPopoverPanelComponent, LuPopoverTargetDirective, LuPopoverTriggerDirective],
})
export class LuPopoverModule {}
