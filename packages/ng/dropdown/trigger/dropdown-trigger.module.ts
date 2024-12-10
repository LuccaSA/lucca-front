import { NgModule } from '@angular/core';
import { LuDropdownTriggerDirective } from './dropdown-trigger.directive';

/**
 * @deprecated use `LuDropdownTriggerDirective` instead
 */
@NgModule({
	imports: [LuDropdownTriggerDirective],
	exports: [LuDropdownTriggerDirective],
})
export class LuDropdownTriggerModule {}
