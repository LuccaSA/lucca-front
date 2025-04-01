import { SkeletonIndexTableComponent } from '@lucca-front/ng/skeleton';
import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Loaders/Skeleton/Skeleton IndexTable',
	component: SkeletonIndexTableComponent,
} as Meta;

export const Template: StoryObj<SkeletonIndexTableComponent> = {
	argTypes: {
		cols: {
			control: {
				type: 'number',
				min: 1,
			},
		},
		rows: {
			control: {
				type: 'number',
				min: 1,
			},
		},
	},

	args: {
		cols: 5,
		rows: 8,
	},
};
