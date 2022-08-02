import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LuSelect2Module } from '@lucca-front/ng/select2';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';

interface ILegume {
	index: number;
	name: string;
}

const allLegumes = [
	{ name: 'Artichaut', index: 1} ,
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
	{ name: 'Chou romanesco', index: 14 }
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
	{ name: 'Poivron', index: 26 } ,
	{ name: 'Pomme de terre', index: 27 },
	{ name: 'Potimarron', index: 28 },
	{ name: 'Radis', index: 29 },
	{ name: 'Tomate', index: 30 },
	{ name: 'Topinambour', index: 31 },
];

const template = `
<label class="textfield">
	<lu-select2
		#select1
		class="textfield-input"
		placeholder="Placeholder..."
		[(ngModel)]="value"
		[options]="legumes.slice(0, page * 10)"
		(nextPage)="page = page + 1"
	>
		<ng-container *luOption="let legume; select: select1">{{ legume.name }}</ng-container>
		<ng-container *luDisplayer="let legume; select: select1">🥗🥗 {{ legume.name }} 🥗🥗</ng-container>
	</lu-select2>
	<span class="textfield-label">Avec displayer</span>
</label>

<label class="textfield u-marginTopStandard">
	<lu-select2 #select2 class="textfield-input" placeholder="Placeholder..." [(ngModel)]="value" [options]="legumes">
		<ng-container *luOption="let legume; select: select2">{{ legume.name }}</ng-container>
	</lu-select2>
	<span class="textfield-label">Sans displayer</span>
</label>

<label class="textfield u-marginTopStandard">
	<lu-select2 #select3 class="textfield-input" placeholder="Placeholder..." [(ngModel)]="value" [options]="legumes" [clearable]="true">
		<ng-container *luOption="let legume; select: select3">{{ legume.name }}</ng-container>
	</lu-select2>
	<span class="textfield-label">Avec clearer</span>
</label>

<label class="textfield u-marginTopStandard">
	<lu-select2
		#select4
		class="textfield-input"
		placeholder="Placeholder..."
		[(ngModel)]="value"
		[options]="legumes"
		(clueChange)="updateLegumes($event)"
	>
		<ng-container *luOption="let legume; select: select4">{{ legume.name }}</ng-container>
	</lu-select2>
	<span class="textfield-label">Avec searcher</span>
</label>

<label class="textfield u-marginTopStandard">
	<lu-select2 #select5 class="textfield-input" placeholder="Placeholder..." [(ngModel)]="value" [options]="legumes" [disabled]="true">
		<ng-container *luOption="let legume; select: select5">{{ legume.name }}</ng-container>
	</lu-select2>
	<span class="textfield-label">Disabled</span>
</label>

<div class="u-marginTopStandard">
	<div>
		Value:
		<pre>{{ value | json }}</pre>
	</div>
</div>
`;

@Component({
	selector: 'select2-story',
	template
})
class Select2Story {
	public page = 1;
	public legumes: ILegume[] = allLegumes

	public value: ILegume | null = { index: 1, name: "Poivron" };
	public updateLegumes(clue: string): void {
		this.legumes = clue
			? allLegumes.filter(l => this.sanitizeString(l.name).includes(this.sanitizeString(clue)))
			: allLegumes;
	}

	private sanitizeString(str: string): string {
		return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
	}
}

@NgModule({
	imports: [CommonModule, FormsModule, LuSelect2Module],
	declarations: [Select2Story],
	exports: [Select2Story],
})
class StoryModule {}

export default {
	title: 'Documentation/Forms/Select2',
	argTypes: {},
	decorators: [
		componentWrapperDecorator(Select2Story),
		moduleMetadata({
			imports: [StoryModule],
		}),
	],
} as Meta;

const Template: Story<Select2Story> = (args: Select2Story) => ({
	props: args,
});

export const Basic = Template.bind({});

Basic.parameters = {
	docs: {
		source: {
			language: 'ts',
			code: template,
		}
	}
}
