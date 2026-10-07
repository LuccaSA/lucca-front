import { HiddenArgType } from '@/helpers/common-arg-types';
import { getStoryGenerator, intlArgType } from '@/helpers/stories';
import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';
import { AsyncPipe, I18nPluralPipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { LuPluralForms } from '@lucca-front/ng/core';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
	LuCoreSelectPanelHeaderDirective,
	LuCoreSelectTotalCountDirective,
	LuDisabledOptionDirective,
	LuDisplayerDirective,
	LuOptionDirective,
	LuOptionGroupDirective,
	TreeGroupingFn,
	ɵLuOptionOutletDirective,
	luCoreSelectTranslations,
} from '@lucca-front/ng/core-select';
import { LuCoreSelectApiV3Directive, LuCoreSelectApiV4Directive } from '@lucca-front/ng/core-select/api';
import { LuCoreSelectDepartmentsDirective } from '@lucca-front/ng/core-select/department';
import { LuCoreSelectEstablishmentsDirective } from '@lucca-front/ng/core-select/establishment';
import { LuCoreSelectJobQualificationsDirective } from '@lucca-front/ng/core-select/job-qualification';
import { LuCoreSelectArchivedLegalUnitsComponent, LuCoreSelectLegalUnitsDirective } from '@lucca-front/ng/core-select/legal-units';
import { LuCoreSelectOccupationCategoriesDirective } from '@lucca-front/ng/core-select/occupation-category';
import { LuCoreSelectUsersDirective, provideCoreSelectCurrentUserId } from '@lucca-front/ng/core-select/user';
import {
	LuMultiDisplayerDirective,
	LuMultiSelectContentDisplayerComponent,
	LuMultiSelectCounterDisplayerComponent,
	LuMultiSelectDefaultDisplayerComponent,
	LuMultiSelectDisplayerInputDirective,
	LuMultiSelectInputComponent,
	LuMultiSelection,
	luMultiSelectTranslations,
	LuMultiSelectWithSelectAllDirective,
} from '@lucca-front/ng/multi-select';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { TreeSelectDirective } from '@lucca-front/ng/tree-select';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular-vite';
import { interval, map } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { InputAlias, SelectCommonAliasInput } from '../../../helpers/stories';

import { allLegumes, colorNameByColor, coreSelectStory, FilterLegumesPipe, ILegume, LuCoreSelectInputStoryComponent, SortLegumesPipe } from './select.utils';

type LuMultiSelectInputStoryComponent = LuCoreSelectInputStoryComponent & {
	selectedLegumes: ILegume[] | LuMultiSelection<ILegume>;
	legumeSelection?: LuMultiSelection<ILegume>;
	maxValuesShown: number;
	selectedAxisSection: LuMultiSelection<{ id: number; name: string }>;
	selectedEstablishment: LuMultiSelection<{ id: number; name: string }>;
	selectedDepartments: LuMultiSelection<{ id: number; name: string }>;
	selectedLegalUnits: { id: number; name: string }[];
	selectLegume(legume: ILegume, legumes: ILegume[]): ILegume[];
	groupingFn?: TreeGroupingFn<ILegume>;
	legumesPluralFn: (count: number) => LuPluralForms;
	sectionsPluralFn: (count: number) => LuPluralForms;
	establishmentsPluralFn: (count: number) => LuPluralForms;
	usersPluralFn: (count: number) => LuPluralForms;
} & LuMultiSelectInputComponent<ILegume>;

