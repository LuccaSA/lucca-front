import { SkeletonHighlightDataComponent } from '@lucca-front/ng/skeleton';
import { Meta, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Loaders/Skeleton/Skeleton Highlight Data',
	component: SkeletonHighlightDataComponent,
} as Meta;

export const Template: StoryObj<SkeletonHighlightDataComponent> = {
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
