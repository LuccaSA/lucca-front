import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LuCoreSelectApiV4Directive } from '@lucca-front/ng/core-select/api';
import { LuCoreSelectDepartmentsDirective } from '@lucca-front/ng/core-select/department';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { DividerComponent } from '@lucca-front/ng/divider';
import { DropdownActionComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { FilterBarComponent, FilterPillAddonAfterDirective, FilterPillAddonBeforeDirective, FilterPillComponent, FilterViewSelectorComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { IconComponent } from '@lucca/prisme/icon';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { createTestStory } from '@/helpers/stories';
import { pickDay, waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';

export default {
	title: 'Documentation/Forms/FiltersPills/FilterBar/Angular',
	decorators: [
		moduleMetadata({
			imports: [
				FilterBarComponent,
				FilterPillComponent,
				FilterViewSelectorComponent,
				CheckboxInputComponent,
				FormsModule,
				DateRangeInputComponent,
				DateInputComponent,
				ButtonComponent,
				LuSimpleSelectInputComponent,
				FilterPillAddonAfterDirective,
				FilterPillAddonBeforeDirective,
				FormFieldComponent,
				TextInputComponent,
				NumericBadgeComponent,
				LuCoreSelectApiV4Directive,
				LuCoreSelectDepartmentsDirective,
				LuMultiSelectInputComponent,
				DividerComponent,
				SegmentedControlComponent,
				SegmentedControlFilterComponent,
				IconComponent,
				DropdownMenuComponent,
				DropdownItemComponent,
				DropdownActionComponent,
				LuDropdownTriggerDirective,
			],
		}),
		applicationConfig({ providers: [provideHttpClient(), { provide: LOCALE_ID, useValue: 'fr-FR' }] }),
	],
	parameters: {
		controls: {
			sort: 'none',
		},
	},
	argTypes: {
		views: {
			description: 'Affiche les vues via SegmentedControl.',
			control: {
				type: 'boolean',
			},
			table: { category: 'inputs' },
		},
		saveView: {
			name: '↳ saveView',
			description: 'Ajoute une vue personnalisée ainsi qu’un dropdown pour enregistrer la vue.',
			control: {
				type: 'boolean',
			},
			if: { arg: 'views', truthy: true },
			table: { category: 'inputs' },
		},
		filterViewSelector: {
			name: '↳ filterViewSelector',
			description: 'Bascule la sélection de vue en dropdown (grand nombre de vues).',
			control: {
				type: 'boolean',
			},
			if: { arg: 'views', truthy: true },
			table: { category: 'inputs' },
		},
		renameView: {
			description: 'Événement déclenché lorsque l’utilisateur demande à renommer une vue.',
			action: 'renameView',
			control: false,
			if: { arg: 'filterViewSelector', truthy: true },
			table: { category: 'outputs (filter-view-selector)', type: { summary: 'T' } },
		},
		deleteView: {
			description: 'Événement déclenché lorsque l’utilisateur demande à supprimer une vue.',
			action: 'deleteView',
			control: false,
			if: { arg: 'filterViewSelector', truthy: true },
			table: { category: 'outputs (filter-view-selector)', type: { summary: 'T' } },
		},
		optionalFilter: {
			description: 'Ajoute une FilterPill optionnelle. Celle-ci déclenche automatiquement l’apparition du bouton d’ajout de filtres.',
			control: {
				type: 'boolean',
			},
			table: { category: 'inputs' },
		},
		actionButton: {
			description: 'Affiche un bouton d’action associé à la FilterBar.',
			control: {
				type: 'boolean',
			},
			table: { category: 'inputs' },
		},
		applyFiltersButton: {
			description: 'Affiche un bouton pour appliquer les filtres, utilisé lorsqu’il n’est pas possible d’appliquer les filtres automatiquement.',
			control: {
				type: 'boolean',
			},
			table: { category: 'inputs' },
		},
	},
	render: (args, { argTypes }) => {
		const actionButton = args['actionButton'] ? `<button type="submit" size="S" luButton="outlined">Exporter</button>` : '';
		const applyFiltersButton = args['applyFiltersButton'] ? `<button type="submit" size="S" luButton="ghost" palette="product">Appliquer les filtres</button>` : '';
		const periodFilter = args['optionalFilter']
			? `<lu-filter-pill label="Période" optional name="period">
		<lu-date-range-input [(ngModel)]="examplePeriod" />
	</lu-filter-pill>`
			: '';
		const filterViewSelectorEnabled = args['views'] && args['filterViewSelector'];
		const saveViewEnabled = args['views'] && args['saveView'];
		const saveViewTab =
			saveViewEnabled && !filterViewSelectorEnabled
				? `<ng-template #label4>
			Produit
			<button type="button" size="XS" luButton="ghost" aria-expanded="false" disclosure [luDropdown]="optionsDropdown">
				<lu-icon alt="Options" icon="menuDots" />
			</button>
			<ng-template #optionsDropdown>
				<lu-dropdown-menu>
					<lu-dropdown-item>
						<button lu-dropdown-action type="button">
							<lu-icon icon="edit" />
							Modifier le nom
						</button>
					</lu-dropdown-item>
					<lu-dropdown-item>
						<button lu-dropdown-action type="button" critical>
							<lu-icon icon="trash" />
							Supprimer
						</button>
					</lu-dropdown-item>
				</lu-dropdown-menu>
			</ng-template>
		</ng-template>
		<lu-segmented-control-filter [label]="label4" value="4" />`
				: '';
		const saveViewButton = saveViewEnabled
			? `<button type="button" size="S" luButton="outlined" palette="product" disclosure aria-expanded="false" [luDropdown]="saveDropdown">
			Enregistrer la vue
			<lu-icon icon="arrowChevronBottom" />
		</button>`
			: '';
		const saveViewDropdownTemplate = saveViewEnabled
			? `<ng-template #saveDropdown>
	<lu-dropdown-menu>
		<lu-dropdown-item>
			<button lu-dropdown-action type="button">
				<lu-icon icon="save" />
				Enregistrer les modifications
			</button>
		</lu-dropdown-item>
		<lu-dropdown-item>
			<button lu-dropdown-action type="button" aria-disabled="true" class="is-disabled" luTooltip="Supprimer des vues pour en créer des nouvelles">
				<lu-icon icon="mathsPlus" />
				Enregistrer en tant que nouvelle vue
			</button>
		</lu-dropdown-item>
	</lu-dropdown-menu>
</ng-template>`
			: '';
		const views = args['views']
			? filterViewSelectorEnabled
				? `<lu-filter-view-selector
			*luFilterPillAddonBefore
			[views]="filterViews"
			[(selectedView)]="selectedFilterView"
			(renameView)="renameView($event)"
			(deleteView)="deleteView($event)"
		/>`
				: `<lu-segmented-control *luFilterPillAddonBefore [(ngModel)]="example">
		<ng-template #label0>Tous <lu-numeric-badge [value]="12" /></ng-template>
		<ng-template #label2>Approuvés <lu-numeric-badge [value]="3" /></ng-template>
		<lu-segmented-control-filter [label]="label0" value="0" />
		<lu-segmented-control-filter [label]="label2" value="2" />
		${saveViewTab}
	</lu-segmented-control>`
			: '';
		const addonAfter =
			saveViewButton || actionButton
				? `<ng-container *luFilterPillAddonAfter>
		${saveViewButton}
		${actionButton}
	</ng-container>`
				: '';
		const filterViews = [
			{ id: 1, name: 'Tous' },
			{ id: 2, name: 'Approuvés' },
			{ id: 3, name: 'Produit' },
		];
		return {
			props: {
				example1: null,
				examplePeriod: null,
				departmentsPluralFn: (count: number) => `${count} départements`,
				filterViews,
				// Reference the actual array element so it matches (the selector compares views by reference).
				selectedFilterView: filterViews[0],
				renameView: (view: (typeof filterViews)[number]) => args['renameView']?.(view),
				deleteView: (view: (typeof filterViews)[number]) => args['deleteView']?.(view),
			},
			template: `<lu-filter-bar>
	${views}
	<lu-filter-pill label="Inclure les collaborateurs partis" name="includeFormerEmployees">
		<lu-checkbox-input [ngModel]="false" />
	</lu-filter-pill>
	<lu-filter-pill label="Établissement" name="establishment">
		<lu-simple-select [ngModel]="null" apiV4="/organization/structure/api/establishments" />
	</lu-filter-pill>
	<lu-filter-pill label="Départements" name="departments">
		<lu-multi-select [ngModel]="[]" departments [filterPillLabelPluralFn]="departmentsPluralFn" />
	</lu-filter-pill>
	<lu-filter-pill label="Date de début" name="startingDate">
		<lu-date-input [(ngModel)]="example1" />
	</lu-filter-pill>
	${periodFilter}
	<lu-form-field label="Test" hiddenLabel>
		<lu-text-input [ngModel]="example2" [ngModelOptions]="{ standalone: true }" hasSearchIcon hasClearer />
	</lu-form-field>
	${applyFiltersButton}
	${addonAfter}
</lu-filter-bar>
${saveViewDropdownTemplate}`,
		};
	},
} as Meta;

export const Basic: StoryObj<FilterBarComponent & { views: boolean; saveView: boolean; filterViewSelector: boolean; optionalFilter: boolean; actionButton: boolean; applyFiltersButton: boolean }> = {
	args: {
		views: false,
		saveView: false,
		filterViewSelector: false,
		optionalFilter: false,
		actionButton: false,
		applyFiltersButton: false,
	},
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);

	await step('Without optional pill, there is no additional filters button', async () => {
		await expect(canvas.getByRole('button', { name: /Départements/ })).toBeVisible();
		await expect(canvas.queryByRole('button', { name: 'Filtres supplémentaires' })).not.toBeInTheDocument();
	});
});

export const OptionalFilterTEST = createTestStory({ ...Basic, name: 'Optional filter', args: { ...Basic.args, optionalFilter: true } }, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const getAddFiltersButton = () => canvas.getByRole('button', { name: 'Filtres supplémentaires' });
	const getPeriodPill = () => canvas.getByRole('button', { name: /Période/ });
	const queryPeriodPill = () => canvas.queryByRole('button', { name: /Période/ });
	const togglePeriodOption = async () => {
		await userEvent.click(getAddFiltersButton());
		await waitForAngular();
		await userEvent.click(screen.getByRole('checkbox', { name: 'Période' }));
		await waitForAngular();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
	};

	await step('An optional pill is hidden until it is added', async () => {
		await expect(getAddFiltersButton()).toBeVisible();
		await expect(queryPeriodPill()).not.toBeInTheDocument();
	});

	await step('Checking the optional pill in the additional filters displays it', async () => {
		await userEvent.click(getAddFiltersButton());
		await waitForAngular();
		const option = screen.getByRole('checkbox', { name: 'Période' });
		await expect(option).not.toBeChecked();
		await userEvent.click(option);
		await waitForAngular();
		await expect(option).toBeChecked();
		await expect(getPeriodPill()).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => expect(screen.queryByRole('checkbox', { name: 'Période' })).not.toBeInTheDocument());
	});

	await step('The displayed optional pill can be filled', async () => {
		await userEvent.click(getPeriodPill());
		await waitForAngular();
		await pickDay(screen.getByLabelText('Start'), 10, true);
		await pickDay(screen.getByLabelText('End'), 20, true);
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => expect(getPeriodPill()).toHaveAttribute('aria-expanded', 'false'));
		await expect(getPeriodPill()).not.toHaveTextContent('Aucune valeur sélectionnée');
	});

	await step('Unchecking the optional pill hides it', async () => {
		await togglePeriodOption();
		await expect(queryPeriodPill()).not.toBeInTheDocument();
	});

	await step('Hiding an optional pill clears its value', async () => {
		await togglePeriodOption();
		await expect(getPeriodPill()).toHaveTextContent('Aucune valeur sélectionnée');
	});

	await step('The additional filters can be managed with the keyboard', async () => {
		getAddFiltersButton().focus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		const option = screen.getByRole('checkbox', { name: 'Période' });
		await expect(option).toBeChecked();
		option.focus();
		await userEvent.keyboard(' ');
		await waitForAngular();
		await expect(option).not.toBeChecked();
		await expect(queryPeriodPill()).not.toBeInTheDocument();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => expect(screen.queryByRole('checkbox', { name: 'Période' })).not.toBeInTheDocument());
		await expect(getAddFiltersButton()).toHaveFocus();
	});
});
