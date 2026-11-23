import { finn } from '@/stories/users/user.mocks';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ILuUser, LuUserDisplayModule } from '@lucca-front/ng/user';
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface UserPopoverStory {
	luUserPopover: ILuUser;
	luUserPopoverDisabled: boolean;
	luPopoverOpenDelay: number;
	luPopoverCloseDelay: number;
}

export default {
	title: 'Documentation/Users/UserPopover/Angular',
	component: LuUserPopoverDirective,
	decorators: [moduleMetadata({ imports: [LuUserPopoverDirective, LuUserDisplayModule] }), applicationConfig({ providers: [provideAnimations(), provideHttpClient(), provideRouter([])] })],
	argTypes: {
		luUserPopover: {
			control: { type: 'object' },
			description: 'Utilisateur dont la fiche est affichée au survol ou au focus.',
			table: { category: 'inputs', type: { summary: 'ILuUser' } },
		},
		luUserPopoverDisabled: {
			control: { type: 'boolean' },
			description: 'Désactive l’ouverture de la popover.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		luPopoverOpenDelay: {
			control: { type: 'number' },
			description: 'Délai d’ouverture de la popover (en ms).',
			table: { category: 'inputs', defaultValue: { summary: '300' } },
		},
		luPopoverCloseDelay: {
			control: { type: 'number' },
			description: 'Délai de fermeture de la popover (en ms).',
			table: { category: 'inputs', defaultValue: { summary: '100' } },
		},
	},
} as Meta;

const triggerAttributes = `type="button" class="userPopover_trigger" [luUserPopover]="luUserPopover" [luUserPopoverDisabled]="luUserPopoverDisabled" [luPopoverOpenDelay]="luPopoverOpenDelay" [luPopoverCloseDelay]="luPopoverCloseDelay" translate="no"`;

export const Basic: StoryObj<UserPopoverStory & { customContent: string }> = {
	render: ({ customContent, ...args }) => ({
		props: args,
		template: customContent
			? `<button ${triggerAttributes} [luUserPopoverCustomContent]="customContent">{{ luUserPopover | luUserDisplay: 'lf' }}</button>
<ng-template #customContent let-user>${customContent}</ng-template>`
			: `<button ${triggerAttributes}>{{ luUserPopover | luUserDisplay: 'lf' }}</button>`,
	}),
	argTypes: {
		customContent: { control: { type: 'text' }, description: 'Template content, `user` is available in the template context.' },
	},
	args: {
		luUserPopover: finn,
		luUserPopoverDisabled: false,
		luPopoverOpenDelay: 300,
		luPopoverCloseDelay: 100,
		customContent: '',
	},
	parameters: {
		controls: {
			include: ['luUserPopover', 'luUserPopoverDisabled', 'luPopoverOpenDelay', 'luPopoverCloseDelay', 'customContent'],
		},
	},
};
