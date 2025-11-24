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
	render: ({ user, sizes, placeholder, displayFormat, AI }) => {
		const argAI = AI ? ` AI` : ``;
		const argSize = sizes ? ` size="${sizes}"` : ``;
		return {
			template: `<button class="userPopover_trigger" type="button" [luUserPopover]="user">
	<lu-user-picture
		[user]="user"
		[displayFormat]="displayFormat"
		data-testid="lu-user-picture"
		[class.mod-placeholder]="placeholder"
		${argSize}${argAI}/>
</button>`,
			props: {
				user,
				sizes,
				placeholder,
				displayFormat,
				AI,
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
			options: ['XS', 'S', '', 'L', 'XL', 'XXL', 'XXXL'],
			control: {
				type: 'select',
			},
			description: '[v18.1] XL, XXL & XXXL',
		},
		placeholder: {
			control: {
				type: 'boolean',
			},
		},
		AI: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

export const Basic: StoryObj<LuUserPictureComponent & { sizes: string; placeholder: boolean; AI: boolean }> = {
	args: {
		user: bob,
		sizes: '',
		placeholder: false,
		displayFormat: LuDisplayInitials.firstlast,
		AI: false,
	},
};
