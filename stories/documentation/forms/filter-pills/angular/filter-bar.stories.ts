import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LuCoreSelectApiV4Directive } from '@lucca-front/ng/core-select/api';
import { LuCoreSelectDepartmentsDirective } from '@lucca-front/ng/core-select/department';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { DividerComponent } from '@lucca-front/ng/divider';
import { FilterBarComponent, FilterPillAddonAfterDirective, FilterPillAddonBeforeDirective, FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
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
			],
		}),
		applicationConfig({ providers: [provideHttpClient(), { provide: LOCALE_ID, useValue: 'fr-FR' }] }),
	],
	argTypes: {
		showExportButton: {
			description: 'Affiche le bouton d’export en tant qu’action associée à droite de la Filter bar.',
			control: {
				type: 'boolean',
			},
		},
		showViews: {
			description: 'Affiche les vues (Segmented control) en tant qu’addon avant les filtres de la Filter bar.',
			control: {
				type: 'boolean',
			},
		},
		showOptionalFilter: {
			description: 'Rend le filtre "Période" optionnel. Dès qu’au moins un filtre est optionnel, le bouton d’ajout de filtres apparaît automatiquement.',
			control: {
				type: 'boolean',
			},
		},
		showApplyButton: {
			description:
				'Affiche le bouton "Appliquer les filtres", utilisé lorsque des contraintes techniques empêchent une application automatique des filtres. Il se positionne à la toute fin des filtres.',
			control: {
				type: 'boolean',
			},
		},
	},
	render: (args, { argTypes }) => {
		const exportButton = args['showExportButton'] ? `<button *luFilterPillAddonAfter type="submit" size="S" luButton="outlined">Exporter</button>` : '';
		const applyButton = args['showApplyButton'] ? `<button type="submit" size="S" luButton="ghost" palette="product">Appliquer les filtres</button>` : '';
		const periodFilter = args['showOptionalFilter']
			? `<lu-filter-pill label="Période" optional name="period">
		<lu-date-range-input [(ngModel)]="examplePeriod" />
	</lu-filter-pill>`
			: '';
		const views = args['showViews']
			? `<lu-segmented-control *luFilterPillAddonBefore [(ngModel)]="example">
		<ng-template #label0>Tous <lu-numeric-badge [value]="12" /></ng-template>
		<ng-template #label2>Approuvés <lu-numeric-badge [value]="3" /></ng-template>
		<lu-segmented-control-filter [label]="label0" value="0" />
		<lu-segmented-control-filter [label]="label2" value="2" />
	</lu-segmented-control>`
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
	${applyButton}
	${exportButton}
</lu-filter-bar>`,
		};
	},
} as Meta;

export const Basic: StoryObj<FilterBarComponent & { showExportButton: boolean; showViews: boolean; showOptionalFilter: boolean; showApplyButton: boolean }> = {
	args: {
		showExportButton: false,
		showViews: false,
		showOptionalFilter: false,
		showApplyButton: false,
	},
};