const generateStory = getStoryGenerator<LuMultiSelectInputStoryComponent>({
	decorators: [
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
	...coreSelectStory,
	argTypes: {
		...coreSelectStory.argTypes,
		selectedLegumes: HiddenArgType,
		valuesTpl: HiddenArgType,
		panelHeaderTpl: HiddenArgType,
		optionKey: HiddenArgType,
		maxValuesShown: HiddenArgType,
		selectLegume: HiddenArgType,
		legumesPluralFn: HiddenArgType,
		sectionsPluralFn: HiddenArgType,
		establishmentsPluralFn: HiddenArgType,
		usersPluralFn: HiddenArgType,
	},
});

export const SelectAll = generateStory({
	name: 'Select all',
	description: '',
	template: `<lu-multi-select
	withSelectAll
	[totalCount]="legumes.length"
	[withSelectAllDisplayerLabelFn]="legumesPluralFn"
	[clearable]="clearable"
	[loading]="loading"
	[(ngModel)]="legumeSelection"
	[options]="legumes | filterLegumes:clue"
	[keepSearchAfterSelection]="keepSearchAfterSelection"
	(clueChange)="clue = $event"
/>
<pr-story-model-display>{{ legumeSelection | json }}</pr-story-model-display>`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent', 'LuMultiSelectWithSelectAllDirective'],
		'@lucca-front/ng/core-select': ['LuCoreSelectTotalCountDirective'],
	},
	storyPartial: {
		args: {
			legumeSelection: { mode: 'none' },
			keepSearchAfterSelection: false,
		},
	},
});

export const Basic = generateStory({
	name: 'Basic',
	description: '',
	template: `<lu-multi-select
	#selectRef
	[clearable]="clearable"
	[loading]="loading"
	[keepSearchAfterSelection]="keepSearchAfterSelection"
	[(ngModel)]="selectedLegumes"
	[options]="legumes | filterLegumes:clue"
	(clueChange)="clue = $event"
	[maxValuesShown]="maxValuesShown"
/>`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
	},
	storyPartial: {
		args: {
			selectedLegumes: [],
			keepSearchAfterSelection: false,
		},
		argTypes: {
			clearable: { control: { type: 'boolean' }, table: { category: 'inputs' } },
			maxValuesShown: { control: { type: 'number' }, table: { category: 'inputs' } },
		},
	},
});

export const WithClue = generateStory({
	name: 'Clue',
	description: `Il est possible d'afficher une barre de recherche pour filtrer les options en écoutant l'évènement \`(clueChange)\`.`,
	template: `<lu-multi-select
	#selectRef
	[clearable]="clearable"
	[loading]="loading"
	[keepSearchAfterSelection]="keepSearchAfterSelection"
	[(ngModel)]="selectedLegumes"
	[options]="legumes | filterLegumes:clue"
	(clueChange)="clue = $event"
	[maxValuesShown]="maxValuesShown"
/>`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
	},
	storyPartial: {
		args: {
			selectedLegumes: [],
			keepSearchAfterSelection: false,
		},
	},
});

export const ScrollOnOpen = generateStory({
	name: 'Scroll on open',
	description: `À l’ouverture, le panneau doit être positionné en haut de la liste (aucun défilement parasite), même si aucune valeur n’est sélectionnée.`,
	template: `<lu-multi-select
	#selectRef
	[(ngModel)]="selectedLegumes"
	[options]="legumes | filterLegumes:clue"
	(clueChange)="clue = $event"
/>`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
	},
	storyPartial: {
		args: {
			selectedLegumes: [],
		},
	},
});

export const WithMultiDisplayer = generateStory({
	name: 'With MultiDisplayer',
	description:
		'Il est possible de personnaliser le contenu de la valeur sélectionnée en utilisant la directive `luMultiDisplayer`. Le *template* prend le tableau contenant l’ensemble des valeurs sélectionnées.',
	template: `<lu-multi-select
	#selectRef
	[clearable]="clearable"
	[loading]="loading"
	[(ngModel)]="selectedLegumes"
	[options]="legumes | filterLegumes:clue"
	[keepSearchAfterSelection]="keepSearchAfterSelection"
	(clueChange)="clue = $event"
>
	<ng-container *luMultiDisplayer="let values; select: selectRef">
		<lu-multi-select-counter-displayer [selected]="values" label="légumes sélectionnés" />
	</ng-container>
</lu-multi-select>`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent', 'LuMultiDisplayerDirective', 'LuMultiSelectCounterDisplayerComponent'],
	},
	storyPartial: {
		args: {
			selectedLegumes: [],
			keepSearchAfterSelection: false,
		},
	},
});

