import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LuInputClearerComponent, LuInputDisplayerModule } from '@lucca-front/ng/input';
import { LuTreeOptionItemModule, LuTreeOptionOperatorModule, LuTreeOptionPickerModule, LuTreeOptionSelectorModule } from '@lucca-front/ng/option';
import { LuDepartmentFeederModule } from '../feeder/index';
import { LuDepartmentSelectInputComponent } from './department-select-input.component';
import { LuDepartmentSelectInputIntl } from './department-select-input.intl';
import { LU_DEPARTMENT_SELECT_INPUT_TRANSLATIONS } from './department-select-input.token';
import { luDepartmentSelectInputTranslations } from './department-select-input.translate';

@NgModule({
	imports: [
		CommonModule,
		OverlayModule,
		LuInputClearerComponent,
		LuInputDisplayerModule,
		LuDepartmentFeederModule,
		LuTreeOptionPickerModule,
		LuTreeOptionItemModule,
		LuTreeOptionOperatorModule,
		LuTreeOptionSelectorModule,
	],
	declarations: [LuDepartmentSelectInputComponent],
	exports: [LuDepartmentSelectInputComponent],
	providers: [
		{
			provide: LU_DEPARTMENT_SELECT_INPUT_TRANSLATIONS,
			useValue: luDepartmentSelectInputTranslations,
		},
		LuDepartmentSelectInputIntl,
	],
})
export class LuDepartmentSelectInputModule {}
