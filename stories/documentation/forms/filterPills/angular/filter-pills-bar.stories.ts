import { allLegumes, FilterLegumesPipe } from '@/stories/forms/select/select.utils';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FilterPillAddonAfterDirective, FilterPillAddonBeforeDirective, FilterPillComponent, FilterPillsBarComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/FiltersPills/FilterPillBar/Angular',
	decorators: [
		moduleMetadata({
			imports: [
				FilterPillsBarComponent,
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
			],
		}),
	],
	render: (args, { argTypes }) => {
		return {
			props: {
				example: null,
				example2: null,
				examplePeriod: null,
				legumes: allLegumes,
			},

			template: `
				<lu-filter-pills-bar>

					<lu-filter-pill label="Légumes">
						<lu-simple-select [(ngModel)]="example"	[options]="legumes | filterLegumes:clue" (clueChange)="clue = $event" />
					</lu-filter-pill>

					<lu-filter-pill label="Lorem ipsum">
						<lu-checkbox-input [ngModel]="false"></lu-checkbox-input>
					</lu-filter-pill>

					<lu-form-field label="Test" hiddenLabel>
						<lu-text-input [ngModel]="example10" [ngModelOptions]="{standalone: true}" hasSearchIcon hasClearer />
					</lu-form-field>

				</lu-filter-pills-bar>

				<hr class="divider pr-u-marginBlock400" />

				<lu-filter-pills-bar>
						<ul *luFilterPillAddonBefore class="segmentedControl filterPillBar-segmentedControl" role="presentation">
							<li class="segmentedControl-item">
								<input type="radio" class="segmentedControl-item-input" name="tab" id="tab1" checked="checked" />
								<label for="tab1" class="segmentedControl-item-action">
									Tous
								</label>
							</li>
							<li class="segmentedControl-item">
								<input type="radio" class="segmentedControl-item-input" name="tab" id="tab2" />
								<label for="tab2" class="segmentedControl-item-action">
									En cours d’approbation
								</label>
							</li>
							<li class="segmentedControl-item">
								<input type="radio" class="segmentedControl-item-input" name="tab" id="tab3" />
								<label for="tab3" class="segmentedControl-item-action">
									Approuvés
								</label>
							</li>
							<li class="segmentedControl-item">
								<input type="radio" class="segmentedControl-item-input" name="tab" id="tab4" />
								<label for="tab4" class="segmentedControl-item-action">
									Clos
								</label>
							</li>
						</ul>

					<lu-filter-pill label="Inclure les collaborateurs partis" optional name="includeFormerEmployees"><lu-checkbox-input [ngModel]="false"></lu-checkbox-input></lu-filter-pill>
					<lu-filter-pill label="Date de début">
						<lu-date-input [(ngModel)]="example2" /></lu-filter-pill>
					<lu-filter-pill label="Période">
						<lu-date-range-input [(ngModel)]="examplePeriod"/>
					</lu-filter-pill>

					<button  *luFilterPillAddonAfter type="submit" size="S" luButton="outlined">Exporter</button>
				</lu-filter-pills-bar>
			`,
		};
	},
} as Meta;

export const Basic: StoryObj<FilterPillsBarComponent> = {
	args: {},
};
