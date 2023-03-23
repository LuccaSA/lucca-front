import { Pipe, PipeTransform } from '@angular/core';
import { ALuSelectInputComponent } from '@lucca-front/ng/core-select';
import { StoryObj } from '@storybook/angular';

export interface ILegume {
	index: number;
	name: string;
}

export interface LuSelectInputStoryComponent extends ALuSelectInputComponent<ILegume, ILegume> {
	legumes: ILegume[];
	clue: string;
	page: number;
	selectedLegume: ILegume | null;
	selectedLegumes: ILegume[];
}

export const allLegumes = [
	{ name: 'Artichaut', index: 1 },
	{ name: 'Asperge', index: 2 },
	{ name: 'Aubergine', index: 3 },
	{ name: 'Avocat', index: 4 },
	{ name: 'Betterave', index: 5 },
	{ name: 'Blette', index: 6 },
	{ name: 'Brocoli', index: 7 },
	{ name: 'Carotte', index: 8 },
	{ name: 'Céléri', index: 9 },
	{ name: 'Champignon', index: 10 },
	{ name: 'Chou chinois', index: 11 },
	{ name: 'Chou fleur', index: 12 },
	{ name: 'Chou kalé', index: 13 },
	{ name: 'Chou romanesco', index: 14 },
	{ name: 'Citrouille', index: 15 },
	{ name: 'Concombre', index: 16 },
	{ name: 'Courgette', index: 17 },
	{ name: 'Endive', index: 18 },
	{ name: 'Épinard', index: 19 },
	{ name: 'Haricots verts', index: 20 },
	{ name: 'Laitue', index: 21 },
	{ name: 'Maïs', index: 22 },
	{ name: 'Navet', index: 23 },
	{ name: 'Panais', index: 24 },
	{ name: 'Petits pois', index: 25 },
	{ name: 'Poivron', index: 26 },
	{ name: 'Pomme de terre', index: 27 },
	{ name: 'Potimarron', index: 28 },
	{ name: 'Radis', index: 29 },
	{ name: 'Tomate', index: 30 },
	{ name: 'Topinambour', index: 31 },
];

export function generateStory(
	name: string,
	description: string,
	template: string,
	neededImports: { [key: string]: string[] },
	args: StoryObj<LuSelectInputStoryComponent>['args'] = {},
): StoryObj<LuSelectInputStoryComponent> {
	return {
		name,
		args,
		argTypes: {
			clearable: { control: false },
			disabled: { control: false },
			loading: { control: false },
			placeholder: { control: false },
		},
		render: (args) => ({
			props: args,
			template,
		}),
		parameters: {
			docs: {
				source: {
					language: 'html',
					type: 'code',
					code: template,
				},
				description: {
					story: `
${description}

**Imports nécessaires** :

${Object.entries(neededImports)
	.map(([module, imports]) => `\`import { ${imports.join(', ')} } from '${module}';\``)
	.join('\n')}
`,
				},
			},
		},
	};
}

@Pipe({ name: 'filterLegumes', standalone: true })
export class FilterLegumesPipe implements PipeTransform {
	transform(legumes: ILegume[], clue: string): ILegume[] {
		return clue ? legumes.filter((legume) => legume.name.toLowerCase().includes(clue.toLowerCase())) : legumes;
	}
}
