import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuDisplayInitials, LuUserPictureComponent } from '@lucca-front/ng/user';
import { LuUserPopoverDirective, provideLuUserPopover } from '@lucca-front/ng/user-popover';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { bob, georges, squidwards } from '../../user.mocks';

export default {
	title: 'Documentation/Users/Avatar/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [LuUserPictureComponent, LuUserPopoverDirective],
		}),
		applicationConfig({
			providers: [provideAnimations(), provideHttpClient(), provideLuUserPopover()],
		}),
	],
	render: ({ user, sizes, placeholder, displayFormat }) => {
		return {
			template: `<button class="userPopover_trigger" type="button" [luUserPopover]="user">
			<lu-user-picture
		[user]="user"
		[displayFormat]="displayFormat"
		data-testid="lu-user-picture"
		[class]="sizes"
		[class.mod-placeholder]="placeholder"
		 /></button>`,
			props: {
				user,
				sizes,
				placeholder,
				displayFormat,
			},
		};
	},
	argTypes: {
		user: {
			options: ['Avec image', 'Avec image erronée', 'Sans image'],
			mapping: {
				'Avec image': bob,
				'Avec image erronée': georges,
				'Sans image': squidwards,
			},
		},
		sizes: {
			options: ['mod-XS', 'mod-S', '', 'mod-L', 'mod-XL', 'mod-XXL', 'mod-XXXL'],
			control: {
				type: 'select',
			},
			description: '[v18.1] XL, XXL & XXXL',
		},
		placeholder: {
			control: {
				type: 'boolean',
			},
			description: '[v16.1]',
		},
	},
} as Meta;

export const Basic: StoryObj<LuUserPictureComponent & { sizes: string; placeholder: boolean }> = {
	args: {
		user: bob,
		sizes: '',
		placeholder: false,
		displayFormat: LuDisplayInitials.firstlast,
	},
};
