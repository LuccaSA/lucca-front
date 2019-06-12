import { NgModule } from '@angular/core';
import { LuDepartmentSelectInputComponent } from './department-select-input.component';
import { CommonModule } from '@angular/common';
import { LuSelectClearerModule } from '../../../select/index';
import { LuInputDisplayerModule } from '../../../input/index';
import { LuTreeOptionPickerModule, LuTreeOptionPagerModule, LuTreeOptionSearcherModule, LuTreeOptionItemModule, LuForTreeOptionsModule } from '../../../tree/index';
import { LuDepartmentFeederModule } from '../feeder/index';

@NgModule({
	imports: [
		CommonModule,
		LuSelectClearerModule,
		LuInputDisplayerModule,
		LuTreeOptionPickerModule,
		LuTreeOptionPagerModule,
		LuTreeOptionSearcherModule,
		LuTreeOptionItemModule,
		LuForTreeOptionsModule,
		LuDepartmentFeederModule,
	],
	declarations: [
		LuDepartmentSelectInputComponent,
	],
	exports: [
		LuDepartmentSelectInputComponent,
	],
})
export class LuDepartmentSelectInputModule {}
