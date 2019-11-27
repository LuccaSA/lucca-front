import { NgModule } from '@angular/core';
import { LuDepartmentSelectInputComponent } from './department-select-input.component';
import { CommonModule } from '@angular/common';
import { LuInputClearerModule } from '@lucca-front/ng/input';
import { LuInputDisplayerModule } from '@lucca-front/ng/input';
import {
	LuTreeOptionPickerModule,
	LuTreeOptionPagerModule,
	LuTreeOptionSearcherModule,
	LuTreeOptionItemModule,
	LuForTreeOptionsModule,
	LuTreeOptionSelectAllModule
} from '@lucca-front/ng/option';
import { LuDepartmentFeederModule } from '../feeder/index';
import { LU_DEPARTMENT_SELECT_INPUT_TRANSLATIONS } from './department-select-input.token';
import { luDepartmentSelectInputTranslations } from './department-select-input.translate';
import { LuDepartmentSelectInputIntl } from './department-select-input.intl';

@NgModule({
	imports: [
		CommonModule,
		LuInputClearerModule,
		LuInputDisplayerModule,
		LuTreeOptionPickerModule,
		LuTreeOptionPagerModule,
		LuTreeOptionSearcherModule,
		LuTreeOptionItemModule,
		LuForTreeOptionsModule,
		LuTreeOptionSelectAllModule,
		LuDepartmentFeederModule,
	],
	declarations: [
		LuDepartmentSelectInputComponent,
	],
	exports: [
		LuDepartmentSelectInputComponent,
	],
	providers: [
		{ provide: LU_DEPARTMENT_SELECT_INPUT_TRANSLATIONS, useValue: luDepartmentSelectInputTranslations },
		LuDepartmentSelectInputIntl,
	],
})
export class LuDepartmentSelectInputModule {}