export const AllAsDefaultValue = generateStory({
	name: 'With ContentDisplayer',
	description: 'Il est possible de personnaliser le contenu du displayer en utilisant la directive `luMultiDisplayer`. Avec le `ContentDisplayer` il est possible de lui passer n’importe quel contenu',
	template: `<lu-multi-select
	#selectRef
	[clearable]="clearable"
	[loading]="loading"
	[(ngModel)]="selectedLegumes"
	[options]="legumes | filterLegumes:clue"
	[keepSearchAfterSelection]="keepSearchAfterSelection"
	(clueChange)="clue = $event"
>
		<ng-container *luMultiDisplayer="let values; select: selectRef">
		@if (values.length === 0) {
			<lu-multi-select-content-displayer>🥔 All vegetables 🍆</lu-multi-select-content-displayer>
		} @else {
			<ng-container *luOptionOutlet="valuesTpl; value: values || []" />
		}
	</ng-container>
</lu-multi-select>`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent', 'LuMultiDisplayerDirective', 'LuMultiSelectContentDisplayerComponent', 'LuMultiSelectDefaultDisplayerComponent'],
		'@lucca-front/ng/core-select': ['ɵLuOptionOutletDirective'],
	},
	storyPartial: {
		args: {
			valuesTpl: LuMultiSelectDefaultDisplayerComponent,
			selectedLegumes: [],
			keepSearchAfterSelection: false,
		},
	},
});

export const WithDisplayer = generateStory({
	name: 'With Displayer',
	description:
		'Il est possible de personnaliser le contenu des *chips* dans l’affichage de la valeur sélectionnée en utilisant la directive `luDisplayer`. Le *template* prend une option parmi les valeurs sélectionnées.',
	template: `<lu-multi-select
	#selectRef
	[options]="legumes | filterLegumes:clue"
	[keepSearchAfterSelection]="keepSearchAfterSelection"
	(clueChange)="clue = $event"
	[clearable]="clearable"
	[loading]="loading"
	[(ngModel)]="selectedLegumes"
	[maxValuesShown]="maxValuesShown"
>
	<span *luDisplayer="let legume; select: selectRef" [luTooltip]="'Vive les ' + legume.name + '!'">
		🥔 {{ legume.name }} 🥔
	</span>
</lu-multi-select>`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent', 'LuMultiDisplayerDirective'],
		'@lucca-front/ng/core-select': ['LuDisplayerDirective'],
	},
	storyPartial: {
		args: {
			selectedLegumes: allLegumes.slice(0, 5),
			keepSearchAfterSelection: false,
		},
	},
});

export const WithPagination = generateStory({
	name: 'Pagination',
	description:
		'Il est possible de charger les options au fur et à mesure en écoutant l’évènement `(nextPage)`. Le tableau passé à `[options]` reste la liste complète : c’est au consommateur d’afficher la ligne de chargement via l’input `[loading]` pendant qu’il récupère la suite.',
	template: `<lu-multi-select
	#selectRef
	[(ngModel)]="selectedLegumes"
	[options]="(legumes | filterLegumes:clue).slice(0, page * 10)"
	(nextPage)="page = page + 1"
	(clueChange)="clue = $event"
	[maxValuesShown]="maxValuesShown"
>
	<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
</lu-multi-select>`,
	neededImports: {
		'@lucca-front/ng/core-select': ['LuOptionDirective'],
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
	},
});

