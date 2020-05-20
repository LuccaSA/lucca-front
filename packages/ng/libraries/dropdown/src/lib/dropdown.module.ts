import { NgModule } from '@angular/core';
import { LuDropdownTriggerModule } from './trigger/index';
import { LuDropdownPanelModule } from './panel/index';


@NgModule({
	imports: [
		LuDropdownTriggerModule,
		LuDropdownPanelModule,
	],
	exports: [
		LuDropdownTriggerModule,
		LuDropdownPanelModule,
	]
})
export class LuDropdownModule { }
