import { ChangeDetectionStrategy, Component, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateInputComponent } from '@lucca-front/ng/date2';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { applicationConfig, Meta } from '@storybook/angular-vite';

@Component({
	selector: 'date-input-stories',
	templateUrl: './date-input.stories.html',
	imports: [FormFieldComponent, DateInputComponent, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DateInputStory {
	emptyDate: Date | null = null;
	filledDate: Date | null = new Date(2024, 8, 16);
}

export default {
	title: 'QA/DateInput',
	component: DateInputStory,
	decorators: [
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'en-US' }],
		}),
	],
} as Meta;

export const Basic = {};
