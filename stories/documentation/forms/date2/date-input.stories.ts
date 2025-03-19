import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateInputComponent } from '@lucca-front/ng/date2';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { IconComponent } from '@lucca-front/ng/icon';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from '../../../helpers/stories';
import { StoryModelDisplayComponent } from '../../../helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/Date2/DateInput',
	decorators: [
		moduleMetadata({
			imports: [DateInputComponent, FormsModule, IconComponent, StoryModelDisplayComponent, FormFieldComponent],
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
		clearable: {
			control: 'boolean',
		},
		format: {
			control: 'select',
			options: ['date', 'date-iso'],
		},
		mode: {
			control: 'select',
			options: ['day', 'month', 'year'],
		},
		focusedDate: {
			control: 'date',
		}
	},
	render: (args, { argTypes }) => {
		const { min, max, focusedDate, ...flags } = args;
		const selected = args['selected'] ? new Date(args['selected']) : new Date();
		const defaultDate = args['format'] === 'date' ? selected : selected.toISOString().substring(0, 10);
		const minValue = args['format'] === 'date' ? new Date(args['min']) : new Date(args['min'] ?? 0)?.toISOString().substring(0, 10);
		const maxValue = args['format'] === 'date' ? new Date(args['max']) : new Date(args['max'] ?? 0)?.toISOString().substring(0, 10);
		const focusedDateValue = args['format'] === 'date' ? new Date(args['focusedDate']) : new Date(args['focusedDate'] ?? 0)?.toISOString().substring(0, 10);
		return {
			props: {
				selected: defaultDate,
				min: args['min'] ? minValue : null,
				max: args['max'] ? maxValue : null,
				focusedDate: args['focusedDate'] ? focusedDateValue : null,
			},
			template: `
			<lu-form-field label="Date input example" inlineMessage="Inline message example">
				<lu-date-input [(ngModel)]="selected" [min]="min" [max]="max" [focusedDate]="focusedDate" ${generateInputs(flags, argTypes)}></lu-date-input>
			</lu-form-field>

			<pr-story-model-display>{{selected}}</pr-story-model-display>
			`,
		};
	},
} as Meta;

export const Basic: StoryObj<DateInputComponent> = {
	args: {
		disableOverflow: false,
		hideOverflow: false,
		hideToday: false,
		hideWeekend: false,
		clearable: false,
		mode: 'day',
		format: 'date',
	},
};