export const WithDisabledOptions = generateStory({
	name: 'Disabled options',
	description: 'Il est possible de désactiver certaines options en utilisant la directive `luDisabledOption` sur l’option.',
	template: `<lu-multi-select
	#selectRef
	[(ngModel)]="selectedLegumes"
	[options]="legumes | filterLegumes:clue"
	(clueChange)="clue = $event"
	[maxValuesShown]="maxValuesShown"
	[keepSearchAfterSelection]="keepSearchAfterSelection"
>
	<ng-container *luOption="let legume; select: selectRef" [luDisabledOption]="legume.index % 2 === 0">{{ legume.name }}</ng-container>
</lu-multi-select>`,
	storyPartial: {
		args: {
			selectedLegumes: allLegumes.slice(0, 2),
		},
	},
	neededImports: {
		'@lucca-front/ng/core-select': ['LuOptionDirective', 'LuDisabledOptionDirective'],
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
	},
});

export const WithCustomOptionTemplate = generateStory({
	name: 'Custom option template',
	description: 'Le template d’option occupe toute la largeur de la ligne : un contenu réparti avec `justify-content: space-between` aligne bien sa partie droite sur le bord de l’option.',
	template: `<lu-multi-select
	#selectRef
	[(ngModel)]="selectedLegumes"
	[options]="legumes | filterLegumes:clue"
	(clueChange)="clue = $event"
	[maxValuesShown]="maxValuesShown"
>
	<ng-container *luOption="let legume; select: selectRef">
		<span class="pr-u-displayFlex pr-u-justifyContentSpaceBetween">
			<span>{{ legume.name }}</span>
			<span>{{ colorNameByColor[legume.color] }}</span>
		</span>
	</ng-container>
</lu-multi-select>`,
	storyPartial: {
		args: {
			selectedLegumes: [],
			colorNameByColor,
		},
	},
	neededImports: {
		'@lucca-front/ng/core-select': ['LuOptionDirective'],
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
	},
});

export const ApiV3 = generateStory({
	name: 'Api V3',
	description: 'Pour récupérer automatiquement les options depuis une api V3 avec pagination et recherche, il suffit d’utiliser la directive `apiV3`.',
	template: `<lu-multi-select
	apiV3="/api/v3/axisSections"
	withSelectAll
	[withSelectAllDisplayerLabelFn]="sectionsPluralFn"
	[(ngModel)]="selectedAxisSection"
	[maxValuesShown]="maxValuesShown"
	[keepSearchAfterSelection]="keepSearchAfterSelection"
/>
<pr-story-model-display>{{ selectedAxisSection | json }}</pr-story-model-display>`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent', 'LuMultiSelectWithSelectAllDirective'],
		'@lucca-front/ng/core-select/api': ['LuCoreSelectApiV3Directive'],
	},
	storyPartial: {
		args: {
			selectedAxisSection: { mode: 'none' },
		},
	},
});

export const ApiV4 = generateStory({
	name: 'Api V4',
	description: 'Pour récupérer automatiquement les options depuis une api V4 avec pagination et recherche, il suffit d’utiliser la directive `apiV4`.',
	template: `<lu-multi-select
	withSelectAll
	[withSelectAllDisplayerLabelFn]="establishmentsPluralFn"
	apiV4="/organization/structure/api/establishments"
	[(ngModel)]="selectedEstablishment"
	[maxValuesShown]="maxValuesShown"
	[keepSearchAfterSelection]="keepSearchAfterSelection"
/>
<pr-story-model-display>{{ selectedEstablishment | json }}</pr-story-model-display>`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent', 'LuMultiSelectWithSelectAllDirective'],
		'@lucca-front/ng/core-select/api': ['LuCoreSelectApiV4Directive'],
	},
	storyPartial: {
		args: {
			selectedEstablishment: { mode: 'none' },
		},
	},
});

export const Establishment = generateStory({
	name: 'Establishment Select',
	description: 'Pour saisir un établissement, il suffit d’utiliser la directive `establishments`',
	template: `<lu-multi-select
	establishments
	[(ngModel)]="selectedEstablishments"
	[keepSearchAfterSelection]="keepSearchAfterSelection"
/>
<pr-story-model-display>{{ selectedEstablishments | json }}</pr-story-model-display>`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
		'@lucca-front/ng/core-select/establishment': ['LuCoreSelectEstablishmentsDirective'],
	},
	storyPartial: {
		args: {
			selectedEstablishment: { mode: 'none' },
		},
	},
});

