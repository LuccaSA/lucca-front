import { Component, LOCALE_ID } from '@angular/core';
import { DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { applicationConfig, Meta } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'date-range-input-stories',
	templateUrl: './date-range-input.stories.html',
	imports: [FormFieldComponent, DateRangeInputComponent],
})
class DateRangeInputStory {}

export default {
	title: 'QA/Date Range Input',
	component: DateRangeInputStory,
	decorators: [
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
} as Meta;

export const Basic = {};
