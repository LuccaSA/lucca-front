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
import { LuEstablishmentModule } from '@lucca-front/ng/establishment';
import { LuQualificationModule } from '@lucca-front/ng/qualification';

import {
	LuFormlyFieldInput,
	LuFormlyFieldDate,
	LuFormlyFieldTextarea,
	LuFormlyFieldSelect,
	LuFormlyFieldUser,
	LuFormlyFieldApi,
	LuFormlyFieldDepartment,
	LuFormlyFieldCheckbox,
	LuFormlyFieldRadios,
	LuFormlyFieldEstablishment,
} from './types/index';
import {
	LuFormlyWrapperHelper,
	LuFormlyWrapperTextfieldLayout,
	LuFormlyWrapperSuffix,
	LuFormlyWrapperIcon,
	LuFormlyWrapperError,
	LuFormlyErrorMessage,
	LuFormlyWrapperRadiosfieldLayout,
	LuFormlyWrapperCheckboxLayout,
} from './wrappers/index';

/** HACK to avoid a 'Function calls are not supported in decorators' error */
export const LuFormlyChild = FormlyModule.forChild(LU_FORMLY_CONFIG);

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
		LuFormlyFieldEstablishment,
		LuFormlyFieldRadios,
		LuFormlyFieldCheckbox,

		LuFormlyWrapperHelper,
		LuFormlyWrapperCheckboxLayout,
		LuFormlyWrapperTextfieldLayout,
		LuFormlyWrapperRadiosfieldLayout,
		LuFormlyWrapperSuffix,
		LuFormlyWrapperIcon,
		LuFormlyWrapperError,
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
		LuEstablishmentModule,
		LuQualificationModule,
		LuDateModule,

		// FormlyModule.forChild(LU_FORMLY_CONFIG),
		LuFormlyChild,
	],
})
export class LuFormlyModule { }
