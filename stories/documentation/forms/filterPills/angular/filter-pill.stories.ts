import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DateInputComponent } from '../../../../../packages/ng/date2/date-input/date-input.component';

export default {
	title: 'Documentation/Forms/FiltersPills/Angular',
	decorators: [
		moduleMetadata({
			imports: [FilterPillComponent, DateInputComponent],
		}),
	],
	render: (args, context) => {
		return {
			template: `<lu-filter-pill label="Test"><lu-date-input></lu-date-input></lu-filter-pill>`,
		};
	},
} as Meta;

export const Basic: StoryObj<FilterPillComponent> = {
	args: {
		label: 'Date',
		icon: 'calendarDate',
	},
};
