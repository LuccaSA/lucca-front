import { FormsModule } from '@angular/forms';
import { DateInputComponent } from '@lucca-front/ng/date2';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
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
			imports: [FilterPillComponent, DateInputComponent, FormsModule, StoryModelDisplayComponent],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: FormBasicStory): string {
	return `<div class="filterPillsWrapper -is-beginning -is-ending">
		<lu-filter-pill label="Date de début"><lu-date-input clearable [(ngModel)]="example1"></lu-date-input></lu-filter-pill>
		<lu-filter-pill label="Date de début"><lu-date-input clearable [(ngModel)]="example2"></lu-date-input></lu-filter-pill>
		<lu-filter-pill label="Date de début"><lu-date-input clearable [(ngModel)]="example3"></lu-date-input></lu-filter-pill>
		<lu-filter-pill label="Date de début"><lu-date-input clearable [(ngModel)]="example4"></lu-date-input></lu-filter-pill>
		<lu-filter-pill label="Date de début"><lu-date-input clearable [(ngModel)]="example5"></lu-date-input></lu-filter-pill>
		<lu-filter-pill label="Date de début"><lu-date-input clearable [(ngModel)]="example6"></lu-date-input></lu-filter-pill>
</div>
`;
}

const Template: StoryFn<FormBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Form = Template.bind({});
Form.args = {};
