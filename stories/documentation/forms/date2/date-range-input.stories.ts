import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateRangeInputComponent } from '@lucca-front/ng/date2';
import { IconComponent } from '@lucca-front/ng/icon';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from '../../../helpers/stories';
import { StoryModelDisplayComponent } from '../../../helpers/story-model-display.component';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { addWeeks, startOfDay } from 'date-fns';

export default {
	title: 'Documentation/Forms/Date2/DateRangeInput',
	decorators: [
		moduleMetadata({
			imports: [DateRangeInputComponent, FormsModule, IconComponent, StoryModelDisplayComponent, FormFieldComponent],
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
		selected: {
			control: 'date',
		},
		hideToday: {
			control: 'boolean',
		},
		hasTodayButton: {
			control: 'boolean',
		},
		enableOverflow: {
			control: 'boolean',
		},
		showOverflow: {
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
				selected: { start: startOfDay(new Date()), end: startOfDay(addWeeks(new Date(), 2)) },
				min: min ? new Date(min) : null,
				max: max ? new Date(max) : null,
			},
			template: `
			<lu-form-field label="Date range example" inlineMessage="Vacances !">
						<lu-date-range-input [(ngModel)]="selected" [min]="min" [max]="max" ${generateInputs(flags, argTypes)}></lu-date-range-input>
			</lu-form-field>

			<pr-story-model-display>{{selected | json}}</pr-story-model-display>
			`,
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
