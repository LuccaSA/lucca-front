import { NgModule } from '@angular/core';
import { LuDropdownItemModule } from './item/index';
import { LuDropdownPanelModule } from './panel/index';
import { LuDropdownTriggerModule } from './trigger/index';

/**
 * @deprecated use `LuDropdownTriggerDirective, LuDropdownPanelComponent, LuDropdownItemDirective` instead
 */
@NgModule({
	imports: [LuDropdownTriggerModule, LuDropdownPanelModule, LuDropdownItemModule],
	exports: [LuDropdownTriggerModule, LuDropdownPanelModule, LuDropdownItemModule],
})
export class LuDropdownModule {}
