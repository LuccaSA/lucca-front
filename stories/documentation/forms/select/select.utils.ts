import { Pipe, PipeTransform } from '@angular/core';
import { ALuSelectInputComponent } from '@lucca-front/ng/core-select';
import { ColorInputComponent, ColorOption } from '@lucca-front/ng/forms';
import { StoryObj } from '@storybook/angular';
import { HiddenArgType } from '../../../helpers/common-arg-types';

export type LegumeColor = 'green' | 'purple' | 'red' | 'orange' | 'white' | 'yellow' | 'brown';

export interface ILegume {
	index: number;
	name: string;
	color: LegumeColor;
}

export type LuCoreSelectInputStoryComponent = {
	page: number;
	legumes: ILegume[];
	legumeColor: (legume: ILegume) => LegumeColor;
	colorNameByColor: Record<LegumeColor, string>;
	addLegume: (name: string, existing: ILegume[]) => ILegume[];
} & ALuSelectInputComponent<ILegume, ILegume | ILegume[]>;

export type LuCoreColorPickerInputStoryComponent = {
	colors: ColorOption[];
	size: string;
	noSearch: boolean;
} & ColorInputComponent &
	ALuSelectInputComponent<ColorOption, ColorOption | ColorOption[]>;

export const allLegumes: ILegume[] = [
	{ name: 'Artichaut', index: 1, color: 'green' },
	{ name: 'Asperge', index: 2, color: 'green' },
	{ name: 'Aubergine', index: 3, color: 'purple' },
	{ name: 'Avocat', index: 4, color: 'green' },
	{ name: 'Betterave', index: 5, color: 'red' },
	{ name: 'Blette', index: 6, color: 'green' },
	{ name: 'Brocoli', index: 7, color: 'green' },
	{ name: 'Carotte', index: 8, color: 'orange' },
	{ name: 'Céleri', index: 9, color: 'green' },
	{ name: 'Champignon', index: 10, color: 'white' },
	{ name: 'Chou chinois', index: 11, color: 'green' },
	{ name: 'Chou fleur', index: 12, color: 'white' },
	{ name: 'Chou kalé', index: 13, color: 'green' },
	{ name: 'Chou romanesco', index: 14, color: 'green' },
	{ name: 'Citrouille', index: 15, color: 'orange' },
	{ name: 'Concombre', index: 16, color: 'green' },
	{ name: 'Courgette', index: 17, color: 'green' },
	{ name: 'Endive', index: 18, color: 'green' },
	{ name: 'Épinard', index: 19, color: 'green' },
	{ name: 'Haricots verts', index: 20, color: 'green' },
	{ name: 'Laitue', index: 21, color: 'green' },
	{ name: 'Maïs', index: 22, color: 'yellow' },
	{ name: 'Navet', index: 23, color: 'white' },
	{ name: 'Panais', index: 24, color: 'white' },
	{ name: 'Petits pois', index: 25, color: 'green' },
	{ name: 'Poivron', index: 26, color: 'red' },
	{ name: 'Pomme de terre', index: 27, color: 'brown' },
	{ name: 'Potimarron', index: 28, color: 'orange' },
	{ name: 'Radis', index: 29, color: 'red' },
	{ name: 'Tomate', index: 30, color: 'red' },
	{ name: 'Topinambour Topinambour Topinambour Topinambour Topinambour Topinambour', index: 31, color: 'yellow' },
];

export const colorDecoratives500: ColorOption[] = [
	{ name: 'Myrtille', id: 0, background: 'var(--palettes-blueberry-500)' },
	{ name: 'Concombre', id: 1, background: 'var(--palettes-cucumber-500)' },
	{ name: 'Glacier', id: 2, background: 'var(--palettes-glacier-500)' },
	{ name: 'Raisin', id: 3, background: 'var(--palettes-grape-500)' },
	{ name: 'Kiwi', id: 4, background: 'var(--palettes-kiwi-500)' },
	{ name: 'Lagon', id: 5, background: 'var(--palettes-lagoon-500)' },
	{ name: 'Lavande', id: 6, background: 'var(--palettes-lavender-500)' },
	{ name: 'Citron', id: 7, background: 'var(--palettes-lime-500)' },
	{ name: 'Menthe', id: 8, background: 'var(--palettes-mint-500)' },
	{ name: 'Ananas', id: 9, background: 'var(--palettes-pineapple-500)' },
	{ name: 'Citrouille', id: 10, background: 'var(--palettes-pumpkin-500)' },
	{ name: 'Pastèque', id: 11, background: 'var(--palettes-watermelon-500)' },
];

export const colorDecoratives50: ColorOption[] = [
	{ name: 'Myrtille 50', id: 0, background: 'var(--palettes-blueberry-50)', borderColor: 'var(--palettes-blueberry-500)' },
	{ name: 'Concombre 50', id: 1, background: 'var(--palettes-cucumber-50)', borderColor: 'var(--palettes-cucumber-500)' },
	{ name: 'Glacier 50', id: 2, background: 'var(--palettes-glacier-50)', borderColor: 'var(--palettes-glacier-500)' },
	{ name: 'Raisin 50', id: 3, background: 'var(--palettes-grape-50)', borderColor: 'var(--palettes-grape-500)' },
	{ name: 'Kiwi 50', id: 4, background: 'var(--palettes-kiwi-50)', borderColor: 'var(--palettes-kiwi-500)' },
	{ name: 'Lagon 50', id: 5, background: 'var(--palettes-lagoon-50)', borderColor: 'var(--palettes-lagoon-500)' },
	{ name: 'Lavande 50', id: 6, background: 'var(--palettes-lavender-50)', borderColor: 'var(--palettes-lavender-500)' },
	{ name: 'Citron 50', id: 7, background: 'var(--palettes-lime-50)', borderColor: 'var(--palettes-lime-500)' },
	{ name: 'Menthe 50', id: 8, background: 'var(--palettes-mint-50)', borderColor: 'var(--palettes-mint-500)' },
	{ name: 'Ananas 50', id: 9, background: 'var(--palettes-pineapple-50)', borderColor: 'var(--palettes-pineapple-500)' },
	{ name: 'Citrouille 50', id: 10, background: 'var(--palettes-pumpkin-50)', borderColor: 'var(--palettes-pumpkin-500)' },
	{ name: 'Pastèque 50', id: 11, background: 'var(--palettes-watermelon-50)', borderColor: 'var(--palettes-watermelon-500)' },
];