export const Department = generateStory({
	name: 'Departement Select',
	description: 'Pour saisir un département, il suffit d’utiliser la directive `departments`',
	template: `<lu-multi-select
	departments
	[(ngModel)]="selectedDepartements"
	[keepSearchAfterSelection]="keepSearchAfterSelection"
/>{{ selectedDepartements | json }}`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
		'@lucca-front/ng/core-select/departments': ['LuCoreSelectDepartmentsDirective'],
	},
	storyPartial: {
		args: {
			selectedDepartments: { mode: 'none' },
		},
	},
});

export const Tree = generateStory({
	name: 'Tree Select',
	description: '',
	template: `<lu-multi-select
	[options]="legumes | filterLegumes:clue"
	(clueChange)="clue = $event"
	[treeSelect]="groupingFn"
	[(ngModel)]="selectedTree"
/>{{ selectedTree | json }}`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent', 'LuMultiSelectWithSelectAllDirective'],
		'@lucca-front/ng/tree-select': ['TreeSelectDirective'],
	},
	storyPartial: {
		args: {
			groupingFn: (legume: ILegume, items: ILegume[]) => {
				const parent = items.find((l) => l.color === legume.color);
				if (!parent || parent === legume) {
					return null;
				}
				return parent;
			},
		},
	},
});

export const User = generateStory({
	name: 'User Select',
	description: 'Pour saisir des utilisateurs, il suffit d’utiliser la directive `users`',
	template: `<lu-multi-select
	users
	[(ngModel)]="selectedUsers"
	[keepSearchAfterSelection]="keepSearchAfterSelection"
/>`,
	storyPartial: {
		args: {
			keepSearchAfterSelection: false,
		},
	},
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
		'@lucca-front/ng/core-select/user': ['LuCoreSelectUsersDirective'],
	},
});

export const UserWithSelectAll = generateStory({
	name: 'User Select (select all)',
	description: 'Pour saisir des utilisateurs, il suffit d’utiliser la directive `users` et `withSelectAll`',
	template: `<lu-multi-select
	users
	withSelectAll
	[withSelectAllDisplayerLabelFn]="usersPluralFn"
	[keepSearchAfterSelection]="keepSearchAfterSelection"
	[(ngModel)]="selectedUsers"
/>`,
	storyPartial: {
		args: {
			keepSearchAfterSelection: false,
		},
	},
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
		'@lucca-front/ng/core-select/user': ['LuCoreSelectUsersDirective'],
	},
});

export const FormerUser = generateStory({
	name: 'User Select (with former)',
	description: 'Pour saisir des utilisateurs, il suffit d’utiliser la directive `users`',
	template: `<lu-multi-select
	users
	enableFormerEmployees
	[keepSearchAfterSelection]="keepSearchAfterSelection"
	[(ngModel)]="selectedUsers"
/>`,
	storyPartial: {
		args: {
			keepSearchAfterSelection: false,
		},
	},
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
		'@lucca-front/ng/core-select/user': ['LuCoreSelectUsersDirective'],
	},
});

export const JobQualification = generateStory({
	name: 'JobQualification Select',
	description: 'Pour saisir une qualification, il suffit d’utiliser la directive `jobQualifications`',
	template: `<lu-multi-select
	jobQualifications
	[keepSearchAfterSelection]="keepSearchAfterSelection"
	[(ngModel)]="selectedJobQualifications"
/>`,
	storyPartial: {
		args: {
			keepSearchAfterSelection: false,
		},
	},
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
		'@lucca-front/ng/core-select/job-qualification': ['LuCoreSelectJobQualificationsDirective'],
	},
});

