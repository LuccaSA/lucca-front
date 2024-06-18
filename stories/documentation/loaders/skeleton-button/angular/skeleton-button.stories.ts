import { SkeletonButtonComponent } from '@lucca-front/ng/skeleton';
import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Loaders/Skeleton/Skeleton Button',
	component: SkeletonButtonComponent,
} as Meta;

export const Template: StoryObj<SkeletonButtonComponent> = {
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
