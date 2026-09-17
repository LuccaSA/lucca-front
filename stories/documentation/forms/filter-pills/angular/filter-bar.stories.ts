import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
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

export default {
	title: 'Documentation/Forms/FiltersPills/FilterBar/Angular',
	decorators: [
		moduleMetadata({
			imports: [
				FilterBarComponent,
				FilterPillComponent,
				FilterViewSelectorComponent,
				CheckboxInputComponent,
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
		const saveViewEnabled = args['views'] && args['saveView'] && !filterViewSelectorEnabled;
		const saveViewTab = saveViewEnabled
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
							{{ filterBar.intl().renameView }}
						</button>
					</lu-dropdown-item>
					<lu-dropdown-item>
						<button lu-dropdown-action type="button" critical>
							<lu-icon icon="trash" />
							{{ filterBar.intl().deleteView }}
						</button>
					</lu-dropdown-item>
				</lu-dropdown-menu>
			</ng-template>
		</ng-template>
		<lu-segmented-control-filter [label]="label4" value="4" />`
			: '';
		const saveViewButton = saveViewEnabled
			? `<button type="button" size="S" luButton="outlined" palette="product" disclosure aria-expanded="false" [luDropdown]="saveDropdown">
			{{ filterBar.intl().saveView }}
			<lu-icon icon="arrowChevronBottom" />
		</button>`
			: '';
		const saveViewDropdownTemplate = saveViewEnabled
			? `<ng-template #saveDropdown>
	<lu-dropdown-menu>
		<lu-dropdown-item>
			<button lu-dropdown-action type="button">
				<lu-icon icon="save" />
				{{ filterBar.intl().saveModification }}
			</button>
		</lu-dropdown-item>
		<lu-dropdown-item>
			<button lu-dropdown-action type="button" aria-disabled="true" class="is-disabled" luTooltip="Supprimer des vues pour en créer des nouvelles">
				<lu-icon icon="mathsPlus" />
				{{ filterBar.intl().saveNewView }}
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
				filterViews,
				// Reference the actual array element so it matches (the selector compares views by reference).
				selectedFilterView: filterViews[0],
				renameView: (view: (typeof filterViews)[number]) => args['renameView']?.(view),
				deleteView: (view: (typeof filterViews)[number]) => args['deleteView']?.(view),
			},
			template: `<lu-filter-bar>
	<lu-segmented-control class="filterBar-segmentedControl" *luFilterPillAddonBefore [(value)]="example">
		<ng-template #label0>Tous <lu-numeric-badge [value]="12" /></ng-template>
		<ng-template #label1>En cours d’approbation <lu-numeric-badge [value]="5" /></ng-template>
		<ng-template #label2>Approuvés <lu-numeric-badge [value]="3" /></ng-template>
		<ng-template #label3>Clos <lu-numeric-badge [value]="4" /></ng-template>
		<lu-segmented-control-filter [label]="label0" value="0" />
		<lu-segmented-control-filter [label]="label1" value="1" />
		<lu-segmented-control-filter [label]="label2" value="2" />
		<lu-segmented-control-filter [label]="label3" value="3" />
	</lu-segmented-control>
	<lu-filter-pill label="Inclure les collaborateurs partis" optional name="includeFormerEmployees">
		<lu-checkbox-input [checked]="false" />
	</lu-filter-pill>
	<lu-filter-pill label="Date de début" optional name="startingDate">
		<lu-date-input [(value)]="example1" />
	</lu-filter-pill>
	<lu-filter-pill label="Période">
		<lu-date-range-input [(value)]="examplePeriod" />
	</lu-filter-pill>
	<lu-filter-pill label="Multi ApiV4" optional name="multiv4">
		<lu-multi-select [value]="[]" apiV4="/organization/structure/api/establishments" filterPillLabelPlural="établissements" />
	</lu-filter-pill>
	<lu-form-field label="Test" hiddenLabel>
		<lu-text-input [value]="example2" hasSearchIcon hasClearer />
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
