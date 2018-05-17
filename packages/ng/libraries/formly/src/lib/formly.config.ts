import { ConfigOption } from '@ngx-formly/core';
// inputs
import { LuFormlyFieldInput } from './types/input';
import { LuFormlyFieldDate } from './types/date';
import { LuFormlyFieldTextarea } from './types/textarea';
import { LuFormlyFieldAutocomplete } from './types/autocomplete';
import { LuFormlyFieldSelect } from './types/select';
import { LuFormlyFieldUser } from './types/user';
// wrappers
import { LuFormlyWrapperHelper, TemplateHelper } from './wrappers/helper';
import { LuFormlyWrapperTitle, TemplateTitle } from './wrappers/title';
import { LuFormlyWrapperLabel, TemplateLabel } from './wrappers/label';
import { LuFormlyWrapperTextfieldLayout } from './wrappers/textfield-layout';
import { LuFormlyWrapperSuffix, TemplateSuffix } from './wrappers/suffix';
import { LuFormlyWrapperIcon, TemplateIcon } from './wrappers/icon';
import {
	LuFormlyWrapperError,
	TemplateError,
	LuFormlyErrorMessage,
} from './wrappers/error';
import { LuFormlyWrapperButton, TemplateButton } from './wrappers/button';

export const LU_FORMLY_COMPONENTS = [
	LuFormlyErrorMessage,

	LuFormlyFieldInput,
	LuFormlyFieldDate,
	LuFormlyFieldTextarea,
	LuFormlyFieldAutocomplete,
	LuFormlyFieldSelect,
	LuFormlyFieldUser,

	LuFormlyWrapperHelper,
	LuFormlyWrapperLabel,
	LuFormlyWrapperTextfieldLayout,
	LuFormlyWrapperSuffix,
	LuFormlyWrapperIcon,
	LuFormlyWrapperError,
	LuFormlyWrapperTitle,
	LuFormlyWrapperButton,
];

export const LU_FORMLY_CONFIG = {
	types: [
		{
			name: 'input',
			component: LuFormlyFieldInput,
			wrappers: ['textfield-layout'],
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
			name: 'autocomplete',
			component: LuFormlyFieldAutocomplete,
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
	],
	wrappers: [
		{ name: 'title', component: LuFormlyWrapperTitle },
		// { name: 'label', component: LuFormlyWrapperLabel }, // label added to templates for technical reasons
		{ name: 'helper', component: LuFormlyWrapperHelper },
		{ name: 'textfield-layout', component: LuFormlyWrapperTextfieldLayout },
		{ name: 'suffix', component: LuFormlyWrapperSuffix },
		{ name: 'icon', component: LuFormlyWrapperIcon },
		{ name: 'error', component: LuFormlyWrapperError },
		{ name: 'button', component: LuFormlyWrapperButton },
	],
	manipulators: [
		{ class: TemplateTitle, method: 'run' }, // for form group only

		{ class: TemplateButton, method: 'run' }, // sixth
		{ class: TemplateError, method: 'run' }, // fifth
		{ class: TemplateHelper, method: 'run' }, // fourth
		{ class: TemplateSuffix, method: 'run' }, // third
		{ class: TemplateIcon, method: 'run' }, // second
		// { class: TemplateLabel, method: 'run' }, // first
	],
} as ConfigOption;
