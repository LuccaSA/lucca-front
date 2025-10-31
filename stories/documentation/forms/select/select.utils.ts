import { LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { ALuSelectInputComponent } from '@lucca-front/ng/core-select';
import { applicationConfig, StoryObj } from '@storybook/angular';
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

export const colorNameByColor: Record<LegumeColor, string> = {
	green: 'vert',
	purple: 'violet',
	red: 'rouge',
	orange: 'orange',
	white: 'blanc',
	yellow: 'jaune',
	brown: 'marron',
};

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
