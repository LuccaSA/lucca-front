import { provideHttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LuDisabledOptionDirective, LuDisplayerDirective, LuOptionDirective } from '@lucca-front/ng/core-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { LuSimpleSelectApiV3Directive, LuSimpleSelectApiV4Directive } from '@lucca-front/ng/simple-select/api';
import { Meta, applicationConfig, moduleMetadata } from '@storybook/angular';
import { useDocumentationStory } from 'stories/helpers/stories';
import { ILegume, LuSelectInputStoryComponent, allLegumes, generateStory } from './select.utils';

export const Basic = generateStory({
	name: 'Basic',
	description: '',
	template: `
<label class="textfield">
	<lu-simple-select
		#selectRef
		class="textfield-input"
		[placeholder]="placeholder"
		[options]="legumes"
		[clearable]="clearable"
		[disabled]="disabled"
		[loading]="loading"
		[(ngModel)]="value"
	>
		<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
	</lu-simple-select>
	<span class="textfield-label">Label</span>
</label>
`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent', 'LuOptionDirective'],
	},
});
// Override argTypes to display loading/clearable/disabled/placeholder controls
Basic.argTypes = {};

export const Minimal = generateStory({
	name: 'Minimal',
	description: "Pas besoin systématiquement de `*luOption`, le simple-select affiche par défaut la propriété `name` ou l'option elle-même.",
	template: `
<label class="textfield">
	<lu-simple-select
		class="textfield-input"
		placeholder="Placeholder..."
		[options]="legumes"
		[(ngModel)]="value"
	></lu-simple-select>
	<span class="textfield-label">Label</span>
</label>
`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
});

export const WithDisplayer = generateStory({
	name: 'Displayer',
	description: "Il est possible de customiser l'affichage de l'option sélectionnée en utilisant `*luDisplayer`.",
	template: `
<label class="textfield">
	<lu-simple-select
		#selectRef
		class="textfield-input"
		placeholder="Placeholder..."
		[(ngModel)]="value"
		[options]="legumes"
	>
		<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
		<ng-container *luDisplayer="let legume; select: selectRef">🥗🥗 {{ legume.name }} 🥗🥗</ng-container>
	</lu-simple-select>
	<span class="textfield-label">Label</span>
</label>
`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent', 'LuOptionDirective', 'LuDisplayerDirective'],
	},
	storyPartial: {
		args: {
			value: allLegumes[4],
		},
	},
});

export const WithClearer = generateStory({
	name: 'Clearer',
	description: "Il est possible d'afficher un bouton pour vider la sélection l'attribure `clearable`.",
	template: `
<label class="textfield">
	<lu-simple-select
		#selectRef
		class="textfield-input"
		placeholder="Placeholder..."
		[(ngModel)]="value"
		[options]="legumes"
		[clearable]="true"
	>
		<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
	</lu-simple-select>
	<span class="textfield-label">Label</span>
</label>
`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent', 'LuOptionDirective'],
	},
	storyPartial: {
		args: {
			value: allLegumes[4],
		},
	},
});

export const WithClue = generateStory({
	name: 'Clue',
	description: "Il est possible d'afficher une barre de recherche pour filtrer les options en écoutant l'évènement `(clueChange)`.",
	template: `
<label class="textfield">
	<lu-simple-select
		#selectRef
		class="textfield-input"
		placeholder="Placeholder..."
		[(ngModel)]="value"
		[options]="legumes | filterLegumes:clue"
		(clueChange)="clue = $event"
	>
		<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
	</lu-simple-select>
	<span class="textfield-label">Label</span>
</label>
`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent', 'LuOptionDirective'],
	},
});

export const WithPagination = generateStory({
	name: 'Pagination',
	description: "Il est possible de charger les options au fur et à mesure en écouteant l'évènement `(nextPage)`.",
	template: `
<label class="textfield">
	<lu-simple-select
		#selectRef
		class="textfield-input"
		placeholder="Placeholder..."
		[(ngModel)]="value"
		[options]="legumes.slice(0, page * 10)"
		(nextPage)="page = page + 1"
	>
		<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
	</lu-simple-select>
	<span class="textfield-label">Label</span>
</label>
`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent', 'LuOptionDirective'],
	},
});

export const Disabled = generateStory({
	name: 'Disabled',
	description: "Il est possible de désactiver le simple-select en utilisant l'attribut `disabled` ou via un FormControl.",
	template: `
<label class="textfield">
	<lu-simple-select
		#selectRef
		class="textfield-input"
		placeholder="Placeholder..."
		[(ngModel)]="value"
		[options]="legumes"
		[disabled]="true"
	>
		<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
	</lu-simple-select>
	<span class="textfield-label">Label</span>
</label>
`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent', 'LuOptionDirective'],
	},
});

export const WithDisabledOptions = generateStory({
	name: 'Disabled options',
	description: "Il est possible de désactiver certaines options en utilisant la directive `luDisabledOption` sur l'option.",
	template: `
<label class="textfield">
	<lu-simple-select
		#selectRef
		class="textfield-input"
		placeholder="Placeholder..."
		[(ngModel)]="value"
		[options]="legumes"
	>
		<ng-container *luOption="let legume; select: selectRef" [luDisabledOption]="legume.index % 2 === 0">{{ legume.name }}</ng-container>
	</lu-simple-select>
	<span class="textfield-label">Label</span>
</label>
`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent', 'LuOptionDirective', 'LuDisabledOptionDirective'],
	},
});

export const ApiV3 = generateStory({
	name: 'Api V3',
	description: "Pour récupérer automatiquement les options depuis une api V3 avec pagination et recherche, il suffit d'utiliser la directive `apiV3`.",
	template: `
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
	<lu-simple-select
		class="textfield-input"
		placeholder="Placeholder..."
		apiV4="/organization/structure/api/establishments"
		[(ngModel)]="selectedEstablishment"
	></lu-simple-select>
	<span class="textfield-label">Label</span>
</label>
	`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
		'@lucca-front/ng/simple-select/api': ['LuSimpleSelectApiV4Directive'],
	},
});

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
			imports: [FormsModule, LuDisplayerDirective, LuOptionDirective, FilterLegumesPipe, LuSimpleSelectApiV3Directive, LuSimpleSelectApiV4Directive, LuDisabledOptionDirective],
		}),
		applicationConfig({ providers: [provideHttpClient()] }),
	],
	args: {
		placeholder: 'Placeholder...',
		legumes: allLegumes,
		clearable: false,
		disabled: false,
		loading: false,
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
	},
	parameters: {
		docs: useDocumentationStory(Basic),
	},
};

export default meta;
