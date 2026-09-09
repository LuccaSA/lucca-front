import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LuCoreSelectApiV4Directive } from '@lucca-front/ng/core-select/api';
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
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
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
				LuMultiSelectInputComponent,
				DividerComponent,
				SegmentedControlComponent,
				SegmentedControlFilterComponent,
				IconComponent,
				DropdownMenuComponent,
				DropdownItemComponent,
				DropdownActionComponent,
				LuDropdownTriggerDirective,
				LuTooltipTriggerDirective,
			],
		}),
		applicationConfig({ providers: [provideHttpClient(), { provide: LOCALE_ID, useValue: 'fr-FR' }] }),
	],
	render: (args, { argTypes }) => {
		return {
			props: {
				example1: new Date(),
				examplePeriod: null,
			},
			template: `<lu-filter-bar>
	<lu-segmented-control class="filterBar-segmentedControl" *luFilterPillAddonBefore [(ngModel)]="example">
		<ng-template #label0>Tous <lu-numeric-badge [value]="12" /></ng-template>
		<ng-template #label1>En cours d’approbation <lu-numeric-badge [value]="5" /></ng-template>
		<ng-template #label2>Approuvés <lu-numeric-badge [value]="3" /></ng-template>
		<ng-template #label3>Clos <lu-numeric-badge [value]="4" /></ng-template>
		<ng-template #label4>
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
		<lu-segmented-control-filter [label]="label0" value="0" />
		<lu-segmented-control-filter [label]="label1" value="1" />
		<lu-segmented-control-filter [label]="label2" value="2" />
		<lu-segmented-control-filter [label]="label3" value="3" />
		<lu-segmented-control-filter [label]="label4" value="4" />
	</lu-segmented-control>
	<lu-filter-pill label="Inclure les collaborateurs partis" optional name="includeFormerEmployees">
		<lu-checkbox-input [ngModel]="false" />
	</lu-filter-pill>
	<lu-filter-pill label="Date de début" optional name="startingDate">
		<lu-date-input [(ngModel)]="example1" />
	</lu-filter-pill>
	<lu-filter-pill label="Période">
		<lu-date-range-input [(ngModel)]="examplePeriod" />
	</lu-filter-pill>
	<lu-filter-pill label="Multi ApiV4" optional name="multiv4">
		<lu-multi-select [ngModel]="[]" apiV4="/organization/structure/api/establishments" filterPillLabelPlural="établissements" />
	</lu-filter-pill>
	<lu-form-field label="Test" hiddenLabel>
		<lu-text-input [ngModel]="example2" [ngModelOptions]="{ standalone: true }" hasSearchIcon hasClearer />
	</lu-form-field>
	<ng-container *luFilterPillAddonAfter>
		<button type="button" size="S" luButton="outlined" palette="product" disclosure aria-expanded="false" [luDropdown]="saveDropdown">
			<!--Enregistrer en tant que nouvelle vue-->
			Enregistrer la vue
			<lu-icon icon="arrowChevronBottom" />
		</button>
		<button type="submit" size="S" luButton="outlined">Exporter</button>
	</ng-container>
</lu-filter-bar>
<ng-template #saveDropdown>
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
</ng-template>`,
		};
	},
} as Meta;

export const Save: StoryObj<FilterBarComponent> = {
	args: {},
};
