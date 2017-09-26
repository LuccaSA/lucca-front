import { ConfigOption } from 'ng-formly';
import { LuFormlyFieldInput } from './types/input/input';

export const LU_FORMLY_COMPONENTS = [
	LuFormlyFieldInput,

];

export const LU_FORMLY_CONFIG = {
	types: [
		{
			name: 'input',
			component: LuFormlyFieldInput,
			// wrappers: ['fieldset', ],
		},
	],
	wrappers: [
		// { name: 'label', component: LuFormlyWrapperLabel },
		// { name: 'fieldset', component: LuFormlyWrapperFieldset },
	],
	manipulators: [],
} as ConfigOption;

// import { FormlyWrapperAddons } from './wrappers/addons';
// import { TemplateDescription } from './run/description';
// import { TemplateValidation } from './run/validation';
// import { TemplateAddons } from './run/addon';
// import {
// 	FormlyFieldInput,
// 	FormlyFieldCheckbox,
// 	FormlyFieldRadio,
// 	FormlyFieldSelect,
// 	FormlyFieldTextArea,
// 	FormlyFieldMultiCheckbox,
// } from './types/types';
// import {
// 	FormlyWrapperLabel,
// 	FormlyWrapperDescription,
// 	FormlyWrapperValidationMessages,
// 	FormlyWrapperFieldset,
// } from './wrappers/wrappers';

// export const FIELD_TYPE_COMPONENTS = [
// // types
// FormlyFieldInput,
// FormlyFieldCheckbox,
// FormlyFieldRadio,
// FormlyFieldSelect,
// FormlyFieldTextArea,
// FormlyFieldMultiCheckbox,

// // wrappers
// FormlyWrapperLabel,
// FormlyWrapperDescription,
// FormlyWrapperValidationMessages,
// FormlyWrapperFieldset,
// FormlyWrapperAddons,
// ];

// export const BOOTSTRAP_FORMLY_CONFIG: ConfigOption = {
// 	types: [
// 	{
// 		name: 'input',
// 		component: FormlyFieldInput,
// 		wrappers: ['fieldset', 'label'],
// 	},
// 	{
// 		name: 'checkbox',
// 		component: FormlyFieldCheckbox,
// 		wrappers: ['fieldset'],
// 	},
// 	{
// 		name: 'radio',
// 		component: FormlyFieldRadio,
// 		wrappers: ['fieldset', 'label'],
// 	},
// 	{
// 		name: 'select',
// 		component: FormlyFieldSelect,
// 		wrappers: ['fieldset', 'label'],
// 	},
// 	{
// 		name: 'textarea',
// 		component: FormlyFieldTextArea,
// 		wrappers: ['fieldset', 'label'],
// 	},
// 	{
// 		name: 'multicheckbox',
// 		component: FormlyFieldMultiCheckbox,
// 		wrappers: ['fieldset', 'label'],
// 	},
// 	],
// 	wrappers: [
// 	{name: 'label', component: FormlyWrapperLabel},
// 	{name: 'description', component: FormlyWrapperDescription},
// 	{name: 'validation-message', component: FormlyWrapperValidationMessages},
// 	{name: 'fieldset', component: FormlyWrapperFieldset},
// 	{name: 'addons', component: FormlyWrapperAddons},
// 	],
// 	manipulators: [
// 	{class: TemplateDescription, method: 'run'},
// 	{class: TemplateValidation, method: 'run'},
// 	{class: TemplateAddons, method: 'run'},
// 	],
// };