import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DateInputComponent } from '@lucca-front/ng/date2';
import { FormsModule } from '@angular/forms';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/FiltersPills/Angular',
	decorators: [
		moduleMetadata({
			imports: [FilterPillComponent, DateInputComponent, FormsModule, StoryModelDisplayComponent],
		}),
	],
	render: (args, context) => {
		return {
			props: {
				example: null,
			},
			template: `<lu-filter-pill label="Date de début"><lu-date-input [(ngModel)]="example"></lu-date-input></lu-filter-pill>

<pr-story-model-display>{{example}}</pr-story-model-display>
`,
		};
	},
} as Meta;

export const Basic: StoryObj<FilterPillComponent> = {
	args: {
		label: 'Date',
		icon: 'calendarDate',
	},
};
