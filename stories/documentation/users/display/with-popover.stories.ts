import { bob } from '@/stories/users/user.mocks';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LuUserDisplayModule } from '@lucca-front/ng/user';
import { LuUserPopoverDirective, provideLuUserPopover } from '@lucca-front/ng/user-popover';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Users/Display/UserPopover',
	decorators: [
		moduleMetadata({
			imports: [LuUserPopoverDirective, LuUserDisplayModule, ButtonComponent],
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
			template: `<button type="button" class="u-buttonReset u-inlineSizeFitContent pr-u-focusVisible u-borderRadiusM" [luUserPopover]="finn">{{ finn | luUserDisplay : 'lf' }}</button>`,
		};
	},
} as Meta;

export const Basic: StoryObj = {};
