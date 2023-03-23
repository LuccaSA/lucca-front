import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuDisabledOptionDirective, LuDisplayerDirective, LuOptionDirective } from '@lucca-front/ng/core-select';
import { LuMultiDisplayerDirective, LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectApiV3Directive, LuSimpleSelectApiV4Directive } from '@lucca-front/ng/simple-select/api';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata } from '@storybook/angular';
import { allLegumes, FilterLegumesPipe, generateStory, LuSelectInputStoryComponent } from './select.utils';

export const Basic = generateStory(
	'Basic',
	'',
	`
<label class="textfield">
	<lu-multi-select
		#selectRef
		class="textfield-input"
		[placeholder]="placeholder"
		[options]="legumes"
		[clearable]="clearable"
		[disabled]="disabled"
		[loading]="loading"
		[(ngModel)]="selectedLegumes"
	>
	</lu-multi-select>
	<span class="textfield-label">Label</span>
</label>
`,
	{
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
	},
	{
		selectedLegumes: allLegumes.slice(0, 15),
	},
);
// Override argTypes to display loading/clearable/disabled/placeholder controls
Basic.argTypes = {};

export const WithMultiDisplayer = generateStory(
	'With MultiDisplayer',
	"Il est possible de personnaliser le contenu de la valeur sélectionnée en utilisant la directive `luMultiDisplayer`. Le *template* prend le tableau contenant l'ensemble des valeurs sélectionnées.",
	`
<label class="textfield mod-block u-marginTopM">
	<lu-multi-select
		#selectRef
		class="textfield-input"
		[placeholder]="placeholder"
		[options]="legumes"
		[clearable]="clearable"
		[disabled]="disabled"
		[loading]="loading"
		[(ngModel)]="selectedLegumes"
	>
		<ng-container *luMultiDisplayer="let legumes; select: selectRef">
			<span class="chip mod-unkillable">{{ legumes.length }}</span> légumes sélectionnés
		</ng-container>
	</lu-multi-select>
	<span class="textfield-label">Label</span>
</label>`,
	{
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent', 'LuMultiDisplayerDirective'],
	},
	{
		selectedLegumes: allLegumes.slice(0, 5),
	},
);

export const WithDisplayer = generateStory(
	'With Displayer',
	"Il est possible de personnaliser le contenu des *chips* dans l'affichage de la valeur sélectionnée en utilisant la directive `luDisplayer`. Le *template* prend une option parmis les valeurs sélectionnées.",
	`
<label class="textfield mod-block u-marginTopM">
	<lu-multi-select
		#selectRef
		class="textfield-input"
		[placeholder]="placeholder"
		[options]="legumes"
		[clearable]="clearable"
		[disabled]="disabled"
		[loading]="loading"
		[(ngModel)]="selectedLegumes"
	>
		<span *luDisplayer="let legume; select: selectRef" [luTooltip]="'Vive les ' + legume.name + '!'">
			🥔 {{ legume.name }} 🥔
		</span>
	</lu-multi-select>
	<span class="textfield-label">Label</span>
</label>`,
	{
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent', 'LuMultiDisplayerDirective'],
		'@lucca-front/ng/core-select': ['LuDisplayerDirective'],
	},
	{
		selectedLegumes: allLegumes.slice(0, 5),
	},
);

export const WithClearer = generateStory(
	'Clearer',
	"Il est possible d'afficher un bouton pour vider la sélection l'attribure `clearable`.",
	`
<label class="textfield">
	<lu-multi-select
		#selectRef
		class="textfield-input"
		placeholder="Placeholder..."
		[(ngModel)]="selectedLegumes"
		[options]="legumes"
		[clearable]="true"
	>
		<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
	</lu-multi-select>
	<span class="textfield-label">Label</span>
</label>
`,
	{
		'@lucca-front/ng/core-select': ['LuOptionDirective'],
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
	{
		selectedLegumes: allLegumes.slice(0, 5),
	},
);

export const WithClue = generateStory(
	'Clue',
	"Il est possible d'afficher une barre de recherche pour filtrer les options en écoutant l'évènement `(clueChange)`.",
	`
<label class="textfield">
	<lu-multi-select
		#selectRef
		class="textfield-input"
		placeholder="Placeholder..."
		[(ngModel)]="selectedLegumes"
		[options]="legumes | filterLegumes:clue"
		(clueChange)="clue = $event"
	>
		<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
	</lu-multi-select>
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
	<lu-multi-select
		#selectRef
		class="textfield-input"
		placeholder="Placeholder..."
		[(ngModel)]="selectedLegumes"
		[options]="legumes.slice(0, page * 10)"
		(nextPage)="page = page + 1"
	>
		<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
	</lu-multi-select>
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
	<lu-multi-select
		#selectRef
		class="textfield-input"
		placeholder="Placeholder..."
		[(ngModel)]="selectedLegumes"
		[options]="legumes"
		[disabled]="true"
	>
		<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
	</lu-multi-select>
	<span class="textfield-label">Label</span>
</label>
`,
	{
		'@lucca-front/ng/core-select': ['LuOptionDirective'],
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
	{
		selectedLegumes: allLegumes.slice(0, 5),
	},
);

export const WithDisabledOptions = generateStory(
	'Disabled options',
	"Il est possible de désactiver certaines options en utilisant la directive `luDisabledOption` sur l'option.",
	`
<label class="textfield">
	<lu-multi-select
		#selectRef
		class="textfield-input"
		placeholder="Placeholder..."
		[(ngModel)]="selectedLegumes"
		[options]="legumes"
	>
		<ng-container *luOption="let legume; select: selectRef" [luDisabledOption]="legume.index % 2 === 0">{{ legume.name }}</ng-container>
	</lu-multi-select>
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
	<lu-multi-select
		class="textfield-input"
		placeholder="Placeholder..."
		apiV3="/api/v3/axisSections"
		[(ngModel)]="selectedAxisSection"
	></lu-multi-select>
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
	<lu-multi-select
		class="textfield-input"
		placeholder="Placeholder..."
		apiV4="/organization/structure/api/establishments"
		[(ngModel)]="selectedEstablishment"
	></lu-multi-select>
	<span class="textfield-label">Label</span>
</label>
	`,
	{
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
		'@lucca-front/ng/simple-select/api': ['LuSimpleSelectApiV4Directive'],
	},
);

const meta: Meta<LuSelectInputStoryComponent> = {
	title: 'Documentation/Forms/MultiSelect',
	component: LuMultiSelectInputComponent,
	decorators: [
		moduleMetadata({
			imports: [
				BrowserAnimationsModule,
				FormsModule,
				FilterLegumesPipe,
				HttpClientModule,
				LuMultiSelectInputComponent,
				LuMultiDisplayerDirective,
				LuOptionDirective,
				LuDisplayerDirective,
				LuTooltipModule,
				LuSimpleSelectApiV3Directive,
				LuSimpleSelectApiV4Directive,
				LuDisabledOptionDirective,
			],
		}),
	],
	args: {
		placeholder: 'Placeholder...',
		legumes: allLegumes,
		clearable: false,
		disabled: false,
		loading: false,
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
