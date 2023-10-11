import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuDisabledOptionDirective, LuDisplayerDirective, LuOptionDirective } from '@lucca-front/ng/core-select';
import { LuMultiDisplayerDirective, LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectApiV3Directive, LuSimpleSelectApiV4Directive } from '@lucca-front/ng/simple-select/api';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { allLegumes, FilterLegumesPipe, generateStory, LuSelectInputStoryComponent } from './select.utils';

export const Basic = generateStory({
	name: 'Basic',
	description: '',
	template: `
<label class="textfield">
	<lu-multi-select
		#selectRef
		class="textfield-input"
		[placeholder]="placeholder"
		[options]="legumes"
		[clearable]="clearable"
		[disabled]="disabled"
		[loading]="loading"
		[expanded]="expanded"
		[(ngModel)]="selectedLegumes"
	>
	</lu-multi-select>
	<span class="textfield-label">Label</span>
</label>
`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
	},
	storyPartial: {
		args: {
			selectedLegumes: allLegumes.slice(0, 15),
		},
	},
});
// Override argTypes to display loading/clearable/disabled/placeholder controls
Basic.argTypes = {};

export const WithMultiDisplayer = generateStory({
	name: 'With MultiDisplayer',
	description:
		"Il est possible de personnaliser le contenu de la valeur sélectionnée en utilisant la directive `luMultiDisplayer`. Le *template* prend le tableau contenant l'ensemble des valeurs sélectionnées.",
	template: `
<label class="textfield mod-block u-marginTopM">
	<lu-multi-select
		#selectRef
		class="textfield-input"
		[placeholder]="placeholder"
		[options]="legumes"
		[clearable]="clearable"
		[disabled]="disabled"
		[loading]="loading"
		[expanded]="expanded"
		[(ngModel)]="selectedLegumes"
	>
		<ng-container *luMultiDisplayer="let legumes; select: selectRef">
			<span class="numericBadge u-marginRightXXS">{{ legumes.length }}</span>légumes sélectionnés
		</ng-container>
	</lu-multi-select>
	<span class="textfield-label">Label</span>
</label>`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent', 'LuMultiDisplayerDirective'],
	},
	storyPartial: {
		args: {
			selectedLegumes: allLegumes.slice(0, 5),
		},
	},
});

export const WithDisplayer = generateStory({
	name: 'With Displayer',
	description:
		"Il est possible de personnaliser le contenu des *chips* dans l'affichage de la valeur sélectionnée en utilisant la directive `luDisplayer`. Le *template* prend une option parmis les valeurs sélectionnées.",
	template: `
<label class="textfield mod-block u-marginTopM">
	<lu-multi-select
		#selectRef
		class="textfield-input"
		[placeholder]="placeholder"
		[options]="legumes"
		[clearable]="clearable"
		[disabled]="disabled"
		[loading]="loading"
		[expanded]="expanded"
		[(ngModel)]="selectedLegumes"
	>
		<span *luDisplayer="let legume; select: selectRef" [luTooltip]="'Vive les ' + legume.name + '!'">
			🥔 {{ legume.name }} 🥔
		</span>
	</lu-multi-select>
	<span class="textfield-label">Label</span>
</label>`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent', 'LuMultiDisplayerDirective'],
		'@lucca-front/ng/core-select': ['LuDisplayerDirective'],
	},
	storyPartial: {
		args: {
			selectedLegumes: allLegumes.slice(0, 5),
		},
	},
});

