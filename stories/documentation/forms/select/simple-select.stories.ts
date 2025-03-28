import { I18nPluralPipe, SlicePipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LuCoreSelectNoClueDirective, LuCoreSelectPanelHeaderDirective, LuDisabledOptionDirective, LuDisplayerDirective, LuOptionDirective, LuOptionGroupDirective } from '@lucca-front/ng/core-select';
import { LuCoreSelectApiV3Directive, LuCoreSelectApiV4Directive } from '@lucca-front/ng/core-select/api';
import { LuCoreSelectEstablishmentsDirective } from '@lucca-front/ng/core-select/establishment';
import { LuCoreSelectJobQualificationsDirective } from '@lucca-front/ng/core-select/job-qualification';
import { LuCoreSelectUsersDirective, provideCoreSelectCurrentUserId } from '@lucca-front/ng/core-select/user';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { LuUserDisplayPipe } from '@lucca-front/ng/user';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { HiddenArgType } from 'stories/helpers/common-arg-types';
import { getStoryGenerator, useDocumentationStory } from 'stories/helpers/stories';
import { LuCoreSelectLegumesDirective } from './custom-api-example.component';
import { LuCoreSelectCustomEstablishmentsDirective } from './custom-establishment-example.component';
import { LuCoreSelectCustomUsersDirective } from './custom-user-example.component';
import { allLegumes, colorNameByColor, coreSelectStory, FilterLegumesPipe, ILegume, LuCoreSelectInputStoryComponent, SortLegumesPipe } from './select.utils';

export type LuSimpleSelectInputStoryComponent = LuCoreSelectInputStoryComponent & {
	selectedLegume: ILegume | null;
} & LuSimpleSelectInputComponent<ILegume>;

const generateStory = getStoryGenerator<LuSimpleSelectInputStoryComponent>({
	...coreSelectStory,
	argTypes: {
		...coreSelectStory.argTypes,
		selectedLegume: HiddenArgType,
	},
});

