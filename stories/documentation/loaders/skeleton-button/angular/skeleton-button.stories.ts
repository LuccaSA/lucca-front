import { SKELETON_BUTTON_SIZE, SkeletonButtonComponent } from '@lucca-front/ng/skeleton';
import { Meta, StoryObj } from '@storybook/angular';
import { setStoryOptions } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Loaders/Skeleton/Skeleton Button',
	component: SkeletonButtonComponent,
	argTypes: {
		dark: {
			control: {
				type: 'boolean',
			},
			description: 'Applique un style foncé pour un usage sur fond gris.',
		},
		size: {
			options: setStoryOptions(SKELETON_BUTTON_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
		},
	},
} as Meta;

export const Template: StoryObj<SkeletonButtonComponent & { dark: boolean; size: string }> = {
	args: {
		dark: false,
	},
};