export const OccupationCategory = generateStory({
	name: 'OccupationCategory Select',
	description: 'Pour saisir une catégorie d’occupation, il suffit d’utiliser la directive `occupationCategories`',
	template: `<lu-multi-select
	placeholder="Placeholder..."
	occupationCategories
	[(ngModel)]="selectedOccupationCategories"
/>`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
		'@lucca-front/ng/core-select/occupation-category': ['LuCoreSelectOccupationCategoriesDirective'],
	},
});

export const LegalUnits = generateStory({
	name: 'LegalUnit Select',
	description: 'Pour saisir une entité légale, il suffit d’utiliser la directive `legalUnits`',
	template: `<lu-multi-select
	legalUnits
	[(ngModel)]="selectedLegalUnits"
	[keepSearchAfterSelection]="keepSearchAfterSelection"
/>
<pr-story-model-display>{{ selectedLegalUnits | json }}</pr-story-model-display>`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
		'@lucca-front/ng/core-select/legal-units': ['LuCoreSelectLegalUnitsDirective'],
	},
	storyPartial: {
		args: {
			selectedLegalUnits: [],
		},
	},
});

export const LegalUnitsWithArchived = generateStory({
	name: 'LegalUnit Select with Archived',
	description: 'Utiliser l’input `enableArchivedLegalUnits` pour afficher un bouton dans le panel permettant d’inclure les entités légales archivées.',
	template: `<lu-multi-select
	legalUnits
	[enableArchivedLegalUnits]="true"
	[(ngModel)]="selectedLegalUnits"
	[keepSearchAfterSelection]="keepSearchAfterSelection"
/>
<pr-story-model-display>{{ selectedLegalUnits | json }}</pr-story-model-display>`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
		'@lucca-front/ng/core-select/legal-units': ['LuCoreSelectLegalUnitsDirective', 'LuCoreSelectArchivedLegalUnitsComponent'],
	},
	storyPartial: {
		args: {
			selectedLegalUnits: [],
		},
	},
});

export const GroupBy = generateStory({
	name: 'Group options',
	description: 'Pour grouper les options, il suffit d’utiliser la directive `luOptionGroup`.',
	template: `<lu-multi-select
	#selectRef
	class="textfield-input"
	[(ngModel)]="selectedLegumes"
	[options]="legumes | filterLegumes:clue | sortLegumes:(clue ? ['name', legumeColor] : [legumeColor])"
	(clueChange)="clue = $event"
	[maxValuesShown]="maxValuesShown"
	clearable
>
	<ng-container *luOptionGroup="let group by legumeColor; select: selectRef">
		Légume {{colorNameByColor[group.key]}}{{group.options.length > 1 ? 's' : ''}}
	</ng-container>
</lu-multi-select>
<pr-story-model-display>{{ selectedLegumes | json }}</pr-story-model-display>`,
	neededImports: {
		'@lucca-front/ng/core-select': ['LuOptionDirective', 'LuOptionGroupDirective'],
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
	},
	storyPartial: {
		args: {
			legumeColor: (legume: ILegume) => legume.color,
			colorNameByColor,
		},
	},
});

export const GroupBySelectAll = generateStory({
	name: 'Group options (with selectAll)',
	description: 'Pour grouper les options, il suffit d’utiliser la directive `luOptionGroup`.',
	template: `<lu-multi-select
	#selectRef
	withSelectAll
	[withSelectAllDisplayerLabelFn]="legumesPluralFn"
	[totalCount]="legumes.length"
	class="textfield-input"
	[(ngModel)]="selectedLegumes"
	[options]="legumes | filterLegumes:clue | sortLegumes:(clue ? ['name', legumeColor] : [legumeColor])"
	(clueChange)="clue = $event"
	[maxValuesShown]="maxValuesShown"
	[keepSearchAfterSelection]="keepSearchAfterSelection"
>
	<ng-container *luOptionGroup="let group by legumeColor; select: selectRef">
		Légume {{colorNameByColor[group.key]}}{{group.options.length > 1 ? 's' : ''}}
	</ng-container>
</lu-multi-select>
<pr-story-model-display>{{ selectedLegumes | json }}</pr-story-model-display>`,
	neededImports: {
		'@lucca-front/ng/core-select': ['LuOptionDirective', 'LuOptionGroupDirective', 'LuCoreSelectTotalCountDirective'],
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent', 'LuMultiSelectWithSelectAllDirective'],
	},
	storyPartial: {
		args: {
			selectedLegumes: { mode: 'none' },
			legumeColor: (legume: ILegume) => legume.color,
			colorNameByColor,
		},
	},
});

