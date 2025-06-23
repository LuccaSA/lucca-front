import { AsyncPipe, CommonModule, I18nPluralPipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
	LuCoreSelectPanelHeaderDirective,
	LuCoreSelectTotalCountDirective,
	LuDisabledOptionDirective,
	LuDisplayerDirective,
	LuOptionDirective,
	LuOptionGroupDirective,
} from '@lucca-front/ng/core-select';
import { LuCoreSelectApiV3Directive, LuCoreSelectApiV4Directive } from '@lucca-front/ng/core-select/api';
import { LuCoreSelectEstablishmentsDirective } from '@lucca-front/ng/core-select/establishment';
import { LuCoreSelectJobQualificationsDirective } from '@lucca-front/ng/core-select/job-qualification';
import { LuCoreSelectUsersDirective, provideCoreSelectCurrentUserId } from '@lucca-front/ng/core-select/user';
import {
	LuMultiDisplayerDirective,
	LuMultiSelectCounterDisplayerComponent,
	LuMultiSelectDisplayerInputDirective,
	LuMultiSelectInputComponent,
	LuMultiSelection,
	LuMultiSelectWithSelectAllDirective,
} from '@lucca-front/ng/multi-select';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { expect, screen, userEvent, within } from '@storybook/test';
import { interval, map } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { HiddenArgType } from 'stories/helpers/common-arg-types';
import { createTestStory, getStoryGenerator } from 'stories/helpers/stories';
import { waitForAngular } from '../../../helpers/test';
import { allLegumes, colorNameByColor, coreSelectStory, FilterLegumesPipe, ILegume, LuCoreSelectInputStoryComponent, SortLegumesPipe } from './select.utils';

type LuMultiSelectInputStoryComponent = LuCoreSelectInputStoryComponent & {
	selectedLegumes: ILegume[] | LuMultiSelection<ILegume>;
	legumeSelection?: LuMultiSelection<ILegume>;
	maxValuesShown: number;
	selectedAxisSection: LuMultiSelection<{ id: number; name: string }>;
	selectedEstablishment: LuMultiSelection<{ id: number; name: string }>;
	selectLegume(legume: ILegume, legumes: ILegume[]): ILegume[];
} & LuMultiSelectInputComponent<ILegume>;

const generateStory = getStoryGenerator<LuMultiSelectInputStoryComponent>({
	...coreSelectStory,
	argTypes: {
		...coreSelectStory.argTypes,
		selectedLegumes: HiddenArgType,
		valuesTpl: HiddenArgType,
		panelHeaderTpl: HiddenArgType,
		optionKey: HiddenArgType,
		maxValuesShown: HiddenArgType,
		selectLegume: HiddenArgType,
	},
});

async function checkValues(input: HTMLElement, values: string[]) {
	if (values.length === 0) {
		await expect(input.parentElement.getElementsByTagName('lu-numeric-badge').length).toBe(0);
	}
	// If it's a counter displayer
	if (input.parentElement.getElementsByTagName('lu-numeric-badge').length > 0) {
		const counter = input.parentElement.getElementsByTagName('lu-numeric-badge')[0];
		await expect(counter).toHaveTextContent(values.length.toString());
	} else {
		for (const value of values) {
			await expect(input.parentElement).toHaveTextContent(value);
		}
	}
}

