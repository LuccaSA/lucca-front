import { PaginationComponent } from '@lucca-front/ng/pagination';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { cleanupTemplate, generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Navigation/Pagination/Angular',
	decorators: [
		moduleMetadata({
			imports: [PaginationComponent],
		}),
	],
	argTypes: {
		isFirstPage: {
			type: 'boolean',
			description: 'Désactive le bouton précédent.',
		},
		isLastPage: {
			type: 'boolean',
			description: 'Désactive le bouton suivant.',
		},
		from: {
			type: 'number',
			description: 'Numéro du dernier élément affiché.',
		},
		to: {
			type: 'number',
			description: 'Numéro du dernier élément affiché.',
		},
		itemsCount: {
			type: 'number',
			description: "Nombre total d'éléments.",
		},
		mod: {
			options: ['default', 'compact'],
			control: {
				type: 'select',
			},
			description: 'Affiche la pagination en vue compacte (seulement avec les boutons précédent et suivant).',
		},
	},
} as Meta;

export const Basic: StoryObj<PaginationComponent & { isFirstPage: boolean; isLastPage: boolean; from: number; to: number; itemsCount: number; mod: string }> = {
	render: (args, { argTypes }) => {
		return {
			template: cleanupTemplate(`<lu-pagination ${generateInputs(args, argTypes)} />`),
		};
	},
	args: {
		from: 1,
		to: 20,
		itemsCount: 27,
		isFirstPage: true,
		isLastPage: false,
	},
};
