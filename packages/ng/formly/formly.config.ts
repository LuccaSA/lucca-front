import { ConfigOption } from '@ngx-formly/core';
// inputs
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
} from './types/index';
// wrappers
import {
	LuFormlyWrapperCheckboxLayout,
	LuFormlyWrapperError,
	LuFormlyWrapperHelper,
	LuFormlyWrapperIcon,
	LuFormlyWrapperRadiosfieldLayout,
	LuFormlyWrapperSuffix,
	LuFormlyWrapperTextfieldLayout,
	templateErrorExtension,
	templateHelperExtension,
	templateIconExtension,
	templateSuffixExtension,
} from './wrappers/index';

export const LU_FORMLY_CONFIG: ConfigOption = {
	types: [
		{
			name: 'input',
			component: LuFormlyFieldInput,
			wrappers: ['textfield-layout'],
		},
		{
			name: 'radio',
			component: LuFormlyFieldRadios,
			wrappers: ['radiosfield-layout'],
		},
		{
			name: 'checkbox',
			component: LuFormlyFieldCheckbox,
			wrappers: ['checkbox-layout'],
		},
		{
			name: 'date',
			component: LuFormlyFieldDate,
			wrappers: ['textfield-layout'],
		},
		{
			name: 'textarea',
			component: LuFormlyFieldTextarea,
			wrappers: ['textfield-layout'],
		},
		{
			name: 'select',
			component: LuFormlyFieldSelect,
			wrappers: ['textfield-layout'],
		},
		{
			name: 'user',
			component: LuFormlyFieldUser,
			wrappers: ['textfield-layout'],
		},
		{
			name: 'api',
			component: LuFormlyFieldApi,
			wrappers: ['textfield-layout'],
		},
		{
			name: 'department',
			component: LuFormlyFieldDepartment,
			wrappers: ['textfield-layout'],
		},
		{
			name: 'establishment',
			component: LuFormlyFieldEstablishment,
			wrappers: ['textfield-layout'],
		},
	],
	wrappers: [
		{ name: 'helper', component: LuFormlyWrapperHelper },
		{ name: 'checkbox-layout', component: LuFormlyWrapperCheckboxLayout },
		{ name: 'radiosfield-layout', component: LuFormlyWrapperRadiosfieldLayout },
		{ name: 'textfield-layout', component: LuFormlyWrapperTextfieldLayout },
		{ name: 'suffix', component: LuFormlyWrapperSuffix },
		{ name: 'icon', component: LuFormlyWrapperIcon },
		{ name: 'error', component: LuFormlyWrapperError },
	],
	extensions: [
		{ name: 'helper', extension: templateHelperExtension }, // fifth
		{ name: 'error', extension: templateErrorExtension }, // fourth
		{ name: 'suffix', extension: templateSuffixExtension }, // third
		{ name: 'icon', extension: templateIconExtension }, // second
	],
};
