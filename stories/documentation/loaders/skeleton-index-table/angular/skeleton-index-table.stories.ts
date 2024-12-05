import { SkeletonIndexTableComponent } from '@lucca-front/ng/skeleton';
import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Loaders/Skeleton/Skeleton IndexTable',
	component: SkeletonIndexTableComponent,
} as Meta;

export const Template: StoryObj<SkeletonIndexTableComponent> = {
	argTypes: {
		dark: {
			control: {
				type: 'boolean',
			},
		},
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
		dark: false,
		cols: 5,
		rows: 10,
	},
};
