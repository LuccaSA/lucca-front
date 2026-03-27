import { SkeletonFieldComponent } from '@lucca-front/ng/skeleton';
import { Meta, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Loaders/Skeleton/Skeleton Field',
	component: SkeletonFieldComponent,
} as Meta;

export const Template: StoryObj<SkeletonFieldComponent> = {
	argTypes: {
		dark: {
			description: 'Applique un style foncé pour un usage sur fond gris.',
			control: {
				type: 'boolean',
			},
		},
		hiddenLabel: {
			description: '[v20.1] Masque le label.',
			control: {
				type: 'boolean',
			},
		},
		rows: {
			description: '[v20.1] Modifie le nombre de lignes de contenu.',
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
