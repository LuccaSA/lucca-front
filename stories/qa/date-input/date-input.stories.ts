import { Component } from '@angular/core';
import { DateInputComponent } from '@lucca-front/ng/date2';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { Meta } from '@storybook/angular';

@Component({
	selector: 'date-input-stories',
	templateUrl: './date-input.stories.html',
	imports: [FormFieldComponent, DateInputComponent],
})
class DateInputStory {}

export default {
	title: 'QA/Date Input',
	component: DateInputStory,
} as Meta;

export const Basic = {};
