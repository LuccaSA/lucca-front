import { Meta, StoryObj } from '@storybook/angular';
import { IconComponent } from '@lucca-front/ng/icon';
import { IconsList } from '@lucca-front/icons/icons-list';

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
		alt: "Faut mettre du beurre dans le fond du plat pour pas qu'le grâtin colle",
		color: 'inherit',
		icon: 'heart',
		size: 'M',
	},
};
