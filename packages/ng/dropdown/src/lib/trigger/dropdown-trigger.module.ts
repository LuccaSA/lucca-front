import { NgModule } from '@angular/core';
import { LuDropdownTriggerDirective } from './dropdown-trigger.directive';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
	declarations: [LuDropdownTriggerDirective],
	imports: [OverlayModule],
	exports: [LuDropdownTriggerDirective],
})
export class LuDropdownTriggerModule {}
