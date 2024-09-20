import { LOCALE_ID } from '@angular/core';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { DateInputComponent } from '../../../../packages/ng/date2/date-input/date-input.component';

export default {
	title: 'Documentation/Forms/Date2/DateInput',
	decorators: [
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
	component: DateInputComponent,
} as Meta;

export const Basic: StoryObj<DateInputComponent> = {};
