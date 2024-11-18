import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';

export default {
	title: 'Documentation/Forms/FiltersPills/Angular',
	component: FilterPillComponent,
	decorators: [
		moduleMetadata({
			imports: [CheckboxInputComponent, FormFieldComponent, FormsModule],
		}),
	],
} as Meta;

export const Basic: StoryObj<FilterPillComponent> = {
	args: {
		label: 'Start date',
	},
};
