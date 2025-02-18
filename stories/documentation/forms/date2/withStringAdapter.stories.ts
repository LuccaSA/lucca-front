import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateInputComponent, LuDateInputWithStringAdapterDirective } from '@lucca-front/ng/date2';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { IconComponent } from '@lucca-front/ng/icon';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from '../../../helpers/stories';
import { StoryModelDisplayComponent } from '../../../helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/Date2/DateInput',
	decorators: [
		moduleMetadata({
			imports: [DateInputComponent, FormsModule, IconComponent, StoryModelDisplayComponent, FormFieldComponent, LuDateInputWithStringAdapterDirective],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
	argTypes: {
		min: {
			control: 'text',
		},
		max: {
			control: 'text',
		},
		selected: {
			control: 'text',
		},
		hideToday: {
			control: { type: 'boolean' },
		},
		clearable: {
			control: 'boolean',
		},
		mode: {
			control: { type: 'select' },
			options: ['day', 'month', 'year'],
		},
	},
	render: (args, { argTypes }) => {
		const { min, max, selected, ...flags } = args;
		return {
			props: {
				selected: selected || new Date().toISOString().substring(0, 10),
				min: min ?? null,
				max: max ?? null,
			},
			template: `
			<lu-form-field label="Date input example" inlineMessage="Inline message example">
				<lu-date-input withStringAdapter [(ngModel)]="selected" [min]="min" [max]="max" ${generateInputs(flags, argTypes)}></lu-date-input>
			</lu-form-field>

			<pr-story-model-display>{{selected}}</pr-story-model-display>
			`,
		};
	},
} as Meta;

export const WithStringAdapter: StoryObj<DateInputComponent> = {};
