import { NgModule } from '@angular/core';
import { LuDepartmentSelectInputComponent } from './department-select-input.component';
import { CommonModule } from '@angular/common';
import { LuSelectClearerModule } from '../../../select/index';
import { LuInputDisplayerModule } from '../../../input/index';
import { LuTreeOptionPickerModule, LuTreeOptionPagerModule, LuTreeOptionSearcherModule, LuTreeOptionItemModule, LuForTreeOptionsModule } from '../../../tree/index';
import { LuDepartmentFeederModule } from '../feeder/index';
import { LU_DEPARTMENT_SELECT_INPUT_TRANSLATIONS } from './department-select-input.token';
import { luDepartmentSelectInputTranslations } from './department-select-input.translate';
import { LuDepartmentSelectInputIntl } from './department-select-input.intl';

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
	providers: [
		{ provide: LU_DEPARTMENT_SELECT_INPUT_TRANSLATIONS, useValue: luDepartmentSelectInputTranslations },
		LuDepartmentSelectInputIntl,
	],
})
export class LuDepartmentSelectInputModule {}
