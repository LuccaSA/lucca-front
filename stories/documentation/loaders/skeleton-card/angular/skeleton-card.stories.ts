import { SkeletonCardComponent } from '@lucca-front/ng/skeleton';
import { Meta, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Loaders/Skeleton/Skeleton Card',
	component: SkeletonCardComponent,
} as Meta;

export const Template: StoryObj<SkeletonCardComponent> = {
	argTypes: {
		descriptionLines: {
			description: 'Nombre de lignes de contenu.',
			control: {
				type: 'number',
				min: 0,
			},
		},
	},

	args: {
		descriptionLines: 1,
	},
};