export const TestDynamicDisabled = generateStory({
	name: '[test] Dynamic disabled',
	description: 'technical test to check dynamic disabled',
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
	},
	template: `<lu-multi-select
	#selectRef
	[clearable]="clearable"
	[loading]="loading"
	[disabled]="dynamicDisabled | async"
	[(ngModel)]="selectedLegumes"
	[options]="legumes | filterLegumes:clue"
	(clueChange)="clue = $event"
	[maxValuesShown]="maxValuesShown"
	[keepSearchAfterSelection]="keepSearchAfterSelection"
/>`,
	storyPartial: {
		args: {
			selectedLegumes: allLegumes.slice(0, 15),
			dynamicDisabled: interval(2000).pipe(
				map((n) => !!(n % 2)),
				startWith(true),
			),
		} as any,
		argTypes: {
			clearable: { control: { type: 'boolean' }, table: { category: 'inputs' } },
			maxValuesShown: { control: { type: 'number' }, table: { category: 'inputs' } },
		},
	},
});

export const AddOption = generateStory({
	name: 'Add option',
	description: 'Pour ajouter une option, il suffit d’utiliser l’input `addOptionStrategy` et de s’abonner à l’output `addOption`. Le label est customisable via l’input `addOptionLabel`.',
	template: `<div class="pr-u-marginBlockEnd200">There is {{ legumes.length }} legumes in the list.</div>
<lu-multi-select
	#selectRef
	[(ngModel)]="selectedLegumes"
	[options]="legumes | filterLegumes:clue"
	[addOptionLabel]="'Ajouter ' + (clue || 'un légume')"
	[addOptionStrategy]="addOptionStrategy"
	(clueChange)="clue = $event"
	[keepSearchAfterSelection]="keepSearchAfterSelection"
	(addOption)="legumes = addLegume($event, legumes); selectedLegumes = selectLegume(legumes[legumes.length - 1], selectedLegumes)"
/>`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
	},
	storyPartial: {
		argTypes: {
			addOptionLabel: {
				control: { type: 'text' },
				description: 'Label affiché sur le bouton d’ajout d’option.',
				table: { category: 'inputs' },
			},
			addOptionStrategy: {
				description: 'Définit les conditions pour afficher le bouton d’ajout d’option.',
				options: ['never', 'always', 'if-empty-clue', 'if-not-empty-clue'],
				control: {
					type: 'select',
				},
				table: { category: 'inputs' },
			},
		},
		args: {
			addOptionLabel: 'Ajouter un légume',
			addOptionStrategy: 'always',
			addLegume: (name: string, existing: ILegume[]) => [
				...existing,
				{
					name: name || 'Légume sans titre',
					index: existing.length,
					color: existing[0].color,
				},
			],
			selectLegume: (legume: ILegume, legumes: ILegume[]) => [...legumes, legume],
		},
	},
});

export const CustomPanelHeader = generateStory({
	name: 'Custom Panel Header',
	description: 'Pour customiser l’en-tête du panel, il suffit d’utiliser la directive `luSelectPanelHeader`.',
	template: `<lu-multi-select
	#selectRef
	[(ngModel)]="selectedLegumes"
	[options]="legumes | filterLegumes:clue"
	(clueChange)="clue = $event"
	[keepSearchAfterSelection]="keepSearchAfterSelection"
>
	<h1 *luSelectPanelHeader="selectRef">Custom Header</h1>
</lu-multi-select>`,
	neededImports: {
		'@lucca-front/ng/core-select': ['LuCoreSelectPanelHeaderDirective'],
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
	},
});

