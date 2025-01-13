import { FormsModule } from '@angular/forms';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/FiltersPills/Date/Angular',
	decorators: [
		moduleMetadata({
			imports: [FilterPillComponent, DateInputComponent, FormsModule, StoryModelDisplayComponent, DateRangeInputComponent],
		}),
	],
	render: (args, context) => {
		return {
			props: {
				example: null,
				examplePeriod: null,
			},
			template: `<lu-filter-pill label="Date de début"><lu-date-input [(ngModel)]="example" /></lu-filter-pill>

<pr-story-model-display>{{example}}</pr-story-model-display>

<lu-filter-pill label="Période"><lu-date-range-input [(ngModel)]="examplePeriod"/></lu-filter-pill>

<pr-story-model-display>{{examplePeriod | json}}</pr-story-model-display>
`,
		};
	},
} as Meta;

export const Basic: StoryObj<FilterPillComponent> = {
	args: {},
};
