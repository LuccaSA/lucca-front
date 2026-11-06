import { luPaginationTranslations, PAGINATION_MOD, PaginationComponent } from '@lucca-front/ng/pagination';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { cleanupTemplate, generateInputs, intlArgType, setStoryOptions } from '@/helpers/stories';

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
			table: { category: 'inputs' },
		},
		isLastPage: {
			type: 'boolean',
			description: 'Désactive le bouton suivant.',
			table: { category: 'inputs' },
		},
		from: {
			type: 'number',
			description: 'Numéro du dernier élément affiché.',
			table: { category: 'inputs' },
		},
		to: {
			type: 'number',
			description: 'Numéro du dernier élément affiché.',
			table: { category: 'inputs' },
		},
		itemsCount: {
			type: 'number',
			description: 'Nombre total d’éléments.',
			table: { category: 'inputs' },
		},
		mod: {
			options: setStoryOptions(PAGINATION_MOD),
			control: {
				type: 'select',
			},
			description: 'Affiche la pagination en vue compacte (seulement avec les boutons précédent et suivant).',
			table: { category: 'inputs' },
		},
		intl: intlArgType(luPaginationTranslations, 'LuPaginationLabel'),
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
