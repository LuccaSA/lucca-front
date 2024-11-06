import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarShortcut, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { addMonths, endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';
import { cleanupTemplate, generateInputs } from '../../../helpers/stories';
import { StoryModelDisplayComponent } from '../../../helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/Date2/DateRangeInput',
	component: DateRangeInputComponent,
	decorators: [
		moduleMetadata({
			imports: [DateRangeInputComponent, FormsModule, StoryModelDisplayComponent, FormFieldComponent],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
	argTypes: {
		min: {
			control: 'date',
		},
		max: {
			control: 'date',
		},
		hideToday: {
			control: 'boolean',
		},
		clearable: {
			control: 'boolean',
		},
		mode: {
			control: 'select',
			options: ['day', 'month', 'year'],
		},
	},
	render: (args, { argTypes }) => {
		const { min, max, selected, ...flags } = args;
		return {
			props: {
				min: min ? new Date(min) : null,
				max: max ? new Date(max) : null,
			},
			template: cleanupTemplate(`<lu-form-field label="Date range input example" inlineMessage="Inline message example">
				<lu-date-range-input [(ngModel)]="selected" [min]="min" [max]="max" ${generateInputs(flags, argTypes)}></lu-date-range-input>
			</lu-form-field>

			<pr-story-model-display>{{selected | json}}</pr-story-model-display>`),
		};
	},
} as Meta;

export const Basic: StoryObj<DateRangeInputComponent> = {
	args: {
		hideToday: false,
		hasTodayButton: false,
		hideWeekend: false,
		clearable: false,
		mode: 'day',
	},
};
