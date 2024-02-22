import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { LuEmployeeCardTriggerDirective } from './employee-card-trigger.directive';

@NgModule({
	declarations: [],
	imports: [OverlayModule, LuEmployeeCardTriggerDirective],
	exports: [LuEmployeeCardTriggerDirective],
})
export class EmployeeCardTriggerModule {}
