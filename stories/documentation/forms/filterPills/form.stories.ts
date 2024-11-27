import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DateInputComponent } from '@lucca-front/ng/date2';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { ScrollBoxComponent } from '@lucca-front/ng/scrollBox';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';

interface FormBasicStory {
	label: string;
	value: string;
	expanded: boolean;
}

export default {
	title: 'Documentation/Forms/FiltersPills',
	decorators: [
		moduleMetadata({
			imports: [
				FilterPillComponent,
				DateInputComponent,
				FormsModule,
				StoryModelDisplayComponent,
				ScrollBoxComponent,
				ButtonComponent,
				IconComponent,
				PopoverDirective,
				FormFieldComponent,
				CheckboxInputComponent,
				TextInputComponent,
			],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: FormBasicStory): string {
	return `
	<lu-filter-bar [(ngModel)]="group" [(clue)]="change">
		<lu-scroll-box class="filterPillScrollBoxWrapper">
			<div class="filterPillScrollBoxWrapper-first"></div>

			<div class="filterPill">
				<label for="input1" class="filterPill-label" luTooltip="Inclure les collaborateurs partis" luTooltipWhenEllipsis="true">
					Inclure les collaborateurs partis
					<span class="filterPill-label-placeholder" aria-hidden="true" data-content-before="Inclure les collaborateurs partis"></span>
				</label>
				<span class="filterPill-checkbox">
					<input type="checkbox" id="input1" class="filterPill-checkbox-input" />
					<span class="filterPill-checkbox-icon" aria-hidden="true">
						<span class="filterPill-checkbox-icon-check"></span>
					</span>
				</span>
			</div>
			
			<div class="filterPill">
				<label for="input1" class="filterPill-label" luTooltip="Département" luTooltipWhenEllipsis="true">Équipe :</label>
				<button class="filterPill-combobox" type="button" id="input1" role="combobox" aria-expanded="false" luTooltipWhenEllipsis="true">
					Finance
				</button>
				<button type="button" class="filterPill-clear clear"><span class="u-mask">Vider ce champ</span></button>
				<button type="button" aria-hidden="true" tabindex="-1" class="filterPill-toggle">
					<lu-icon icon="arrowChevronBottom" size="S" />
				</button>
			</div>
			

			<div class="filterPillScrollBoxWrapper-group">
				<lu-filter-pill label="Échéance"><lu-date-input [(ngModel)]="example6"></lu-date-input></lu-filter-pill>
				<button type="button" luButton="text" size="S" [luPopover2]="contentOptions" palette="neutral"><lu-icon icon="filtersDescending" alt="Gérer les filtres"></lu-icon></button>
			</div>
			<div class="filterPillScrollBoxWrapper-group">
				<lu-form-field label="Test" hiddenLabel size="S" style="width: 15rem">
					<lu-text-input [(ngModel)]="example10" hasSearchIcon hasClearer />
				</lu-form-field>
				<button type="submit" size="S" luButton="text" class="u-displayNone">Appliquer les filtres</button>		
				<button type="submit" size="S" luButton="outlined" class="u-marginLeftAuto u-displayNone">Exporter</button>
			</div>

			<div class="filterPillScrollBoxWrapper-last"></div>
		</lu-scroll-box>
	</lu-filter-bar>
	<ng-template #contentOptions>
		<div class="filterPill_popover-content popover-contentOptional">
			<lu-form-field label="Inclure les collaborateurs partis" class="filterPill_popover-content-formField">
				<lu-checkbox-input [ngModel]="true"  />
			</lu-form-field>	
			<lu-form-field label="Équipe" class="filterPill_popover-content-formField">
				<lu-checkbox-input [ngModel]="true" />
			</lu-form-field>
			<lu-form-field label="Statut" class="filterPill_popover-content-formField">
				<lu-checkbox-input [ngModel]="false" />
			</lu-form-field>
			<lu-form-field label="Échéance" class="filterPill_popover-content-formField">
				<lu-checkbox-input [ngModel]="true" />
			</lu-form-field>
			<lu-form-field label="Fréquence de facturation" class="filterPill_popover-content-formField">
				<lu-checkbox-input [ngModel]="false"  />
			</lu-form-field>
			<button luButton="text" size="S" type="submit" class="u-displayNone">Activer ces filtres</button>
		</div>
	</ng-template>
`;
}

const Template: StoryFn<FormBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Form = Template.bind({});
Form.args = {};
