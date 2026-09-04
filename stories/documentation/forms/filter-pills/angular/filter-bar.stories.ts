import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LuCoreSelectApiV4Directive } from '@lucca-front/ng/core-select/api';
import { LuCoreSelectDepartmentsDirective } from '@lucca-front/ng/core-select/department';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { DividerComponent } from '@lucca-front/ng/divider';
import { DropdownActionComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { FilterBarComponent, FilterPillAddonAfterDirective, FilterPillAddonBeforeDirective, FilterPillComponent } from '@lucca-front/ng/filter-pills';
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
		optionalFilter: {
			description: 'Ajoute une FilterPill optionnelle. Celle-ci déclanche automatiquement l’apparition du bouton d’ajout de filtres.',
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
		const saveViewEnabled = args['views'] && args['saveView'];
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
			? `<lu-segmented-control *luFilterPillAddonBefore [(ngModel)]="example">
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
		return {
			props: {
				example1: null,
				examplePeriod: null,
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
		<lu-multi-select [ngModel]="[]" departments filterPillLabelPlural="départements" />
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

export const Basic: StoryObj<FilterBarComponent & { views: boolean; saveView: boolean; optionalFilter: boolean; actionButton: boolean; applyFiltersButton: boolean }> = {
	args: {
		views: false,
		saveView: false,
		optionalFilter: false,
		actionButton: false,
		applyFiltersButton: false,
	},
};
