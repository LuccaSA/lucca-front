import { SkeletonHeaderComponent } from '@lucca-front/ng/skeleton';
import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Loaders/Skeleton/Skeleton Header',
	component: SkeletonHeaderComponent,
} as Meta;

export const Template: StoryObj<SkeletonHeaderComponent> = {
	argTypes: {
		dark: {
			control: {
				type: 'boolean',
			},
		},
	},

	args: {
		dark: false,
	},
};