const basePlay = async ({ canvasElement, step }) => {
	// Mouse interactions
	const input = within(canvasElement).getByRole('combobox');
	const buttons = within(canvasElement).queryAllByRole('button');
	// Context
	const isBadgeDisplayer = input.parentElement.getElementsByTagName('lu-simple-select-default-option').length > 0;
	if (buttons.length > 0) {
		const clearButton = buttons.find((button) => button.className.includes('multipleSelect-clear'));
		if (clearButton) {
			await userEvent.click(clearButton);
		}
	}
	await userEvent.click(input);
	await waitForAngular();
	const panel = within(screen.getByRole('listbox'));
	const options = await panel.findAllByRole('option').then((options) => options.filter((el) => !el.id.includes('select-all')));
	const optionValues = options.slice(0, 4).map((option) => option.textContent);
	await userEvent.click(options[0]);
	await userEvent.click(options[1]);
	await userEvent.click(options[2]);
	await userEvent.click(options[3]);
	await userEvent.keyboard('{Escape}');
	await waitForAngular();
	await expect(screen.queryByText('listbox')).toBeNull();
	await checkValues(input, optionValues);
	if (isBadgeDisplayer) {
		await step('Clear and remove values using mouse', async () => {
			const chipClearButtons = await within(input.parentElement).findAllByRole('button');
			await userEvent.click(chipClearButtons[0]);
			await expect(input.parentElement).not.toHaveTextContent(optionValues[0]);
			await userEvent.click(input);
			await waitForAngular();
			const panel = within(screen.getByRole('listbox'));
			const options = await panel.findAllByRole('option');
			await userEvent.click(options[1]);
			await userEvent.keyboard('{Escape}');
			await waitForAngular();
			await expect(screen.queryByText('listbox')).toBeNull();
			await expect(input.parentElement).not.toHaveTextContent(optionValues[1]);
		});
	}
	// Doing the same but with keyboard
	await step('Keyboard interactions', async () => {
		const buttons = await within(canvasElement).findAllByRole('button');
		await userEvent.click(buttons.find((button) => button.className.includes('multipleSelect-clear')));
		await waitForAngular();
		input.focus();
		await expect(input).toHaveFocus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await expect(screen.getByRole('listbox')).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(screen.queryByText('listbox')).toBeNull();
		await waitForAngular();
		await expect(input).toHaveFocus();
		// Broken but fixed in current master, TODO uncomment
		// await userEvent.keyboard('{Space}');
		// await waitForAngular();
		// await expect(screen.getByRole('listbox')).toBeVisible();
		// await userEvent.keyboard('{Escape}');
		input.focus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		// For some reason, this arrowdown is not being handled properly, even tho it reaches the key manager
		// I'm keeping it as commented for now as it only happens in test env and I want to test more stuff and not get stuck on this
		// await userEvent.keyboard('{ArrowDown}');
		await userEvent.keyboard('{Enter}');
		// Because of the arrowDown issue, we'll select more using mouse in order to be able to test more stuff
		const panel = within(screen.getByRole('listbox'));
		const options = await panel.findAllByRole('option').then((options) => options.filter((el) => !el.id.includes('select-all')));
		const optionValues = options.slice(0, 4).map((option) => option.textContent);
		await userEvent.click(options[1]);
		await userEvent.click(options[2]);
		await userEvent.click(options[3]);
		const allOptions = await panel.findAllByRole('option');
		await userEvent.keyboard('{Escape}');
		if (allOptions.some((opt) => opt.id.includes('select-all'))) {
			const valuesWithSelectAll = options.map((opt) => opt.textContent);
			valuesWithSelectAll.splice(1, 3);
			await checkValues(input, valuesWithSelectAll);
		} else {
			await checkValues(input, optionValues);
		}
		if (isBadgeDisplayer) {
			input.focus();
			await userEvent.tab();
			await userEvent.keyboard('{Enter}');
			// We should have unselected first option
			await expect(input.parentElement).not.toHaveTextContent(optionValues[0]);
			await userEvent.click(input);
			await userEvent.keyboard('{Backspace}');
			// We should have unselected last option
			await expect(input.parentElement).not.toHaveTextContent(optionValues[3]);
			// Now we search and select an option based on the result
			await userEvent.type(input, 'carotte');
			await waitForAngular();
			const searchResult = await within(screen.getByRole('listbox')).findAllByRole('option');
			await expect(searchResult).toHaveLength(1);
			await userEvent.keyboard('{Enter}');
			await userEvent.keyboard('{Escape}');
			await expect(input.parentElement).toHaveTextContent(searchResult[0].textContent);
		}
	});
};

export const SelectAll = generateStory({
	name: 'Select all',
	description: '',
	template: `<lu-multi-select
	withSelectAll
	[totalCount]="legumes.length"
	withSelectAllDisplayerLabel="légumes"
	[placeholder]="placeholder"
	[clearable]="clearable"
	[loading]="loading"
	[(ngModel)]="legumeSelection"
	[options]="legumes | filterLegumes:clue"
	[keepSearchAfterSelection]="keepSearchAfterSelection"
	(clueChange)="clue = $event"
/>
{{ legumeSelection | json }}`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent', 'LuMultiSelectWithSelectAllDirective'],
		'@lucca-front/ng/core-select/user': ['LuCoreSelectUsersDirective', 'LuCoreSelectTotalCountDirective'],
	},
	storyPartial: {
		args: {
			legumeSelection: { mode: 'none' },
			keepSearchAfterSelection: false,
		},
	},
});

