import { ConfigOption } from '@ngx-formly/core';
// inputs
import {
	LuFormlyFieldInput,
	LuFormlyFieldDate,
	LuFormlyFieldTextarea,
	LuFormlyFieldSelect,
	LuFormlyFieldUser,
	LuFormlyFieldApi,
	LuFormlyFieldDepartment,
	LuFormlyFieldEstablishment,
	LuFormlyFieldCheckboxes,
	LuFormlyFieldRadios,
} from './types/index';
// wrappers
import {
	LuFormlyWrapperHelper, TemplateHelper,
	// LuFormlyWrapperLabel,
	LuFormlyWrapperTextfieldLayout,
	LuFormlyWrapperSuffix, TemplateSuffix,
	LuFormlyWrapperIcon, TemplateIcon,
	LuFormlyWrapperError,
	TemplateError,
	// LuFormlyErrorMessage,
	LuFormlyWrapperRadiosfieldLayout
} from './wrappers/index';

// export const LU_FORMLY_COMPONENTS = [
// 	LuFormlyErrorMessage,

// 	LuFormlyFieldInput,
// 	LuFormlyFieldDate,
// 	LuFormlyFieldTextarea,
// 	LuFormlyFieldSelect,
// 	LuFormlyFieldUser,
// 	LuFormlyFieldApi,
// 	LuFormlyFieldDepartment,
// 	LuFormlyFieldRadios,
// 	LuFormlyFieldCheckboxes,

// 	LuFormlyWrapperHelper,
// 	LuFormlyWrapperLabel,
// 	LuFormlyWrapperTextfieldLayout,
// 	LuFormlyWrapperRadiosfieldLayout,
// 	LuFormlyWrapperSuffix,
// 	LuFormlyWrapperIcon,
// 	LuFormlyWrapperError,
// 	LuFormlyWrapperTitle,
// ];

export const LU_FORMLY_CONFIG = {
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
			component: LuFormlyFieldCheckboxes,
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
			wrappers: ['textfield-layout']
		}
	],
	wrappers: [
		{ name: 'helper', component: LuFormlyWrapperHelper },
		{ name: 'radiosfield-layout', component: LuFormlyWrapperRadiosfieldLayout },
		{ name: 'textfield-layout', component: LuFormlyWrapperTextfieldLayout },
		{ name: 'suffix', component: LuFormlyWrapperSuffix },
		{ name: 'icon', component: LuFormlyWrapperIcon },
		{ name: 'error', component: LuFormlyWrapperError },
	],
	manipulators: [

		{ class: TemplateError, method: 'run' }, // fifth
		{ class: TemplateHelper, method: 'run' }, // fourth
		{ class: TemplateSuffix, method: 'run' }, // third
		{ class: TemplateIcon, method: 'run' }, // second
	],
} as ConfigOption;
