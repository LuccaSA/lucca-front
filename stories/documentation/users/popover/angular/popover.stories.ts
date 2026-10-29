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
}

export default {
	title: 'Documentation/Users/UserPopover/Angular',
	component: LuUserPopoverDirective,
	decorators: [moduleMetadata({ imports: [LuUserPopoverDirective, LuUserDisplayModule] }), applicationConfig({ providers: [provideAnimations(), provideHttpClient(), provideRouter([])] })],
	argTypes: {
		luUserPopover: { control: { type: 'object' } },
		luUserPopoverDisabled: { control: { type: 'boolean' } },
	},
} as Meta;

export const Basic: StoryObj<UserPopoverStory & { customContent: string }> = {
	render: ({ customContent, ...args }) => ({
		props: args,
		template: customContent
			? `<button type="button" class="userPopover_trigger" [luUserPopover]="luUserPopover" [luUserPopoverDisabled]="luUserPopoverDisabled" [luUserPopoverCustomContent]="customContent" translate="no">{{ luUserPopover | luUserDisplay: 'lf' }}</button>
<ng-template #customContent let-user>${customContent}</ng-template>`
			: `<button type="button" class="userPopover_trigger" [luUserPopover]="luUserPopover" [luUserPopoverDisabled]="luUserPopoverDisabled" translate="no">{{ luUserPopover | luUserDisplay: 'lf' }}</button>`,
	}),
	argTypes: {
		customContent: { control: { type: 'text' }, description: 'Template content, `user` is available in the template context.' },
	},
	args: {
		luUserPopover: finn,
		luUserPopoverDisabled: false,
		customContent: '',
	},
	parameters: {
		controls: {
			include: ['luUserPopover', 'luUserPopoverDisabled', 'customContent'],
		},
	},
};
