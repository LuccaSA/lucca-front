import { Meta, StoryObj } from '@storybook/angular';
import { IconComponent } from '@lucca-front/ng/icon';
import { IconsList } from '@lucca-front/icons/icons-list';

export default {
	title: 'Documentation/Icons',
	component: IconComponent,
	argTypes: {
		icon: {
			options: IconsList,
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

export const Template: StoryObj<IconComponent> = {
	args: {
		icon: 'helpOutline',
	},
};