export const Basic = generateStory({
	name: 'Basic',
	description: '',
	template: `<lu-simple-select
	#selectRef
	[placeholder]="placeholder"
	[options]="legumes | filterLegumes:clue"
	(clueChange)="clue = $event"
	[clearable]="clearable"
	[loading]="loading"
	[(ngModel)]="selectedLegume"
>
	<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
</lu-simple-select>`,
	neededImports: {
		'@lucca-front/ng/core-select': ['LuOptionDirective'],
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
	storyPartial: {
		argTypes: {
			clearable: { control: { type: 'boolean' } },
			placeholder: { control: { type: 'text' } },
		},
	},
});

export const Minimal = generateStory({
	name: 'Minimal',
	description: "Pas besoin systématiquement de `*luOption`, le simple-select affiche par défaut la propriété `name` ou l'option elle-même.",
	template: `<lu-simple-select
	placeholder="Placeholder…"
	[(ngModel)]="selectedLegume"
	[options]="legumes | filterLegumes:clue"
	(clueChange)="clue = $event"
></lu-simple-select>`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
});

export const WithDisplayer = generateStory({
	name: 'Displayer',
	description: "Il est possible de customiser l'affichage de l'option sélectionnée en utilisant `*luDisplayer`.",
	template: `<lu-simple-select
	#selectRef
	placeholder="Placeholder…"
	[(ngModel)]="selectedLegume"
	[options]="legumes | filterLegumes:clue"
	(clueChange)="clue = $event"
>
	<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
	<ng-container *luDisplayer="let legume; select: selectRef">🥗🥗 {{ legume.name }} 🥗🥗</ng-container>
</lu-simple-select>`,
	neededImports: {
		'@lucca-front/ng/core-select': ['LuOptionDirective'],
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent', 'LuDisplayerDirective'],
	},
	storyPartial: {
		args: {
			selectedLegume: allLegumes[4],
		},
	},
});

export const WithClue = generateStory({
	name: 'Clue',
	description: "Il est possible d'afficher une barre de recherche pour filtrer les options en écoutant l'évènement `(clueChange)`.",
	template: `<lu-simple-select
	#selectRef
	placeholder="Placeholder…"
	[(ngModel)]="selectedLegume"
	[options]="legumes | filterLegumes:clue"
	(clueChange)="clue = $event"
>
	<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
</lu-simple-select>`,
	neededImports: {
		'@lucca-front/ng/core-select': ['LuOptionDirective'],
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
});

export const WithPagination = generateStory({
	name: 'Pagination',
	description: "Il est possible de charger les options au fur et à mesure en écoutant l'évènement `(nextPage)`.",
	template: `<lu-simple-select
	#selectRef
	placeholder="Placeholder…"
	[(ngModel)]="selectedLegume"
	[options]="legumes | slice : 0 : page * 10"
	(nextPage)="page = page + 1"
>
	<ng-container *luOption="let legume; select: selectRef">{{ legume.name }}</ng-container>
</lu-simple-select>`,
	neededImports: {
		'@lucca-front/ng/core-select': ['LuOptionDirective'],
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
});

export const WithClearer = generateStory({
	name: 'Clearer',
	description: "Il est possible vider le contenu du select via l'input clearable",
	template: `<lu-simple-select
	#selectRef
	placeholder="Placeholder…"
	[(ngModel)]="selectedLegume"
	[options]="legumes"
	clearable
/>`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
	storyPartial: {
		args: {
			selectedLegume: allLegumes[15],
		},
	},
});

export const WithDisabledOptions = generateStory({
	name: 'Disabled options',
	description: "Il est possible de désactiver certaines options en utilisant la directive `luDisabledOption` sur l'option.",
	template: `<lu-simple-select
	#selectRef
	placeholder="Placeholder…"
	[(ngModel)]="selectedLegume"
	[options]="legumes"
>
	<ng-container *luOption="let legume; select: selectRef" [luDisabledOption]="legume.index % 2 === 0">{{ legume.name }}</ng-container>
</lu-simple-select>`,
	neededImports: {
		'@lucca-front/ng/core-select': ['LuOptionDirective'],
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent', 'LuDisabledOptionDirective'],
	},
});

export const ApiV3 = generateStory({
	name: 'Api V3',
	description: `Pour récupérer automatiquement les options depuis une api V3 avec pagination et recherche, il suffit d'utiliser la directive \`apiV3\`.

	Plus d'informations sur les directives API personnalisée sur la [documentation dédiée](https://github.com/LuccaSA/lucca-front/blob/master/docs/core-select-api-directive.md).`,
	template: `<lu-simple-select
	placeholder="Placeholder…"
	apiV3="/api/v3/axisSections"
	[(ngModel)]="selectedAxisSection"
></lu-simple-select>`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
		'@lucca-front/ng/core-select/api': ['LuCoreSelectApiV3Directive'],
	},
});

export const ApiV4 = generateStory({
	name: 'Api V4',
	description: `Pour récupérer automatiquement les options depuis une api V4 avec pagination et recherche, il suffit d'utiliser la directive \`apiV4\`.

	Il est possible de modifier la clé de tri par défaut \`name\` en utilisant l'input \`sort\`.

	Plus d'informations sur les directives API personnalisée sur la [documentation dédiée](https://github.com/LuccaSA/lucca-front/blob/master/docs/core-select-api-directive.md).`,
	template: `<lu-simple-select
	placeholder="Placeholder…"
	apiV4="/organization/structure/api/establishments"
	[(ngModel)]="selectedEstablishment"
></lu-simple-select>`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
		'@lucca-front/ng/core-select/api': ['LuCoreSelectApiV4Directive'],
	},
});

export const ApiV4NoCLue = generateStory({
	name: 'Api V4 (no clue)',
	description: `Il est possible de désactiver la recherche ajoutée par les directives apiV3 et apiV4 en utilisant la directive \`noClue\`.`,
	template: `<lu-simple-select
	placeholder="Placeholder..."
	apiV4="/organization/structure/api/establishments"
	noClue
	[(ngModel)]="selectedEstablishment"
></lu-simple-select>`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
		'@lucca-front/ng/core-select': ['LuCoreSelectNoClueDirective'],
		'@lucca-front/ng/core-select/api': ['LuCoreSelectApiV4Directive'],
	},
});

const optionStyle = `
	display: inline-block;
	inline-size: 1rem;
	blocks-size: 1rem;
	border-radius: 50%;
	border: 1px solid var(--palettes-neutral-900);
`;
const displayerStyle = `
	display: inline-block;
	inline-size: 10rem;
	block-size: 1rem;
	border: 1px solid var(--palettes-neutral-900);
`;

const inlineStyle = (style: string) => style.split('\n').filter(Boolean).join('');

