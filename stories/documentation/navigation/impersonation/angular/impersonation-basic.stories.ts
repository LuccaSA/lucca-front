import { JsonPipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

import { luCoreSelectUserTranslations, provideCoreSelectCurrentUserId } from '@lucca-front/ng/core-select/user';
import { ImpersonationComponent, luImpersonationTranslations } from '@lucca-front/ng/impersonation';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { generateInputs, intlArgType } from '../../../../helpers/stories';

import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';

const me = { id: 66, picture: null, department: { id: 3, name: 'Commercial' }, firstName: 'Pierre', lastName: 'Durand' };

export default {
	title: 'Documentation/Navigation/Impersonation/Angular/Basic',
	component: ImpersonationComponent,
	argTypes: {
		enableFormerEmployees: {
			control: {
				type: 'boolean',
			},
			description: 'Inclus les collaborateurs partis',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		selectedUser: {
			description: 'Collaborateur actuellement incarné. Two-way.',
			control: false,
			table: { category: 'models', type: { summary: 'ILuUser' } },
		},
		clear: {
			description: 'Événement déclenché lorsque l’incarnation est réinitialisée.',
			action: 'clear',
			control: false,
			table: { category: 'outputs', type: { summary: 'void' } },
		},
		intl: intlArgType([luCoreSelectUserTranslations, luImpersonationTranslations], 'LuImpersonationTranslations & LuCoreSelectUserTranslations'),
		operationIds: {
			control: {
				type: 'object',
			},
			description: "[Deprecated] Remplacé par <code>uniqueOperationIds</code>. Restreint les utilisateurs à ceux accessibles via ces opérations, dans le périmètre de l'appInstanceId",
			table: { category: 'inputs' },
		},
		uniqueOperationIds: {
			control: {
				type: 'object',
			},
			description: "Restreint les utilisateurs à ceux accessibles via ces opérations uniques ; prioritaire sur operationIds / appInstanceId, que l'API ignore alors",
			table: { category: 'inputs' },
		},
		appInstanceId: {
			control: {
				type: 'number',
			},
			description: "[Deprecated] Remplacé par <code>uniqueOperationIds</code>. Instance d'application dans laquelle les operationIds sont résolus ; sans effet avec uniqueOperationIds",
			table: { category: 'inputs' },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [ImpersonationComponent, StoryModelDisplayComponent, JsonPipe],
		}),
		applicationConfig({ providers: [provideHttpClient(), provideCoreSelectCurrentUserId(() => 66)] }),
	],
	render: (args, { argTypes }) => {
		const { clear, selectedUser, ...inputs } = args;
		return {
			template: `<lu-impersonation [(selectedUser)]="example" ${generateInputs(inputs, argTypes)} (clear)="example = me; onClear()" />

<pr-story-model-display>{{example | json}}</pr-story-model-display>
`,
			props: {
				example: me,
				me,
				onClear: () => clear?.(),
			},
		};
	},
} as Meta;

export const Basic: StoryObj = {
	args: { enableFormerEmployees: false },
};
