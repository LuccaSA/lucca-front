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
		},
		rows: {
			control: {
				type: 'number',
			},
		},
	},

	args: {
		dark: false,
		hiddenLabel: false,
		rows: 1,
	},
};