export const CustomApiV4 = generateStory({
	name: 'Custom Api V4',
	description: `Pour récupérer automatiquement les options depuis une api V4 avec pagination et recherche, il suffit d'utiliser la directive \`apiV4\`.

Plus d'informations sur les directives API personnalisée sur la [documentation dédiée](https://github.com/LuccaSA/lucca-front/blob/master/docs/core-select-api-directive.md).`,
	template: `
		<lu-simple-select
			placeholder="Placeholder…"
			luLegumes
			#legumeRef="luLegumes"
		>
			<ng-container *luDisplayer="let legume; select: legumeRef.select">
				<span [style.background-color]="legume.color" style="${inlineStyle(displayerStyle)}"></span>
			</ng-container>

			<ng-container *luOption="let legume; select: legumeRef.select">
				{{ legume.name }}
				<span [style.background-color]="legume.color" style="${inlineStyle(optionStyle)}"></span>
			</ng-container>
		</lu-simple-select>`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
		'@lucca-front/ng/core-select/api': ['LuCoreSelectApiV4Directive'],
	},
});

export const User = generateStory({
	name: 'User Select',
	description: `
Pour saisir un utilisateur, il suffit d'utiliser la directive \`users\`.

La première fois que cette directive est utilisée, il faut ajouter \`provideCoreSelectCurrentUserId(() => inject(PRINCIPAL).id)\` dans votre AppModule ou dans le app.config.ts

Plus d'informations sur les directives users personnalisée sur la [documentation dédiée](https://github.com/LuccaSA/lucca-front/blob/master/docs/core-select-users-directive.md).`,
	template: `
	<lu-simple-select
		placeholder="Placeholder…"
		users
		[(ngModel)]="selectedUser"
	></lu-simple-select>
	`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
		'@lucca-front/ng/core-select/user': ['LuCoreSelectUsersDirective', 'provideCoreSelectCurrentUserId'],
	},
});

export const UserCustom = generateStory({
	name: 'User Select (custom)',
	description: `Pour saisir un utilisateur, il suffit d'utiliser la directive \`users\`

	Plus d'informations sur les directives users personnalisée sur la [documentation dédiée](https://github.com/LuccaSA/lucca-front/blob/master/docs/core-select-users-directive.md).`,
	template: `<lu-simple-select
	#usersRef="luCustomUsers"
	placeholder="Placeholder…"
	customUsers
	[(ngModel)]="selectedUser"
>
	<ng-container *luDisplayer="let user; select: usersRef.select">
		👉👉👉 {{ user | luUserDisplay }} 👈👈👈
	</ng-container>
	<ng-container *luOption="let user; select: usersRef.select">
		{{ user | luUserDisplay }} <span class="u-textLight">(Random {{ user.myCustomProperty }})</span>

		<!-- Handle homonyms -->
		<div *ngIf="user.additionalInformation">({{ user.additionalInformation }})</div>
	</ng-container>
</lu-simple-select>`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
		'@lucca-front/ng/core-select': ['LuDisplayerDirective', 'LuOptionDirective'],
	},
});

export const FormerUser = generateStory({
	name: 'User Select (with former)',
	description: "Pour saisir des utilisateurs, il suffit d'utiliser la directive `users`",
	template: `<lu-simple-select
	placeholder="Placeholder…"
	users
	enableFormerEmployees
	[(ngModel)]="selectedUsers"
></lu-simple-select>`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
		'@lucca-front/ng/core-select/user': ['LuCoreSelectUsersDirective'],
	},
});

export const Establishment = generateStory({
	name: 'Establishment Select',
	description: "Pour saisir un établissement, il suffit d'utiliser la directive `establishments`",
	template: `<lu-simple-select
	placeholder="Placeholder…"
	establishments
	[(ngModel)]="selectedEstablishment"
></lu-simple-select>`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
		'@lucca-front/ng/core-select/establishment': ['LuCoreSelectEstablishmentsDirective'],
	},
});

export const EstablishmentCustom = generateStory({
	name: 'Establishment Select (custom)',
	description: "Pour saisir un établissement, il suffit d'utiliser la directive `establishments`",
	template: `<lu-simple-select
	#establishmentsRef="luCustomEstablishments"
	placeholder="Placeholder…"
	customEstablishments
	[(ngModel)]="selectedEstablishment"
>
	<ng-container *luDisplayer="let establishment; select: establishmentsRef.select">
		👉👉👉 {{ establishment.name }} 👈👈👈
	</ng-container>
	<ng-container *luOption="let establishment; select: establishmentsRef.select">
		{{ establishment.name }} <span class="u-textLight">(Random {{ establishment.myCustomProperty }})</span>
	</ng-container>
</lu-simple-select>`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
		'@lucca-front/ng/core-select': ['LuDisplayerDirective', 'LuOptionDirective'],
	},
	storyPartial: {
		args: {
			selectedLegume: allLegumes[4],
		},
	},
});

