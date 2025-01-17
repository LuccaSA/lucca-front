import { allLegumes, FilterLegumesPipe } from '@/stories/forms/select/select.utils';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FilterPillComponent, FilterPillsBarComponent } from '@lucca-front/ng/filter-pills';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';
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
				barState: {},
				barState2: { includeFormerEmployees: false },
			},

			template: `
				<lu-filter-pills-bar [(pillsState)]="barState">

					<lu-filter-pill label="Légumes" name="vegetables">
						<lu-simple-select [(ngModel)]="example"	[options]="legumes | filterLegumes:clue" (clueChange)="clue = $event" />
					</lu-filter-pill>

					<lu-filter-pill label="Lorem ipsum" name="loremIpsum">
						<lu-checkbox-input [ngModel]="false"></lu-checkbox-input>
					</lu-filter-pill>


				</lu-filter-pills-bar>

				<hr class="divider pr-u-marginBlock400" />

				<lu-filter-pills-bar ${generateInputs(args, argTypes)} [(pillsState)]="barState2" [addonBefore]="beforeTpl" [addonAfter]="afterTpl">
					<ng-template #beforeTpl>
						<ul class="segmentedControl filterPillBar-segmentedControl" role="presentation">
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
					</ng-template>

					<lu-filter-pill label="Inclure les collaborateurs partis" name="includeFormerEmployees">
						<lu-checkbox-input [ngModel]="false"></lu-checkbox-input>
					</lu-filter-pill>
					<lu-filter-pill label="Date de début" name="startDate">
						<lu-date-input [(ngModel)]="example2" />
					</lu-filter-pill>
					<lu-filter-pill label="Période" name="periode">
						<lu-date-range-input [(ngModel)]="examplePeriod"/>
					</lu-filter-pill>

					<ng-template #afterTpl>
						<button type="submit" size="S" luButton="outlined">Exporter</button>
					</ng-template>
				</lu-filter-pills-bar>

				<pr-story-model-display>
					{{barState2 | json}}
				</pr-story-model-display>
			`,
		};
	},
} as Meta;

export const Basic: StoryObj<FilterPillsBarComponent> = {
	args: {
		toggleButton: false,
	},
};
