import { ConfigOption } from 'ng-formly';
// inputs
import { LuFormlyFieldInput } from './types/input';
import { LuFormlyFieldTextarea } from './types/textarea';
import { LuFormlyFieldAutocomplete } from './types/autocomplete';
// wrappers
import { LuFormlyWrapperHelper, TemplateHelper } from './wrappers/helper';
import { LuFormlyWrapperTitle, TemplateTitle } from './wrappers/title';
import { LuFormlyWrapperLabel, TemplateLabel } from './wrappers/label';
import { LuFormlyWrapperLayout } from './wrappers/layout';
import { LuFormlyWrapperSuffix, TemplateSuffix } from './wrappers/suffix';
import { LuFormlyWrapperError, TemplateError, LuFormlyErrorMessage } from './wrappers/error';


export const LU_FORMLY_COMPONENTS = [
	LuFormlyErrorMessage,

	LuFormlyFieldInput,
	LuFormlyFieldTextarea,
	LuFormlyFieldAutocomplete,

	LuFormlyWrapperHelper,
	LuFormlyWrapperLabel,
	LuFormlyWrapperLayout,
	LuFormlyWrapperSuffix,
	LuFormlyWrapperError,
	LuFormlyWrapperTitle,
];

export const LU_FORMLY_CONFIG = {
	types: [
		{
			name: 'input',
			component: LuFormlyFieldInput,
			wrappers: ['layout'],
		},
		{
			name: 'textarea',
			component: LuFormlyFieldTextarea,
			wrappers: ['layout'],
		},
		{
			name: 'autocomplete',
			component: LuFormlyFieldAutocomplete,
			wrappers: ['layout'],
		},
	],
	wrappers: [
		{ name: 'title', component: LuFormlyWrapperTitle },
		// { name: 'label', component: LuFormlyWrapperLabel }, // label added to templates for technical reasons
		{ name: 'helper', component: LuFormlyWrapperHelper },
		{ name: 'layout', component: LuFormlyWrapperLayout },
		{ name: 'suffix', component: LuFormlyWrapperSuffix },
		{ name: 'error', component: LuFormlyWrapperError },
	],
	manipulators: [
		{ class: TemplateTitle, method: 'run' }, // for form group only

		{ class: TemplateError, method: 'run' }, // fourth
		{ class: TemplateHelper, method: 'run' }, // third
		{ class: TemplateSuffix, method: 'run' }, // second
		// { class: TemplateLabel, method: 'run' }, // first
	],
} as ConfigOption;
