import { SkeletonFieldComponent } from '@lucca-front/ng/skeleton';
import { Meta, StoryObj } from '@storybook/angular-vite';

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
		size: {
			options: ['', 'S', 'XS'],
			control: {
				type: 'select',
			},
			description: '[v21.2.4] Modifie la taille du composant.',
		},
	},

	args: {
		dark: false,
		hiddenLabel: false,
		rows: 1,
	},
};
