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

			<lu-filter-pill label="Manager"><lu-date-input [(ngModel)]="example1"></lu-date-input></lu-filter-pill>
			<lu-filter-pill label="Département"><lu-date-input [(ngModel)]="example2"></lu-date-input></lu-filter-pill>
			<lu-filter-pill label="Établissement"><lu-date-input [(ngModel)]="example3"></lu-date-input></lu-filter-pill>
			<lu-filter-pill label="Profil"><lu-date-input [(ngModel)]="example4"></lu-date-input></lu-filter-pill>
			<lu-filter-pill label="Statut"><lu-date-input [(ngModel)]="example5"></lu-date-input></lu-filter-pill>
			<div class="filterPillScrollBoxWrapper-group">
				<lu-filter-pill label="Date de début"><lu-date-input [(ngModel)]="example6"></lu-date-input></lu-filter-pill>
				<button type="button" luButton="text" size="S" [luPopover2]="contentOptions" palette="neutral"><lu-icon icon="filtersDescending" alt="Gérer les filtres"></lu-icon></button>
			</div>
			<div class="filterPillScrollBoxWrapper-group">
				<lu-form-field label="Test" hiddenLabel size="S" style="width: 15rem">
					<lu-text-input [(ngModel)]="example10" hasSearchIcon hasClearer />
				</lu-form-field>
				
				<button type="submit" size="S" luButton="text">Appliquer les filtres</button>
				
				<!--				
				<button type="submit" size="S" luButton="outlined" class="pr-u-marginLeftAuto">Exporter</button>
				-->
			</div>

			<div class="filterPillScrollBoxWrapper-last"></div>
		</lu-scroll-box>
	</lu-filter-bar>
	<ng-template #contentOptions>
		<form class="filterPill_popover-content popover-contentOptional">
			<lu-form-field label="Manager" class="filterPill_popover-content-formField">
				<lu-checkbox-input [ngModel]="true"  />
			</lu-form-field>
			<lu-form-field label="Département" class="filterPill_popover-content-formField">
				<lu-checkbox-input [ngModel]="true" />
			</lu-form-field>
			<lu-form-field label="Établissement" class="filterPill_popover-content-formField">
				<lu-checkbox-input [ngModel]="true" />
			</lu-form-field>
			<lu-form-field label="Profil" class="filterPill_popover-content-formField">
				<lu-checkbox-input [ngModel]="true" />
			</lu-form-field>
			<lu-form-field label="Statut" class="filterPill_popover-content-formField">
				<lu-checkbox-input [ngModel]="true" />
			</lu-form-field>
			<lu-form-field label="Date de début" class="filterPill_popover-content-formField">
				<lu-checkbox-input [ngModel]="true" />
			</lu-form-field>
			<button luButton="outlined" size="S" type="submit">Appliquer</button>
		</form>
	</ng-template>
`;
}

const Template: StoryFn<FormBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Form = Template.bind({});
Form.args = {};
