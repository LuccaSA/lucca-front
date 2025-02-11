import { allLegumes, FilterLegumesPipe } from '@/stories/forms/select/select.utils';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FilterBarComponent, FilterPillAddonAfterDirective, FilterPillAddonBeforeDirective, FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';

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
				StoryModelDisplayComponent,
				ButtonComponent,
				LuSimpleSelectInputComponent,
				FilterLegumesPipe,
				FilterPillAddonAfterDirective,
				FilterPillAddonBeforeDirective,
				FormFieldComponent,
				TextInputComponent,
				NumericBadgeComponent,
			],
		}),
	],
	render: (args, { argTypes }) => {
		return {
			props: {
				example1: null,
				examplePeriod: null,
				legumes: allLegumes,
			},

			template: `<lu-filter-bar>
	<ul *luFilterPillAddonBefore class="segmentedControl filterBar-segmentedControl" role="presentation">
		<li class="segmentedControl-item">
			<input type="radio" class="segmentedControl-item-input" name="tab" id="tab1" checked="checked" />
			<label for="tab1" class="segmentedControl-item-action">
				Tous <lu-numeric-badge [value]="12"></lu-numeric-badge>
			</label>
		</li>
		<li class="segmentedControl-item">
			<input type="radio" class="segmentedControl-item-input" name="tab" id="tab2" />
			<label for="tab2" class="segmentedControl-item-action">
				En cours d’approbation <lu-numeric-badge [value]="5"></lu-numeric-badge>
			</label>
		</li>
		<li class="segmentedControl-item">
			<input type="radio" class="segmentedControl-item-input" name="tab" id="tab3" />
			<label for="tab3" class="segmentedControl-item-action">
				Approuvés <lu-numeric-badge [value]="3"></lu-numeric-badge>
			</label>
		</li>
		<li class="segmentedControl-item">
			<input type="radio" class="segmentedControl-item-input" name="tab" id="tab4" />
			<label for="tab4" class="segmentedControl-item-action">
				Clos <lu-numeric-badge [value]="4"></lu-numeric-badge>
			</label>
		</li>
	</ul>
	<lu-filter-pill label="Inclure les collaborateurs partis" optional name="includeFormerEmployees">
		<lu-checkbox-input [ngModel]="false"></lu-checkbox-input>
	</lu-filter-pill>
	<lu-filter-pill label="Date de début" optional name="startingDate">
		<lu-date-input [(ngModel)]="example1" /></lu-filter-pill>
	<lu-filter-pill label="Période">
		<lu-date-range-input [(ngModel)]="examplePeriod"/>
	</lu-filter-pill>
	<lu-form-field label="Test" hiddenLabel>
		<lu-text-input [ngModel]="example2" [ngModelOptions]="{standalone: true}" hasSearchIcon hasClearer />
	</lu-form-field>
	<button  *luFilterPillAddonAfter type="submit" size="S" luButton="outlined">Exporter</button>
</lu-filter-bar>`,
		};
	},
} as Meta;

export const Basic: StoryObj<FilterBarComponent> = {
	args: {},
};