export const JobQualification = generateStory({
	name: 'JobQualification Select',
	description: "Pour saisir une qualification, il suffit d'utiliser la directive `jobQualifications`",
	template: `<lu-simple-select
	placeholder="Placeholder…"
	jobQualifications
	[(ngModel)]="selectedJobQualifications"
></lu-simple-select>`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
		'@lucca-front/ng/core-select/establishment': ['LuCoreSelectJobQualificationsDirective'],
	},
});

export const GroupBy = generateStory({
	name: 'Group options',
	description: "Pour grouper les options, il suffit d'utiliser la directive `luOptionGroup`.",
	template: `<lu-simple-select
	#selectRef
	placeholder="Placeholder…"
	[(ngModel)]="selectedLegume"
	[options]="legumes | filterLegumes:clue | sortLegumes:(clue ? ['name', legumeColor] : [legumeColor])"
	(clueChange)="clue = $event"
>
	<ng-container *luOptionGroup="let group by legumeColor; select: selectRef">
		Légume {{colorNameByColor[group.key]}}{{group.options.length > 1 ? 's' : ''}}
	</ng-container>
</lu-simple-select>`,
	neededImports: {
		'@lucca-front/ng/core-select': ['LuOptionDirective', 'LuOptionGroupDirective'],
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
	storyPartial: {
		args: {
			legumeColor: (legume: ILegume) => legume.color,
			colorNameByColor,
		},
	},
});

export const AddOption = generateStory({
	name: 'Add option',
	description: "Pour ajouter une option, il suffit d'utiliser l'input `addOptionStrategy` et de s'abonner à l'output `addOption`. Le label est customisable via l'input `intl`.",
	template: `<div class="pr-u-marginBlockEnd200">There is {{ legumes.length }} legumes in the list.</div>
<lu-simple-select
	#selectRef
	placeholder="Placeholder…"
	[(ngModel)]="selectedLegume"
	[options]="legumes | filterLegumes:clue"
	[intl]="{ addOption: 'Ajouter ' + (clue || 'un légume') }"
	[addOptionStrategy]="addOptionStrategy"
	(clueChange)="clue = $event"
	(addOption)="legumes = addLegume($event, legumes); selectedLegume = legumes[legumes.length - 1]"
/>`,
	neededImports: {
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
	storyPartial: {
		argTypes: {
			addOptionLabel: { control: { type: 'text' } },
			addOptionStrategy: {
				control: {
					type: 'radio',
					options: ['never', 'always', 'if-empty-clue', 'if-not-empty-clue'],
				},
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
		},
	},
});

export const CustomPanelHeader = generateStory({
	name: 'Custom Panel Header',
	description: "Pour customiser l'en-tête du panel, il suffit d'utiliser la directive `luCoreSelectPanelHeader`.",
	template: `<lu-simple-select
	#selectRef
	placeholder="Placeholder…"
	[(ngModel)]="selectedLegume"
	[options]="legumes | filterLegumes:clue"
	(clueChange)="clue = $event"
>
	<h1 *luSelectPanelHeader="selectRef">Custom Header</h1>
</lu-simple-select>`,
	neededImports: {
		'@lucca-front/ng/core-select': ['LuCoreSelectPanelHeaderDirective'],
		'@lucca-front/ng/simple-select': ['LuSimpleSelectInputComponent'],
	},
});

const meta: Meta<LuSimpleSelectInputStoryComponent> = {
	title: 'Documentation/Forms/SimpleSelect',
	component: LuSimpleSelectInputComponent,
	decorators: [
		moduleMetadata({
			imports: [
				FormsModule,
				I18nPluralPipe,
				LuDisplayerDirective,
				LuOptionDirective,
				LuUserDisplayPipe,
				FilterLegumesPipe,
				SortLegumesPipe,
				SlicePipe,
				LuCoreSelectApiV3Directive,
				LuCoreSelectApiV4Directive,
				LuCoreSelectNoClueDirective,
				LuCoreSelectEstablishmentsDirective,
				LuCoreSelectCustomEstablishmentsDirective,
				LuCoreSelectCustomUsersDirective,
				LuCoreSelectLegumesDirective,
				LuCoreSelectUsersDirective,
				LuCoreSelectJobQualificationsDirective,
				LuCoreSelectPanelHeaderDirective,
				LuDisabledOptionDirective,
				LuOptionGroupDirective,
			],
		}),
		applicationConfig({ providers: [provideHttpClient(), provideCoreSelectCurrentUserId(() => 66)] }),
	],
	args: {
		placeholder: 'Placeholder...',
		legumes: allLegumes,
		clearable: true,
		loading: false,
		page: 1,
	},
	parameters: {
		docs: useDocumentationStory(Basic),
	},
};

export default meta;
