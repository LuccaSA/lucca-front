import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuInputClearerModule, LuInputDisplayerModule } from '@lucca-front/ng/input';
import { LuTreeOptionItemModule, LuTreeOptionOperatorModule, LuTreeOptionPickerModule, LuTreeOptionSelectorModule } from '@lucca-front/ng/option';
import { LuDepartmentFeederModule } from '../feeder/index';
import { LuDepartmentSelectInputComponent } from './department-select-input.component';

@NgModule({
	imports: [
		CommonModule,
		OverlayModule,
		LuInputClearerModule,
		LuInputDisplayerModule,
		LuDepartmentFeederModule,
		LuTreeOptionPickerModule,
		LuTreeOptionItemModule,
		LuTreeOptionOperatorModule,
		LuTreeOptionSelectorModule,
	],
	declarations: [LuDepartmentSelectInputComponent],
	exports: [LuDepartmentSelectInputComponent],
})
export class LuDepartmentSelectInputModule {}
