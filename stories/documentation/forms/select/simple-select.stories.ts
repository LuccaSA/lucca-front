import { HttpClientModule } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LuDisabledOptionDirective, LuDisplayerDirective, LuOptionDirective } from '@lucca-front/ng/core-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { LuSimpleSelectApiV3Directive, LuSimpleSelectApiV4Directive } from '@lucca-front/ng/simple-select/api';
import { Meta, moduleMetadata } from '@storybook/angular';
import { allLegumes, generateStory, ILegume, LuSelectInputStoryComponent } from './select.utils';

export const Basic = generateStory(
	'Basic',
	'',
	`
<label class="textfield">
	<lu-simple-select
		#selectRef
		class="textfield-input"
		[placeholder]="placeholder"
		[options]="legumes"
		[clearable]="clearable"
		[disabled]="disabled"
		[loading]="loading"
		[(ngModel)]="selectedLegume"
	>
		<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
	</lu-simple-select>
	<span class="textfield-label">Label</span>
</label>
`,
	{
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent', 'LuOptionDirective'],
	},
);
// Override argTypes to display loading/clearable/disabled/placeholder controls
Basic.argTypes = {};

export const Minimal = generateStory(
	'Minimal',
	"Pas besoin systématiquement de `*luOption`, le simple-select affiche par défaut la propriété `name` ou l'option elle-même.",
	`
<label class="textfield">
	<lu-simple-select
		class="textfield-input"
		placeholder="Placeholder..."
		[options]="legumes"
		[(ngModel)]="selectedLeg"
	></lu-simple-select>
	<span class="textfield-label">Label</span>
</label>
`,
	{
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
);

export const WithDisplayer = generateStory(
	'Displayer',
	"Il est possible de customiser l'affichage de l'option sélectionnée en utilisant `*luDisplayer`.",
	`
<label class="textfield">
	<lu-simple-select
		#selectRef
		class="textfield-input"
		placeholder="Placeholder..."
		[(ngModel)]="selectedLeg"
		[options]="legumes"
	>
		<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
		<ng-container *luDisplayer="let legume; select: selectRef">🥗🥗 {{ legume.name }} 🥗🥗</ng-container>
	</lu-simple-select>
	<span class="textfield-label">Label</span>
</label>
`,
	{
		'@lucca-front/ng/core-select': ['LuOptionDirective', 'LuDisplayerDirective'],
		'@lucca-front/ng/simple-select': ['LuOptionDirective', 'LuDisplayerDirective'],
	},
	{
		selectedLegume: allLegumes[4],
	},
);

export const WithClearer = generateStory(
	'Clearer',
	"Il est possible d'afficher un bouton pour vider la sélection l'attribure `clearable`.",
	`
<label class="textfield">
	<lu-simple-select
		#selectRef
		class="textfield-input"
		placeholder="Placeholder..."
		[(ngModel)]="selectedLeg"
		[options]="legumes"
		[clearable]="true"
	>
		<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
	</lu-simple-select>
	<span class="textfield-label">Label</span>
</label>
`,
	{
		'@lucca-front/ng/core-select': ['LuOptionDirective'],
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
	{
		selectedLegume: allLegumes[4],
	},
);

export const WithClue = generateStory(
	'Clue',
	"Il est possible d'afficher une barre de recherche pour filtrer les options en écoutant l'évènement `(clueChange)`.",
	`
<label class="textfield">
	<lu-simple-select
		#selectRef
		class="textfield-input"
		placeholder="Placeholder..."
		[(ngModel)]="selectedLeg"
		[options]="legumes | filterLegumes:clue"
		(clueChange)="clue = $event"
	>
		<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
	</lu-simple-select>
	<span class="textfield-label">Label</span>
</label>
`,
	{
		'@lucca-front/ng/core-select': ['LuOptionDirective'],
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
);

export const WithPagination = generateStory(
	'Pagination',
	"Il est possible de charger les options au fur et à mesure en écouteant l'évènement `(nextPage)`.",
	`
<label class="textfield">
	<lu-simple-select
		#selectRef
		class="textfield-input"
		placeholder="Placeholder..."
		[(ngModel)]="selectedLeg"
		[options]="legumes.slice(0, page * 10)"
		(nextPage)="page = page + 1"
	>
		<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
	</lu-simple-select>
	<span class="textfield-label">Label</span>
</label>
`,
	{
		'@lucca-front/ng/core-select': ['LuOptionDirective'],
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
);

export const Disabled = generateStory(
	'Disabled',
	"Il est possible de désactiver le simple-select en utilisant l'attribut `disabled` ou via un FormControl.",
	`
<label class="textfield">
	<lu-simple-select
		#selectRef
		class="textfield-input"
		placeholder="Placeholder..."
		[(ngModel)]="selectedLeg"
		[options]="legumes"
		[disabled]="true"
	>
		<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
	</lu-simple-select>
	<span class="textfield-label">Label</span>
</label>
`,
	{
		'@lucca-front/ng/core-select': ['LuOptionDirective'],
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
);

export const WithDisabledOptions = generateStory(
	'Disabled options',
	"Il est possible de désactiver certaines options en utilisant la directive `luDisabledOption` sur l'option.",
	`
<label class="textfield">
	<lu-simple-select
		#selectRef
		class="textfield-input"
		placeholder="Placeholder..."
		[(ngModel)]="selectedLeg"
		[options]="legumes"
	>
		<ng-container *luOption="let legume; select: selectRef" [luDisabledOption]="legume.index % 2 === 0">{{ legume.name }}</ng-container>
	</lu-simple-select>
	<span class="textfield-label">Label</span>
</label>
`,
	{
		'@lucca-front/ng/core-select': ['LuOptionDirective', 'LuDisabledOptionDirective'],
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
);

export const ApiV3 = generateStory(
	'Api V3',
	"Pour récupérer automatiquement les options depuis une api V3 avec pagination et recherche, il suffit d'utiliser la directive `apiV3`.",
	`
<label class="textfield">
	<lu-simple-select
		class="textfield-input"
		placeholder="Placeholder..."
		apiV3="/api/v3/axisSections"
		[(ngModel)]="selectedAxisSection"
	></lu-simple-select>
	<span class="textfield-label">Label</span>
</label>
	`,
	{
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
		'@lucca-front/ng/simple-select/api': ['LuSimpleSelectApiV3Directive'],
	},
);

export const ApiV4 = generateStory(
	'Api V4',
	"Pour récupérer automatiquement les options depuis une api V4 avec pagination et recherche, il suffit d'utiliser la directive `apiV4`.",
	`
<label class="textfield">
	<lu-simple-select
		class="textfield-input"
		placeholder="Placeholder..."
		apiV4="/organization/structure/api/establishments"
		[(ngModel)]="selectedEstablishment"
	></lu-simple-select>
	<span class="textfield-label">Label</span>
</label>
	`,
	{
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
		'@lucca-front/ng/simple-select/api': ['LuSimpleSelectApiV4Directive'],
	},
);

@Pipe({ name: 'filterLegumes', standalone: true })
class FilterLegumesPipe implements PipeTransform {
	transform(legumes: ILegume[], clue: string): ILegume[] {
		return clue ? legumes.filter((legume) => legume.name.toLowerCase().includes(clue.toLowerCase())) : legumes;
	}
}

const meta: Meta<LuSelectInputStoryComponent> = {
	title: 'Documentation/Forms/SimpleSelect',
	component: LuSimpleSelectInputComponent,
	decorators: [
		moduleMetadata({
			imports: [FormsModule, HttpClientModule, LuDisplayerDirective, LuOptionDirective, FilterLegumesPipe, LuSimpleSelectApiV3Directive, LuSimpleSelectApiV4Directive, LuDisabledOptionDirective],
		}),
	],
	args: {
		placeholder: 'Placeholder...',
		legumes: allLegumes,
		clearable: false,
		disabled: false,
		loading: false,
		selectedLegume: null,
		selectedLegumes: [],
		page: 1,
	},
	argTypes: {
		options: { control: false },
		optionTpl: { control: false },
		overlayConfig: { control: false },
		valueTpl: { control: false },
		optionComparer: { control: false },
		clueChange: { control: false },
		nextPage: { control: false },
		previousPage: { control: false },
		legumes: { control: false },
		selectedLegume: { control: false },
		selectedLegumes: { control: false },
	},
	parameters: {
		docs: {
			description: {
				component: Basic.parameters['docs'].description.story,
			},
		},
	},
};

export default meta;
