import { JsonPipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

import { luCoreSelectUserTranslations, provideCoreSelectCurrentUserId } from '@lucca-front/ng/core-select/user';
import { ImpersonationComponent, luImpersonationTranslations } from '@lucca-front/ng/impersonation';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { generateInputs, intlArgType } from '../../../../helpers/stories';

import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';

const me = { id: 66, picture: null, department: { id: 3, name: 'Commercial' }, firstName: 'Pierre', lastName: 'Durand' };

export default {
	title: 'Documentation/Navigation/Impersonation/Angular',
	component: ImpersonationComponent,
	argTypes: {
		enableFormerEmployees: {
			control: {
				type: 'boolean',
			},
			description: 'Inclus les collaborateurs partis',
			table: { category: 'inputs' },
		},
		intl: intlArgType([luCoreSelectUserTranslations, luImpersonationTranslations], 'LuImpersonationTranslations & LuCoreSelectUserTranslations'),
	},
	decorators: [
		moduleMetadata({
			imports: [ImpersonationComponent, StoryModelDisplayComponent, JsonPipe],
		}),
		applicationConfig({ providers: [provideHttpClient(), provideCoreSelectCurrentUserId(() => 66)] }),
	],
	render: (args, { argTypes }) => {
		return {
			template: `<lu-impersonation [(selectedUser)]="example" ${generateInputs(args, argTypes)} (clear)="example = me" />

<pr-story-model-display>{{example | json}}</pr-story-model-display>
`,
			props: {
				example: me,
				me,
			},
		};
	},
} as Meta;

export const Basic: StoryObj = {
	args: { enableFormerEmployees: false },
};
