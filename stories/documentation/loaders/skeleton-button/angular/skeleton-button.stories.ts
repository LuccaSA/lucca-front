import { SkeletonButtonComponent } from '@lucca-front/ng/skeleton';
import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Loaders/Skeleton/Skeleton Button',
	component: SkeletonButtonComponent,
	argTypes: {
		dark: {
			control: {
				type: 'boolean',
			},
		},
		size: {
			control: {
				options: ['mod-M', 'mod-S', 'mod-XS'],
				type: 'select',
			},
		},
	},
} as Meta;

export const Template: StoryObj<SkeletonButtonComponent & { dark: boolean; size: string }> = {
	args: {
		dark: false,
	},
};
