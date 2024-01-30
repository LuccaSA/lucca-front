import { I18nPluralPipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LuDisabledOptionDirective, LuDisplayerDirective, LuOptionDirective, LuOptionGroupDirective } from '@lucca-front/ng/core-select';
import { LuCoreSelectApiV3Directive, LuCoreSelectApiV4Directive } from '@lucca-front/ng/core-select/api';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { Meta, applicationConfig, moduleMetadata } from '@storybook/angular';
import { HiddenArgType } from 'stories/helpers/common-arg-types';
import { useDocumentationStory } from 'stories/helpers/stories';
import { ILegume, LuSelectInputStoryComponent, allLegumes, colorNameByColor, generateStory } from './select.utils';

// We have to declare it here to avoid type conflict with autogenerated story type from the generateStory function call.
const hiddenArgTypes = {
	optionComparer: HiddenArgType,
	options: HiddenArgType,
	optionTpl: HiddenArgType,
	overlayConfig: HiddenArgType,
	valueTpl: HiddenArgType,
	previousPage: HiddenArgType,
	nextPage: HiddenArgType,
	clueChange: HiddenArgType,
	legumes: HiddenArgType,
	legumeColor: HiddenArgType,
	page: HiddenArgType,
	colorNameByColor: HiddenArgType,
};
export const Basic = generateStory({
	name: 'Basic',
	description: '',
	template: `
	<lu-simple-select
		#selectRef
		[placeholder]="placeholder"
		[options]="legumes | filterLegumes:clue"
		(clueChange)="clue = $event"
		[clearable]="clearable"
		[disabled]="disabled"
		[loading]="loading"
		[(ngModel)]="value"
	>
		<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
	</lu-simple-select>
`,
	neededImports: {
		'@lucca-front/ng/core-select': ['LuOptionDirective'],
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
});
// Override argTypes to display loading/clearable/disabled/placeholder controls
Basic.argTypes = hiddenArgTypes;

export const Minimal = generateStory({
	name: 'Minimal',
	description: "Pas besoin systématiquement de `*luOption`, le simple-select affiche par défaut la propriété `name` ou l'option elle-même.",
	template: `
	<lu-simple-select
		placeholder="Placeholder..."
		[(ngModel)]="value"
		[options]="legumes | filterLegumes:clue"
		(clueChange)="clue = $event"
	></lu-simple-select>
`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
});

export const WithDisplayer = generateStory({
	name: 'Displayer',
	description: "Il est possible de customiser l'affichage de l'option sélectionnée en utilisant `*luDisplayer`.",
	template: `
	<lu-simple-select
		#selectRef
		placeholder="Placeholder..."
		[(ngModel)]="value"
		[options]="legumes | filterLegumes:clue"
		(clueChange)="clue = $event"
	>
		<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
		<ng-container *luDisplayer="let legume; select: selectRef">🥗🥗 {{ legume.name }} 🥗🥗</ng-container>
	</lu-simple-select>
`,
	neededImports: {
		'@lucca-front/ng/core-select': ['LuOptionDirective'],
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent', 'LuDisplayerDirective'],
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
	<lu-simple-select
		#selectRef
		placeholder="Placeholder..."
		[(ngModel)]="value"
		[options]="legumes | filterLegumes:clue"
		(clueChange)="clue = $event"
	>
		<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
	</lu-simple-select>
`,
	neededImports: {
		'@lucca-front/ng/core-select': ['LuOptionDirective'],
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
});

export const WithPagination = generateStory({
	name: 'Pagination',
	description: "Il est possible de charger les options au fur et à mesure en écoutant l'évènement `(nextPage)`.",
	template: `
	<lu-simple-select
		#selectRef
		placeholder="Placeholder..."
		[(ngModel)]="value"
		[options]="legumes.slice(0, page * 10)"
		(nextPage)="page = page + 1"
	>
		<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
	</lu-simple-select>
`,
	neededImports: {
		'@lucca-front/ng/core-select': ['LuOptionDirective'],
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
});

export const WithDisabledOptions = generateStory({
	name: 'Disabled options',
	description: "Il est possible de désactiver certaines options en utilisant la directive `luDisabledOption` sur l'option.",
	template: `
	<lu-simple-select
		#selectRef
		placeholder="Placeholder..."
		[(ngModel)]="value"
		[options]="legumes"
	>
		<ng-container *luOption="let legume; select: selectRef" [luDisabledOption]="legume.index % 2 === 0">{{ legume.name }}</ng-container>
	</lu-simple-select>
`,
	neededImports: {
		'@lucca-front/ng/core-select': ['LuOptionDirective'],
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent', 'LuDisabledOptionDirective'],
	},
});

export const ApiV3 = generateStory({
	name: 'Api V3',
	description: "Pour récupérer automatiquement les options depuis une api V3 avec pagination et recherche, il suffit d'utiliser la directive `apiV3`.",
	template: `
	<lu-simple-select
		placeholder="Placeholder..."
		apiV3="/api/v3/axisSections"
		[(ngModel)]="selectedAxisSection"
	></lu-simple-select>
	`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
		'@lucca-front/ng/core-select/api': ['LuCoreSelectApiV3Directive'],
	},
});

export const ApiV4 = generateStory({
	name: 'Api V4',
	description: "Pour récupérer automatiquement les options depuis une api V4 avec pagination et recherche, il suffit d'utiliser la directive `apiV4`.",
	template: `
	<lu-simple-select
		placeholder="Placeholder..."
		apiV4="/organization/structure/api/establishments"
		[(ngModel)]="selectedEstablishment"
	></lu-simple-select>
	`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
		'@lucca-front/ng/core-select/api': ['LuCoreSelectApiV4Directive'],
	},
});

export const GroupBy = generateStory({
	name: 'Group options',
	description: "Pour grouper les options, il suffit d'utiliser la directive `luOptionGroup`.",
	template: `
	<lu-simple-select
		#selectRef
		class="textfield-input"
		placeholder="Placeholder..."
		[(ngModel)]="value"
		[options]="legumes | filterLegumes:clue"
		(clueChange)="clue = $event"
	>
		<ng-container *luOptionGroup="let group by legumeColor; select: selectRef">
			Légume {{colorNameByColor[group.key]}}{{group.options.length > 1 ? 's' : ''}}
		</ng-container>
	</lu-simple-select>
	`,
	neededImports: {
		'@lucca-front/ng/core-select': ['LuOptionDirective', 'LuOptionGroupDirective'],
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
	storyPartial: {
		args: {
			legumes: [...allLegumes].sort((a, b) => colorNameByColor[a.color].localeCompare(colorNameByColor[b.color])),
			legumeColor: (legume: ILegume) => legume.color,
			colorNameByColor: {
				green: 'vert',
				purple: 'violet',
				red: 'rouge',
				orange: 'orange',
				white: 'blanc',
				yellow: 'jaune',
				brown: 'marron',
			},
		},
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
			imports: [
				FormsModule,
				I18nPluralPipe,
				LuDisplayerDirective,
				LuOptionDirective,
				FilterLegumesPipe,
				LuCoreSelectApiV3Directive,
				LuCoreSelectApiV4Directive,
				LuDisabledOptionDirective,
				LuOptionGroupDirective,
			],
		}),
		applicationConfig({ providers: [provideHttpClient()] }),
	],
	args: {
		placeholder: 'Placeholder...',
		legumes: allLegumes,
		clearable: true,
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
		legumeColor: { control: false },
		colorNameByColor: { control: false },
	},
	parameters: {
		docs: useDocumentationStory(Basic),
	},
};

export default meta;
