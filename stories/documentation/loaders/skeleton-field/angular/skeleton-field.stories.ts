import { SkeletonFieldComponent } from '@lucca-front/ng/skeleton';
import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Loaders/Skeleton/Skeleton Field',
	component: SkeletonFieldComponent,
} as Meta;

export const Template: StoryObj<SkeletonFieldComponent> = {
	argTypes: {
		dark: {
			control: {
				type: 'boolean',
			},
		},
		hiddenLabel: {
			control: {
				type: 'boolean',
			},
			description: '[v20.1]',
		},
		rows: {
			control: {
				type: 'number',
			},
			description: '[v20.1]',
		},
	},

	args: {
		dark: false,
		hiddenLabel: false,
		rows: 1,
	},
};
