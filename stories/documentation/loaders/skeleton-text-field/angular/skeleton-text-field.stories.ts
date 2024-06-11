import { SkeletonTextFieldComponent } from '@lucca-front/ng/skeleton';
import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Loaders/Skeleton/Skeleton Textfield',
	component: SkeletonTextFieldComponent,
} as Meta;

export const Template: StoryObj<SkeletonTextFieldComponent> = {
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
