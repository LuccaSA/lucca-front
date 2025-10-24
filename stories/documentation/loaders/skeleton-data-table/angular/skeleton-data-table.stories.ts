import { SkeletonDataTableComponent } from '@lucca-front/ng/skeleton';
import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Loaders/Skeleton/Skeleton DataTable',
	component: SkeletonDataTableComponent,
} as Meta;

export const Template: StoryObj<SkeletonDataTableComponent> = {
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
		dataTableBodyOnly: {
			control: false,
		},
	},

	args: {
		cols: 5,
		rows: 8,
	},
};
