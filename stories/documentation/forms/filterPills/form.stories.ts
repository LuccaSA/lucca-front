import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DateInputComponent } from '@lucca-front/ng/date2';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
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
			],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: FormBasicStory): string {
	return `
	<lu-scroll-box class="filterPillScrollBoxWrapper">
		<lu-filter-pill label="Date de début"><lu-date-input clearable [(ngModel)]="example1"></lu-date-input></lu-filter-pill>
		<lu-filter-pill label="Date de début"><lu-date-input clearable [(ngModel)]="example2"></lu-date-input></lu-filter-pill>
		<lu-filter-pill label="Date de début"><lu-date-input clearable [(ngModel)]="example3"></lu-date-input></lu-filter-pill>
		<lu-filter-pill label="Date de début"><lu-date-input clearable [(ngModel)]="example4"></lu-date-input></lu-filter-pill>
		<lu-filter-pill label="Date de début"><lu-date-input clearable [(ngModel)]="example5"></lu-date-input></lu-filter-pill>
		<lu-filter-pill label="Date de début"><lu-date-input clearable [(ngModel)]="example6"></lu-date-input></lu-filter-pill>
		<button type="button" luButton="text" size="S" [luPopover2]="contentOptions" palette="neutral"><lu-icon icon="filtersDescending" alt="Gérer les filtres"></lu-icon></button>
		<button type="button" luButton="text" size="S">Appliquer les filtres</button>
	</lu-scroll-box>
	<ng-template #contentOptions>
		<div class="filterPill_popoverOptions">
			<lu-form-field label="Lorem" class="filterPill_popoverOptions-option">
				<lu-checkbox-input [(ngModel)]="example7" />
			</lu-form-field>
			<lu-form-field label="Ipsum" class="filterPill_popoverOptions-option">
				<lu-checkbox-input [(ngModel)]="example8" />
			</lu-form-field>
			<lu-form-field label="Dolor sit amet" class="filterPill_popoverOptions-option">
				<lu-checkbox-input [(ngModel)]="example9" />
			</lu-form-field>
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
