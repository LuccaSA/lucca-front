import { Component, LOCALE_ID } from '@angular/core';
import { DateInputComponent } from '@lucca-front/ng/date2';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { applicationConfig, Meta } from '@storybook/angular';

@Component({
	selector: 'date-input-stories',
	templateUrl: './date-input.stories.html',
	imports: [FormFieldComponent, DateInputComponent],
})
class DateInputStory {}

export default {
	title: 'QA/DateInput',
	component: DateInputStory,
	decorators: [
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
} as Meta;

export const Basic = {};
