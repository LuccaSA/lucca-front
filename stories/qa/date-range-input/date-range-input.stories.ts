import { ChangeDetectionStrategy, Component, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateRange, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { applicationConfig, Meta } from '@storybook/angular-vite';

@Component({
	selector: 'date-range-input-stories',
	templateUrl: './date-range-input.stories.html',
	imports: [FormFieldComponent, DateRangeInputComponent, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DateRangeInputStory {
	emptyRange: DateRange | null = null;
	filledRange: DateRange = { start: new Date(2024, 8, 16), end: new Date(2024, 8, 20) };
}

export default {
	title: 'QA/DateRangeInput',
	component: DateRangeInputStory,
	decorators: [
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'en-US' }],
		}),
	],
} as Meta;

export const Basic = {};
