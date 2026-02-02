import { SkeletonTableComponent } from '@lucca-front/ng/skeleton';
import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Loaders/Skeleton/Skeleton Table',
	component: SkeletonTableComponent,
} as Meta;

export const Template: StoryObj<SkeletonTableComponent> = {
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
		colsAlign: { 3: 'center', 4: 'end' },
	},
};
