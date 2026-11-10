import { SkeletonIndexTableComponent } from '@lucca-front/ng/skeleton';
import { Meta, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Loaders/Skeleton/Skeleton IndexTable',
	component: SkeletonIndexTableComponent,
} as Meta;

export const Template: StoryObj<SkeletonIndexTableComponent> = {
	argTypes: {
		tableBodyOnly: {
			description: 'N’affiche que les lignes du corps de l’index table (sans en-tête), pour un usage à l’intérieur d’un tableau existant.',
			control: {
				type: 'boolean',
			},
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		cols: {
			description: 'Nombre de colonnes.',
			control: {
				type: 'number',
				min: 1,
			},
			table: { category: 'inputs', defaultValue: { summary: '5' } },
		},
		rows: {
			description: 'Nombre de lignes.',
			control: {
				type: 'number',
				min: 1,
			},
			table: { category: 'inputs', defaultValue: { summary: '8' } },
		},
		colsAlign: {
			description: 'Alignement horizontal du contenu des colonnes. La clé correspond au numéro de la colonne (en partant de 0).',
			table: { category: 'inputs', type: { summary: "Record<number, 'start' | 'center' | 'end'>" }, defaultValue: { summary: '{}' } },
		},
	},
	args: {
		tableBodyOnly: false,
		cols: 5,
		rows: 8,
		colsAlign: { '3': 'center', '4': 'end' },
	},
};
