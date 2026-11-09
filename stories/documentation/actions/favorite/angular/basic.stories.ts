import { FAVORITE_BUTTON_SIZE, FavoriteComponent, luFavoriteTranslations } from '@lucca-front/ng/favorite';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { cleanupTemplate, generateInputs, intlArgType, setStoryOptions } from '@/helpers/stories';

export default {
	title: 'Documentation/Actions/Favorite/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [FavoriteComponent],
		}),
	],
	argTypes: {
		favorite: {
			description: 'Indique que l’élément est en favori. Compatible two-way avec `[(favorite)]`.',
			table: { category: 'inputs' },
		},
		size: {
			description: 'Modifie la taille du bouton.',
			options: setStoryOptions(FAVORITE_BUTTON_SIZE),
			control: { type: 'select' },
			table: { category: 'inputs', defaultValue: { summary: 'M' } },
		},
		disabled: {
			description: 'Empêche l’ajout ou le retrait du favori. Le bouton reste atteignable au clavier et son tooltip reste affiché.',
			table: { category: 'inputs' },
		},
		favoriteChange: {
			description: 'Événement déclenché au clic, avec le nouvel état.',
			action: 'favoriteChange',
			table: { category: 'outputs', type: { summary: 'boolean' } },
			control: false,
		},
		intl: intlArgType(luFavoriteTranslations, 'LuFavoriteTranslations'),
	},
	render: ({ favoriteChange, ...args }, { argTypes }) => {
		return {
			props: {
				onFavoriteChange: (value: boolean) => favoriteChange?.(value),
			},
			template: cleanupTemplate(`<lu-favorite ${generateInputs(args, argTypes)} (favoriteChange)="onFavoriteChange($event)" />`),
		};
	},
} as Meta;

export const Basic: StoryObj<FavoriteComponent> = {
	args: {
		favorite: false,
		size: 'M',
		disabled: false,
	},
};
