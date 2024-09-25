import { LOCALE_ID } from '@angular/core';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DateInputComponent } from '../../../../packages/ng/date2/date-input/date-input.component';
import { FormsModule } from '@angular/forms';

export default {
	title: 'Documentation/Forms/Date2/DateInput',
	decorators: [
		moduleMetadata({
			imports: [DateInputComponent, FormsModule],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
	render: (args, { argTypes }) => {
		return {
			props: {
				example: new Date(),
			},
			template: `
			<lu-date-input [(ngModel)]="example"></lu-date-input>

			{{example}}
			`,
		};
	},
} as Meta;

export const Basic: StoryObj<DateInputComponent> = {};
