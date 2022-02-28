import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LuApiModule } from '@lucca-front/ng/api';
import { LuDateModule } from '@lucca-front/ng/date';
import { LuDepartmentModule } from '@lucca-front/ng/department';
import { LuEstablishmentModule } from '@lucca-front/ng/establishment';
import { LuInputModule } from '@lucca-front/ng/input';
import { LuOptionModule } from '@lucca-front/ng/option';
import { LuQualificationModule } from '@lucca-front/ng/qualification';
import { LuSelectModule } from '@lucca-front/ng/select';
import { LuUserModule } from '@lucca-front/ng/user';
import { FormlyModule } from '@ngx-formly/core';
import { LU_FORMLY_CONFIG } from './formly.config';
import {
	LuFormlyFieldApi,
	LuFormlyFieldCheckbox,
	LuFormlyFieldDate,
	LuFormlyFieldDepartment,
	LuFormlyFieldEstablishment,
	LuFormlyFieldInput,
	LuFormlyFieldRadios,
	LuFormlyFieldSelect,
	LuFormlyFieldTextarea,
	LuFormlyFieldUser,
	LuFormlyFieldQualification,
} from './types/index';
import {
	LuFormlyErrorMessage,
	LuFormlyWrapperCheckboxLayout,
	LuFormlyWrapperError,
	LuFormlyWrapperHelper,
	LuFormlyWrapperIcon,
	LuFormlyWrapperRadiosfieldLayout,
	LuFormlyWrapperSuffix,
	LuFormlyWrapperTextfieldLayout,
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
		LuFormlyFieldQualification,
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

		LuFormlyChild,
	],
})
export class LuFormlyModule {}
