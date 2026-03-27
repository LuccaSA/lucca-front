import { SkeletonHeaderComponent } from '@lucca-front/ng/skeleton';
import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Loaders/Skeleton/Skeleton Header',
	component: SkeletonHeaderComponent,
} as Meta;

export const Template: StoryObj<SkeletonHeaderComponent> = {
	argTypes: {
		dark: {
			description: 'Applique un style foncé pour un usage sur fond gris.',
			control: {
				type: 'boolean',
			},
		},
	},

	args: {
		dark: false,
	},
};
