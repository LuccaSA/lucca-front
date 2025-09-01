import { IconsList } from '@lucca-front/icons/icons-list';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Texts/Icons/Angular',
	component: IconComponent,
	argTypes: {
		icon: {
			options: IconsList.map((i) => i.icon),
			control: 'select',
		},
	},
} as Meta;

export const Template: StoryObj<IconComponent> = {
	args: {
		alt: 'Texte alternatif',
		color: 'inherit',
		icon: 'heart',
	},
};
