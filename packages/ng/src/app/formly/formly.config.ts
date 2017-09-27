import { ConfigOption } from 'ng-formly';
// inputs
import { LuFormlyFieldInput } from './types/input';
// wrappers
import { LuFormlyWrapperHelper, TemplateHelper } from './wrappers/helper';
import { LuFormlyWrapperLabel, TemplateLabel } from './wrappers/label';
import { LuFormlyWrapperLayout } from './wrappers/layout';
import { LuFormlyWrapperSuffix, TemplateSuffix } from './wrappers/suffix';


export const LU_FORMLY_COMPONENTS = [
	LuFormlyFieldInput,

	LuFormlyWrapperHelper,
	LuFormlyWrapperLabel,
	LuFormlyWrapperLayout,
	LuFormlyWrapperSuffix,
];

export const LU_FORMLY_CONFIG = {
	types: [
		{
			name: 'input',
			component: LuFormlyFieldInput,
			wrappers: ['layout'],
		},
	],
	wrappers: [
		{ name: 'label', component: LuFormlyWrapperLabel },
		{ name: 'helper', component: LuFormlyWrapperHelper },
		{ name: 'layout', component: LuFormlyWrapperLayout },
		{ name: 'suffix', component: LuFormlyWrapperSuffix },
	],
	manipulators: [
		{ class: TemplateHelper, method: 'run' }, // third
		{ class: TemplateSuffix, method: 'run' }, // second
		{ class: TemplateLabel, method: 'run' }, // first
	],
} as ConfigOption;
