import { Component } from '@angular/core';
import { DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { Meta } from '@storybook/angular';

@Component({
	selector: 'date-range-input-stories',
	templateUrl: './date-range-input.stories.html',
	imports: [FormFieldComponent, DateRangeInputComponent],
})
class DateRangeInputStory {}

export default {
	title: 'QA/Date Range Input',
	component: DateRangeInputStory,
} as Meta;

export const Basic = {};