export const IntlOverride = generateStory({
	name: 'Intl Override',
	description: `Il est possible de personnaliser les traductions du composant en utilisant l'input \`[intl]\`. Cela permet de surcharger les labels par défaut (placeholder, search, clear, emptyResults, selectAll, etc.).`,
	template: `<lu-multi-select
	#selectRef
	[options]="legumes | filterLegumes:clue"
	(clueChange)="clue = $event"
	[(ngModel)]="selectedLegumes"
	[intl]="{
		placeholder: 'Choose vegetables...',
		search: 'Search for vegetables',
		clear: 'Remove all',
		clearSearch: 'Clear the search field',
		emptyResults: 'No vegetables found matching your search.',
		emptyOptions: 'No vegetables available.',
		emptySelection: 'No vegetables selected.',
		expand: 'Show more',
		reduce: 'Show less',
		selectAll: 'Select all vegetables',
		unselectAll: 'Unselect all vegetables',
		loading: 'Fetching vegetables...'
	}"
	clearable
/>`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
	},
	storyPartial: {
		args: {
			selectedLegumes: [],
		},
	},
});

const meta: Meta<InputAlias<LuMultiSelectInputStoryComponent, SelectCommonAliasInput>> = {
	title: 'Documentation/Forms/MultiSelect',
	argTypes: {
		intl: intlArgType([luCoreSelectTranslations, luMultiSelectTranslations], 'ILuMultiSelectLabel & LuCoreSelectLabel'),
	},
	component: LuMultiSelectInputComponent,
	decorators: [
		moduleMetadata({
			imports: [
				I18nPluralPipe,
				FormsModule,
				FilterLegumesPipe,
				SortLegumesPipe,
				LuMultiSelectInputComponent,
				LuMultiDisplayerDirective,
				ɵLuOptionOutletDirective,
				LuMultiSelectWithSelectAllDirective,
				LuOptionDirective,
				LuOptionGroupDirective,
				LuDisplayerDirective,
				LuTooltipModule,
				LuCoreSelectApiV3Directive,
				LuCoreSelectApiV4Directive,
				LuCoreSelectTotalCountDirective,
				LuCoreSelectEstablishmentsDirective,
				LuCoreSelectDepartmentsDirective,
				LuCoreSelectUsersDirective,
				LuCoreSelectJobQualificationsDirective,
				LuCoreSelectLegalUnitsDirective,
				LuCoreSelectArchivedLegalUnitsComponent,
				LuCoreSelectOccupationCategoriesDirective,
				LuCoreSelectPanelHeaderDirective,
				LuDisabledOptionDirective,
				LuMultiSelectDisplayerInputDirective,
				LuMultiSelectCounterDisplayerComponent,
				LuMultiSelectContentDisplayerComponent,
				AsyncPipe,
				TreeSelectDirective,
				StoryModelDisplayComponent,
			],
		}),
		applicationConfig({
			providers: [provideAnimations(), provideHttpClient(), provideCoreSelectCurrentUserId(() => 66)],
		}),
	],
	args: {
		legumes: allLegumes,
		clearable: true,
		keepSearchAfterSelection: false,
		loading: false,
		maxValuesShown: 500,
		selectedLegumes: [],
		page: 1,
		legumesPluralFn: (count: number) => ({ one: `${count} légume`, other: `${count} légumes` }),
		sectionsPluralFn: (count: number) => ({ one: `${count} section`, other: `${count} sections` }),
		establishmentsPluralFn: (count: number) => ({ one: `${count} établissement`, other: `${count} établissements` }),
		usersPluralFn: (count: number) => ({ one: `${count} utilisateur`, other: `${count} utilisateurs` }),
	},
	parameters: {
		docs: {
			description: {
				component: Basic.parameters?.['docs'].description.story,
			},
		},
	},
};

export default meta;
