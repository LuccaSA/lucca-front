import { SkeletonTableComponent } from '@lucca-front/ng/skeleton';
import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Loaders/Skeleton/Skeleton Table',
	component: SkeletonTableComponent,
} as Meta;

export const Template: StoryObj<SkeletonTableComponent> = {
	argTypes: {
		cols: {
			description: 'Nombre de colonnes.',
			control: {
				type: 'number',
				min: 1,
			},
		},
		rows: {
			description: 'Nombre de lignes.',
			control: {
				type: 'number',
				min: 1,
			},
		},
		colsAlign: {
			description: 'Alignement horizontal du contenu des colonnes.',
		},
	},

	args: {
		cols: 5,
		rows: 8,
		colsAlign: { '3': 'center', '4': 'end' },
	},
};
