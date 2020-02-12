import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { LU_FORMLY_CONFIG } from './formly.config';
import { LuDateModule } from '@lucca-front/ng/date';
import { LuSelectModule } from '@lucca-front/ng/select';
import { LuInputModule } from '@lucca-front/ng/input';
import { LuUserModule } from '@lucca-front/ng/user';
import { LuOptionModule } from '@lucca-front/ng/option';
import { LuApiModule } from '@lucca-front/ng/api';
import { LuDepartmentModule } from '@lucca-front/ng/department';

import {
	LuFormlyFieldInput,
	LuFormlyFieldDate,
	LuFormlyFieldTextarea,
	LuFormlyFieldSelect,
	LuFormlyFieldUser,
	LuFormlyFieldApi,
	LuFormlyFieldDepartment,
	LuFormlyFieldCheckboxes,
	LuFormlyFieldRadios,
} from './types/index';
import {
	LuFormlyWrapperHelper,
	LuFormlyWrapperTitle,
	LuFormlyWrapperLabel,
	LuFormlyWrapperTextfieldLayout,
	LuFormlyWrapperSuffix,
	LuFormlyWrapperIcon,
	LuFormlyWrapperError,
	LuFormlyErrorMessage,
	LuFormlyWrapperRadiosfieldLayout
} from './wrappers/index';

@NgModule({
	declarations: [
		LuFormlyErrorMessage,

		LuFormlyFieldInput,
		LuFormlyFieldDate,
		LuFormlyFieldTextarea,
		LuFormlyFieldSelect,
		LuFormlyFieldUser,
		LuFormlyFieldApi,
		LuFormlyFieldDepartment,
		LuFormlyFieldRadios,
		LuFormlyFieldCheckboxes,

		LuFormlyWrapperHelper,
		LuFormlyWrapperLabel,
		LuFormlyWrapperTextfieldLayout,
		LuFormlyWrapperRadiosfieldLayout,
		LuFormlyWrapperSuffix,
		LuFormlyWrapperIcon,
		LuFormlyWrapperError,
		LuFormlyWrapperTitle,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,

		LuSelectModule,
		LuOptionModule,
		LuUserModule,
		LuInputModule,
		LuApiModule,
		LuDepartmentModule,
		LuDateModule,

		FormlyModule.forChild(LU_FORMLY_CONFIG),
	],
})
export class LuFormlyModule {}
