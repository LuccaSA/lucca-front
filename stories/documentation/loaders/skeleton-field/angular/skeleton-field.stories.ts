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
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		hiddenLabel: {
			description: '[v20.1] Masque le label.',
			control: {
				type: 'boolean',
			},
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		rows: {
			description: '[v20.1] Modifie le nombre de lignes de contenu.',
			control: {
				type: 'number',
			},
			table: { category: 'inputs', defaultValue: { summary: '1' } },
		},
		size: {
			options: ['', 'XS', 'S', 'M'],
			control: {
				type: 'select',
			},
			description: '[v21.2.4] Modifie la taille du composant.',
			table: { category: 'inputs' },
		},
	},

	args: {
		dark: false,
		hiddenLabel: false,
		rows: 1,
	},
};