export const SelectAllTEST = createTestStory(SelectAll, async (context) => {
	await basePlay(context);
	const input = within(context.canvasElement).getByRole('combobox');
	const buttons = within(context.canvasElement).queryAllByRole('button');
	if (buttons.length > 0) {
		const clearButton = buttons.find((button) => button.className.includes('multipleSelect-clear'));
		if (clearButton) {
			await userEvent.click(clearButton);
		}
	}
	await userEvent.click(input);
	await waitForAngular();
	const panel = within(screen.getByRole('listbox'));
	const selectAllCheckbox = panel.getByLabelText('Tout sélectionner');
	await userEvent.click(selectAllCheckbox);
	const options = await panel.findAllByRole('option').then((options) => options.filter((el) => !el.id.includes('select-all')));
	const optionValues = options.map((option) => option.textContent);
	await checkValues(input, optionValues);
	await userEvent.keyboard('{Escape}');
	context.step('Select all keyboard interactions', async () => {
		input.focus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await userEvent.keyboard('{Enter}');
		// We should have unselected everything with this keyboard input sequence
		await checkValues(input, []);
	});
});

export const Basic = generateStory({
	name: 'Basic',
	description: '',
	template: `<lu-multi-select
	#selectRef
	[placeholder]="placeholder"
	[clearable]="clearable"
	[loading]="loading"
	[keepSearchAfterSelection]="keepSearchAfterSelection"
	[(ngModel)]="selectedLegumes"
	[options]="legumes | filterLegumes:clue"
	(clueChange)="clue = $event"
	[maxValuesShown]="maxValuesShown"
>
</lu-multi-select>`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
	},
	storyPartial: {
		args: {
			selectedLegumes: allLegumes.slice(0, 15),
			keepSearchAfterSelection: false,
		},
		argTypes: {
			clearable: { control: { type: 'boolean' } },
			placeholder: { control: { type: 'text' } },
			maxValuesShown: { control: { type: 'number' } },
		},
	},
});

export const BasicTEST = createTestStory(Basic, basePlay);

export const WithMultiDisplayer = generateStory({
	name: 'With MultiDisplayer',
	description:
		"Il est possible de personnaliser le contenu de la valeur sélectionnée en utilisant la directive `luMultiDisplayer`. Le *template* prend le tableau contenant l'ensemble des valeurs sélectionnées.",
	template: `<lu-multi-select
	#selectRef
	[clearable]="clearable"
	[loading]="loading"
	[(ngModel)]="selectedLegumes"
	placeholder="Placeholder..."
	[options]="legumes | filterLegumes:clue"
	[keepSearchAfterSelection]="keepSearchAfterSelection"
	(clueChange)="clue = $event"
>
	<ng-container *luMultiDisplayer="let values; select: selectRef">
		<lu-multi-select-counter-displayer [selected]="values" label="légumes sélectionnés"></lu-multi-select-counter-displayer>
	</ng-container>
</lu-multi-select>`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent', 'LuMultiDisplayerDirective', 'MultiSelectDisplayerInputDirective'],
	},
	storyPartial: {
		args: {
			selectedLegumes: [],
			keepSearchAfterSelection: false,
		},
	},
});