export const colorNeutral: ColorOption[] = [
	{ name: 'Neutral 1000', id: 0, background: 'black' },
	{ name: 'Neutral 900', id: 1, background: 'var(--palettes-neutral-900)' },
	{ name: 'Neutral 800', id: 2, background: 'var(--palettes-neutral-800)' },
	{ name: 'Neutral 700', id: 3, background: 'var(--palettes-neutral-700)' },
	{ name: 'Neutral 600', id: 4, background: 'var(--palettes-neutral-600)' },
	{ name: 'Neutral 500', id: 5, background: 'var(--palettes-neutral-500)' },
	{ name: 'Neutral 400', id: 6, background: 'var(--palettes-neutral-400)', borderColor: 'var(--palettes-neutral-500)' },
	{ name: 'Neutral 300', id: 7, background: 'var(--palettes-neutral-300)', borderColor: 'var(--palettes-neutral-500)' },
	{ name: 'Neutral 200', id: 8, background: 'var(--palettes-neutral-200)', borderColor: 'var(--palettes-neutral-500)' },
	{ name: 'Neutral 100', id: 9, background: 'var(--palettes-neutral-100)', borderColor: 'var(--palettes-neutral-500)' },
	{ name: 'Neutral 50', id: 10, background: 'var(--palettes-neutral-50)', borderColor: 'var(--palettes-neutral-500)' },
	{ name: 'Neutral 0', id: 11, background: 'var(--palettes-neutral-0)', borderColor: 'var(--palettes-neutral-500)' },
];

export const colorLucca: ColorOption[] = [
	{ name: 'Temps et activités', id: 0, background: 'var(--palettes-timmi-700)' },
	{ name: 'Dépenses professionnelles', id: 0, background: 'var(--palettes-cleemy-700)' },
	{ name: 'Talent', id: 0, background: 'var(--palettes-poplee-700)' },
	{ name: 'Rémunérations et avantages', id: 0, background: 'var(--palettes-pagga-700)' },
	{ name: 'Gestion administrative', id: 0, background: 'var(--palettes-coreHR-700)' },
];

export const colorNameByColor: Record<LegumeColor, string> = {
	green: 'vert',
	purple: 'violet',
	red: 'rouge',
	orange: 'orange',
	white: 'blanc',
	yellow: 'jaune',
	brown: 'marron',
};

export const colorPickerStory = {
	argTypes: {
		size: {
			options: ['', 'S'],
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du form field.',
		},
		compact: {
			description: 'Modifie la taille du composant.',
		},
		clearable: {
			description: "Ajoute un bouton de suppression lorsqu'une couleur est sélectionnée",
		},
		colors: HiddenArgType,
	},
} satisfies StoryObj<LuCoreColorPickerInputStoryComponent>;

export const coreSelectStory = {
	argTypes: {
		addLegume: HiddenArgType,
		clearable: HiddenArgType,
		clueChange: HiddenArgType,
		colorNameByColor: HiddenArgType,
		addOptionLabel: HiddenArgType,
		addOptionStrategy: HiddenArgType,
		addOption: HiddenArgType,
		grouping: HiddenArgType,
		legumeColor: HiddenArgType,
		legumes: HiddenArgType,
		loading: HiddenArgType,
		nextPage: HiddenArgType,
		optionComparer: HiddenArgType,
		options: HiddenArgType,
		optionTpl: HiddenArgType,
		overlayConfig: HiddenArgType,
		page: HiddenArgType,
		placeholder: HiddenArgType,
		previousPage: HiddenArgType,
		valueTpl: HiddenArgType,
	},
} satisfies StoryObj<LuCoreSelectInputStoryComponent>;

@Pipe({ name: 'filterLegumes', standalone: true })
export class FilterLegumesPipe implements PipeTransform {
	transform(legumes: ILegume[], clue: string): ILegume[] {
		return clue ? legumes.filter((legume) => legume.name.toLowerCase().includes(clue.toLowerCase())) : legumes;
	}
}

@Pipe({ name: 'sortLegumes', standalone: true })
export class SortLegumesPipe implements PipeTransform {
	transform(legumes: ILegume[], by: Array<((l: ILegume) => string) | keyof ILegume>): ILegume[] {
		return legumes
			.map((legume) => ({ legume, key: by.map((key) => (typeof key === 'string' ? legume[key] : key(legume))).join('') }))
			.sort((a, b) => a.key.localeCompare(b.key))
			.map((a) => a.legume);
	}
}

@Pipe({ name: 'filterColors', standalone: true })
export class FilterColorsPipe implements PipeTransform {
	transform(colors: ColorOption[], clue: string): ColorOption[] {
		return clue ? colors?.filter((color) => color.name.toLowerCase().includes(clue.toLowerCase())) : colors;
	}
}
