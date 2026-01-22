import { SkeletonButtonComponent } from '@lucca-front/ng/skeleton';
import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Loaders/Skeleton/Skeleton Button',
	component: SkeletonButtonComponent,
	argTypes: {
		dark: {
			control: {
				type: 'boolean',
			},
			description: 'Applique un style foncé pour un usage sur fond gris.',
		},
		size: {
			options: ['', 'S', 'XS'],
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
		},
	},
} as Meta;

export const Template: StoryObj<SkeletonButtonComponent & { dark: boolean; size: string }> = {
	args: {
		dark: false,
	},
};