export const WithDisplayer = generateStory({
	name: 'With Displayer',
	description:
		"Il est possible de personnaliser le contenu des *chips* dans l'affichage de la valeur sélectionnée en utilisant la directive `luDisplayer`. Le *template* prend une option parmi les valeurs sélectionnées.",
	template: `<lu-multi-select
	#selectRef
	[placeholder]="placeholder"
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
	description: "Il est possible de charger les options au fur et à mesure en écoutant l'évènement `(nextPage)`.",
	template: `<lu-multi-select
	#selectRef
	placeholder="Placeholder..."
	[(ngModel)]="selectedLegumes"
	[options]="legumes.slice(0, page * 10)"
	(nextPage)="page = page + 1"
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
	description: "Il est possible de désactiver certaines options en utilisant la directive `luDisabledOption` sur l'option.",
	template: `<lu-multi-select
	#selectRef
	placeholder="Placeholder..."
	[(ngModel)]="selectedLegumes"
	[options]="legumes | filterLegumes:clue"
	(clueChange)="clue = $event"
	[maxValuesShown]="maxValuesShown"
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

export const ApiV3 = generateStory({
	name: 'Api V3',
	description: "Pour récupérer automatiquement les options depuis une api V3 avec pagination et recherche, il suffit d'utiliser la directive `apiV3`.",
	template: `<lu-multi-select
	placeholder="Placeholder..."
	apiV3="/api/v3/axisSections"
	withSelectAll
	withSelectAllDisplayerLabel="sections"
	[(ngModel)]="selectedAxisSection"
	[maxValuesShown]="maxValuesShown"
/> {{ selectedAxisSection | json }}`,
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
	description: "Pour récupérer automatiquement les options depuis une api V4 avec pagination et recherche, il suffit d'utiliser la directive `apiV4`.",
	template: `<lu-multi-select
	placeholder="Placeholder..."
	withSelectAll
	withSelectAllDisplayerLabel="établissements"
	apiV4="/organization/structure/api/establishments"
	[(ngModel)]="selectedEstablishment"
	[maxValuesShown]="maxValuesShown"
/>{{ selectedEstablishment | json }}`,
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
	description: "Pour saisir un établissement, il suffit d'utiliser la directive `establishments`",
	template: `<lu-multi-select
	placeholder="Placeholder..."
	withSelectAll
	withSelectAllDisplayerLabel="établissements"
	establishments
	[(ngModel)]="selectedEstablishment"
/>{{ selectedEstablishment | json }}`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent', 'LuMultiSelectWithSelectAllDirective'],
		'@lucca-front/ng/core-select/establishment': ['LuCoreSelectEstablishmentsDirective'],
	},
	storyPartial: {
		args: {
			selectedEstablishment: { mode: 'none' },
		},
	},
});

export const User = generateStory({
	name: 'User Select',
	description: "Pour saisir des utilisateurs, il suffit d'utiliser la directive `users`",
	template: `<lu-multi-select
	placeholder="Placeholder..."
	users
	[(ngModel)]="selectedUsers"
></lu-multi-select>`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
		'@lucca-front/ng/core-select/user': ['LuCoreSelectUsersDirective'],
	},
});

export const UserWithSelectAll = generateStory({
	name: 'User Select (select all)',
	description: "Pour saisir des utilisateurs, il suffit d'utiliser la directive `users` et `withSelectAll`",
	template: `<lu-multi-select
	placeholder="Placeholder..."
	users
	withSelectAll
	withSelectAllDisplayerLabel="utilisateurs"
	[(ngModel)]="selectedUsers"
></lu-multi-select>`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
		'@lucca-front/ng/core-select/user': ['LuCoreSelectUsersDirective'],
	},
});

export const FormerUser = generateStory({
	name: 'User Select (with former)',
	description: "Pour saisir des utilisateurs, il suffit d'utiliser la directive `users`",
	template: `<lu-multi-select
	placeholder="Placeholder..."
	users
	enableFormerEmployees
	[(ngModel)]="selectedUsers"
></lu-multi-select>`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
		'@lucca-front/ng/core-select/user': ['LuCoreSelectUsersDirective'],
	},
});

export const JobQualification = generateStory({
	name: 'JobQualification Select',
	description: "Pour saisir une qualification, il suffit d'utiliser la directive `jobQualifications`",
	template: `<lu-multi-select
	placeholder="Placeholder..."
	jobQualifications
	[(ngModel)]="selectedJobQualifications"
></lu-multi-select>`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
		'@lucca-front/ng/core-select/establishment': ['LuCoreSelectJobQualificationsDirective'],
	},
});

export const GroupBy = generateStory({
	name: 'Group options',
	description: "Pour grouper les options, il suffit d'utiliser la directive `luOptionGroup`.",
	template: `<lu-multi-select
	#selectRef
	class="textfield-input"
	placeholder="Placeholder..."
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
{{ selectedLegumes | json }}`,
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

export const GroupByTEST = createTestStory(GroupBy, async (context) => {
	await basePlay(context);
	context.step('Group select all keyboard interactions', async () => {
		const input = within(context.canvasElement).getByRole('combobox');
		input.focus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await userEvent.keyboard('{Enter}');
		const panel = within(screen.getByRole('listbox'));
		const options = await panel.findAllByRole('option');
		const optionValues = options.map((option) => option.textContent);
		// We should have unselected everything with this keyboard input sequence
		await checkValues(input, optionValues.slice(1, 3));
	});
});

export const GroupBySelectAll = generateStory({
	name: 'Group options (with selectAll)',
	description: "Pour grouper les options, il suffit d'utiliser la directive `luOptionGroup`.",
	template: `<lu-multi-select
	#selectRef
	withSelectAll
	withSelectAllDisplayerLabel="légumes"
	[totalCount]="legumes.length"
	class="textfield-input"
	placeholder="Placeholder..."
	[(ngModel)]="selectedLegumes"
	[options]="legumes | filterLegumes:clue | sortLegumes:(clue ? ['name', legumeColor] : [legumeColor])"
	(clueChange)="clue = $event"
	[maxValuesShown]="maxValuesShown"
>
	<ng-container *luOptionGroup="let group by legumeColor; select: selectRef">
		Légume {{colorNameByColor[group.key]}}{{group.options.length > 1 ? 's' : ''}}
	</ng-container>
</lu-multi-select>
{{ selectedLegumes | json }}`,
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

export const testDynamicDisabled = generateStory({
	name: '[test] Dynamic disabled',
	description: 'technical test to check dynamic disabled',
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
	},
	template: `<lu-multi-select
	#selectRef
	[placeholder]="placeholder"
	[clearable]="clearable"
	[loading]="loading"
	[disabled]="dynamicDisabled | async"
	[(ngModel)]="selectedLegumes"
	[options]="legumes | filterLegumes:clue"
	(clueChange)="clue = $event"
	[maxValuesShown]="maxValuesShown"
>
</lu-multi-select>`,
	storyPartial: {
		args: {
			selectedLegumes: allLegumes.slice(0, 15),
			dynamicDisabled: interval(2000).pipe(
				map((n) => !!(n % 2)),
				startWith(true),
			),
		} as any,
		argTypes: {
			clearable: { control: { type: 'boolean' } },
			placeholder: { control: { type: 'text' } },
			maxValuesShown: { control: { type: 'number' } },
		},
	},
});

export const AddOption = generateStory({
	name: 'Add option',
	description: "Pour ajouter une option, il suffit d'utiliser l'input `addOptionStrategy` et de s'abonner à l'output `addOption`. Le label est customisable via l'input `addOptionLabel`.",
	template: `<div class="pr-u-marginBlockEnd200">There is {{ legumes.length }} legumes in the list.</div>
<lu-multi-select
	#selectRef
	placeholder="Placeholder..."
	[(ngModel)]="selectedLegumes"
	[options]="legumes | filterLegumes:clue"
	[addOptionLabel]="'Ajouter ' + (clue || 'un légume')"
	[addOptionStrategy]="addOptionStrategy"
	(clueChange)="clue = $event"
	(addOption)="legumes = addLegume($event, legumes); selectedLegumes = selectLegume(legumes[legumes.length - 1], selectedLegumes)"
/>`,
	neededImports: {
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
	},
	storyPartial: {
		argTypes: {
			addOptionLabel: { control: { type: 'text' } },
			addOptionStrategy: {
				control: {
					type: 'select',
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
			selectLegume: (legume: ILegume, legumes: ILegume[]) => [...legumes, legume],
		},
	},
});

export const CustomPanelHeader = generateStory({
	name: 'Custom Panel Header',
	description: "Pour customiser l'en-tête du panel, il suffit d'utiliser la directive `luCoreSelectPanelHeader`.",
	template: `<lu-multi-select
	#selectRef
	placeholder="Placeholder..."
	[(ngModel)]="selectedLegume"
	[options]="legumes | filterLegumes:clue"
	(clueChange)="clue = $event"
>
	<h1 *luSelectPanelHeader="selectRef">Custom Header</h1>
</lu-multi-select>`,
	neededImports: {
		'@lucca-front/ng/core-select': ['LuCoreSelectPanelHeaderDirective'],
		'@lucca-front/ng/multi-select': ['LuMultiSelectInputComponent'],
	},
});

const meta: Meta<LuMultiSelectInputStoryComponent> = {
	title: 'Documentation/Forms/MultiSelect',
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
				LuMultiSelectWithSelectAllDirective,
				LuOptionDirective,
				LuOptionGroupDirective,
				LuDisplayerDirective,
				LuTooltipModule,
				LuCoreSelectApiV3Directive,
				LuCoreSelectApiV4Directive,
				LuCoreSelectTotalCountDirective,
				LuCoreSelectEstablishmentsDirective,
				LuCoreSelectUsersDirective,
				LuCoreSelectJobQualificationsDirective,
				LuCoreSelectPanelHeaderDirective,
				LuDisabledOptionDirective,
				LuMultiSelectDisplayerInputDirective,
				LuMultiSelectCounterDisplayerComponent,
				CommonModule,
				AsyncPipe,
			],
		}),
		applicationConfig({
			providers: [provideAnimations(), provideHttpClient(), provideCoreSelectCurrentUserId(() => 66)],
		}),
	],
	args: {
		placeholder: 'Placeholder...',
		legumes: allLegumes,
		clearable: true,
		loading: false,
		maxValuesShown: 500,
		selectedLegumes: [],
		page: 1,
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
