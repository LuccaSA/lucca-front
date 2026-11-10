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
			control: { type: 'boolean' },
			description: 'Désactive le bouton précédent.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		isLastPage: {
			control: { type: 'boolean' },
			description: 'Désactive le bouton suivant.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		from: {
			control: { type: 'number' },
			description: 'Numéro du premier élément affiché.',
			table: { category: 'inputs' },
		},
		to: {
			control: { type: 'number' },
			description: 'Numéro du dernier élément affiché.',
			table: { category: 'inputs' },
		},
		itemsCount: {
			control: { type: 'number' },
			description: 'Nombre total d’éléments.',
			table: { category: 'inputs' },
		},
		mod: {
			options: setStoryOptions(PAGINATION_MOD),
			control: {
				type: 'select',
			},
			description: 'Affiche la pagination en vue compacte (seulement avec les boutons précédent et suivant).',
			table: { category: 'inputs', defaultValue: { summary: 'default' } },
		},
		previousPage: {
			description: 'Événement déclenché au clic sur le bouton précédent.',
			action: 'previousPage',
			control: false,
			table: { category: 'outputs', type: { summary: 'void' } },
		},
		nextPage: {
			description: 'Événement déclenché au clic sur le bouton suivant.',
			action: 'nextPage',
			control: false,
			table: { category: 'outputs', type: { summary: 'void' } },
		},
		intl: intlArgType(luPaginationTranslations, 'LuPaginationLabel'),
	},
} as Meta;

export const Basic: StoryObj<PaginationComponent & { isFirstPage: boolean; isLastPage: boolean; from: number; to: number; itemsCount: number; mod: string }> = {
	render: (args, { argTypes }) => {
		return {
			props: { ...args },
			template: cleanupTemplate(`<lu-pagination ${generateInputs(args, argTypes)} (previousPage)="previousPage($event)" (nextPage)="nextPage($event)" />`),
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
