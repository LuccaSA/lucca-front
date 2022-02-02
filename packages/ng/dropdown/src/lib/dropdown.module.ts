import { NgModule } from '@angular/core';
import { LuDropdownTriggerModule } from './trigger/index';
import { LuDropdownPanelModule } from './panel/index';
import { LuDropdownItemModule } from './item/index';

@NgModule({
	imports: [
		LuDropdownTriggerModule,
		LuDropdownPanelModule,
		LuDropdownItemModule,
	],
	exports: [
		LuDropdownTriggerModule,
		LuDropdownPanelModule,
		LuDropdownItemModule,
	],
})
export class LuDropdownModule {}
