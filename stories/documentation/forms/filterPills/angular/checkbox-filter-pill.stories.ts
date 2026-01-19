import { FormsModule } from '@angular/forms';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/FiltersPills/Checkbox/Angular',
	decorators: [
		moduleMetadata({
			imports: [FilterPillComponent, DateInputComponent, FormsModule, StoryModelDisplayComponent, DateRangeInputComponent, CheckboxInputComponent],
		}),
	],
	render: (args, context) => {
		return {
			props: {
				example: null,
				examplePeriod: null,
				checkboxValue: false,
			},
			template: `<lu-filter-pill label="Inclure les collaborateurs partis" name="includeFormerEmployees"><lu-checkbox-input [(ngModel)]="checkboxValue"></lu-checkbox-input></lu-filter-pill>

<pr-story-model-display>{{ checkboxValue }}</pr-story-model-display>
`,
		};
	},
} as Meta;

export const Basic: StoryObj<FilterPillComponent> = {
	args: {},
};