export const WithClearer = generateStory({
	name: 'Clearer',
	description: "Il est possible d'afficher un bouton pour vider la sélection l'attribure `clearable`.",
	template: `
<label class="textfield">
	<lu-multi-select
		#selectRef
		class="textfield-input"
		placeholder="Placeholder..."
		[(ngModel)]="selectedLegumes"
		[options]="legumes"
		[clearable]="true"
		[expanded]="expanded"
	>
		<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
	</lu-multi-select>
	<span class="textfield-label">Label</span>
</label>
`,
	neededImports: {
		'@lucca-front/ng/core-select': ['LuOptionDirective'],
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
	storyPartial: {
		args: {
			selectedLegumes: allLegumes.slice(0, 5),
		},
	},
});

export const WithClue = generateStory({
	name: 'Clue',
	description: "Il est possible d'afficher une barre de recherche pour filtrer les options en écoutant l'évènement `(clueChange)`.",
	template: `
<label class="textfield">
	<lu-multi-select
		#selectRef
		class="textfield-input"
		placeholder="Placeholder..."
		[(ngModel)]="selectedLegumes"
		[options]="legumes | filterLegumes:clue"
		(clueChange)="clue = $event"
		[expanded]="expanded"
	>
		<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
	</lu-multi-select>
	<span class="textfield-label">Label</span>
</label>
`,
	neededImports: {
		'@lucca-front/ng/core-select': ['LuOptionDirective'],
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
});

export const WithPagination = generateStory({
	name: 'Pagination',
	description: "Il est possible de charger les options au fur et à mesure en écouteant l'évènement `(nextPage)`.",
	template: `
<label class="textfield">
	<lu-multi-select
		#selectRef
		class="textfield-input"
		placeholder="Placeholder..."
		[(ngModel)]="selectedLegumes"
		[options]="legumes.slice(0, page * 10)"
		(nextPage)="page = page + 1"
		[expanded]="expanded"
	>
		<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
	</lu-multi-select>
	<span class="textfield-label">Label</span>
</label>
`,
	neededImports: {
		'@lucca-front/ng/core-select': ['LuOptionDirective'],
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
});

export const Disabled = generateStory({
	name: 'Disabled',
	description: "Il est possible de désactiver le simple-select en utilisant l'attribut `disabled` ou via un FormControl.",
	template: `
<label class="textfield">
	<lu-multi-select
		#selectRef
		class="textfield-input"
		placeholder="Placeholder..."
		[(ngModel)]="selectedLegumes"
		[options]="legumes"
		[disabled]="true"
		[expanded]="expanded"
	>
		<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
	</lu-multi-select>
	<span class="textfield-label">Label</span>
</label>
`,
	neededImports: {
		'@lucca-front/ng/core-select': ['LuOptionDirective'],
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
	storyPartial: {
		args: {
			selectedLegumes: allLegumes.slice(0, 5),
		},
	},
});

export const WithDisabledOptions = generateStory({
	name: 'Disabled options',
	description: "Il est possible de désactiver certaines options en utilisant la directive `luDisabledOption` sur l'option.",
	template: `
<label class="textfield">
	<lu-multi-select
		#selectRef
		class="textfield-input"
		placeholder="Placeholder..."
		[(ngModel)]="selectedLegumes"
		[options]="legumes"
		[expanded]="expanded"
	>
		<ng-container *luOption="let legume; select: selectRef" [luDisabledOption]="legume.index % 2 === 0">{{ legume.name }}</ng-container>
	</lu-multi-select>
	<span class="textfield-label">Label</span>
</label>
`,
	neededImports: {
		'@lucca-front/ng/core-select': ['LuOptionDirective', 'LuDisabledOptionDirective'],
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
});

export const ApiV3 = generateStory({
	name: 'Api V3',
	description: "Pour récupérer automatiquement les options depuis une api V3 avec pagination et recherche, il suffit d'utiliser la directive `apiV3`.",
	template: `
<label class="textfield">
	<lu-multi-select
		class="textfield-input"
		placeholder="Placeholder..."
		apiV3="/api/v3/axisSections"
		[(ngModel)]="selectedAxisSection"
		[expanded]="expanded"
	></lu-multi-select>
	<span class="textfield-label">Label</span>
</label>
	`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
		'@lucca-front/ng/simple-select/api': ['LuSimpleSelectApiV3Directive'],
	},
});

export const ApiV4 = generateStory({
	name: 'Api V4',
	description: "Pour récupérer automatiquement les options depuis une api V4 avec pagination et recherche, il suffit d'utiliser la directive `apiV4`.",
	template: `
<label class="textfield">
	<lu-multi-select
		class="textfield-input"
		placeholder="Placeholder..."
		apiV4="/organization/structure/api/establishments"
		[(ngModel)]="selectedEstablishment"
		[expanded]="expanded"
	></lu-multi-select>
	<span class="textfield-label">Label</span>
</label>
	`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
		'@lucca-front/ng/simple-select/api': ['LuSimpleSelectApiV4Directive'],
	},
});

export const Responsive = generateStory({
	name: 'Responsive',
	description: "Le panel s'ouvre en dessous du select quand il a assez de place, sinon il s'ouvre au dessus.",
	template: `
<div class="grid" style="height: 100vh;">
	<div class="grid-6@mediaMinXS" style="height: 75vh;">
		<label class="textfield">
			<lu-multi-select
				class="textfield-input"
				[placeholder]="placeholder"
				[options]="legumes"
				[(ngModel)]="selectedLegumes"
		[expanded]="expanded"
			>
			</lu-multi-select>
			<span class="textfield-label">Label</span>
		</label>
	</div>
	<div class="grid-6@mediaMinXS" style="height: 75vh;">
		<label class="textfield">
			<lu-multi-select
				class="textfield-input"
				[placeholder]="placeholder"
				[options]="legumes"
				[(ngModel)]="selectedLegumes"
		[expanded]="expanded"
			>
			</lu-multi-select>
			<span class="textfield-label">Label</span>
		</label>
	</div>
	<div class="grid-6@mediaMinXS" style="height: 25vh;">
		<label class="textfield">
			<lu-multi-select
				class="textfield-input"
				[placeholder]="placeholder"
				[options]="legumes"
				[(ngModel)]="selectedLegumes"
		[expanded]="expanded"
			>
			</lu-multi-select>
			<span class="textfield-label">Label</span>
		</label>
	</div>
	<div class="grid-6@mediaMinXS" style="height: 25vh;">
		<label class="textfield">
			<lu-multi-select
				class="textfield-input"
				[placeholder]="placeholder"
				[options]="legumes"
				[(ngModel)]="selectedLegumes"
		[expanded]="expanded"
			>
			</lu-multi-select>
			<span class="textfield-label">Label</span>
		</label>
	</div>
</div>
	`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
		'@lucca-front/ng/simple-select/api': ['LuSimpleSelectApiV4Directive'],
	},
});

const meta: Meta<LuSelectInputStoryComponent> = {
	title: 'Documentation/Forms/MultiSelect',
	component: LuMultiSelectInputComponent,
	decorators: [
		moduleMetadata({
			imports: [
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
		applicationConfig({
			providers: [provideAnimations()],
		}),
	],
	args: {
		placeholder: 'Placeholder...',
		legumes: allLegumes,
		clearable: false,
		disabled: false,
		loading: false,
		expanded: true,
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