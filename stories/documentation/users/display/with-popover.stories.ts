import { LuUserDisplayModule } from '@lucca-front/ng/user';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { LuUserPopoverDirective, provideLuUserPopover } from '@lucca-front/ng/popup-employee';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { bob } from '@/stories/users/user.mocks';

export default {
	title: 'Documentation/Users/Display/UserPopover',
	decorators: [
		moduleMetadata({
			imports: [LuUserPopoverDirective, LuUserDisplayModule],
		}),
		applicationConfig({
			providers: [provideAnimations(), provideHttpClient(), provideLuUserPopover()],
		}),
	],
	render: () => {
		return {
			props: {
				finn: bob,
			},
			template: `<div [luUserPopover]="finn">{{ finn | luUserDisplay : 'lf' }}</div>`,
		};
	},
} as Meta;

export const Basic: StoryObj = {};
