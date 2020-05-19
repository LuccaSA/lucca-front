import { NgModule } from '@angular/core';
import { LuDropdownTriggerModule } from './trigger/index';


@NgModule({
	imports: [
		LuDropdownTriggerModule,
	],
	exports: [
		LuDropdownTriggerModule,
	]
})
export class LuDropdownModule { }
