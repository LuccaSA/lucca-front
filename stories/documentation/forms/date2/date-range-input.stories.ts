import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarShortcut, DateRangeInputComponent, PremadeShortcuts } from '@lucca-front/ng/date2';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
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
		hideWeekend: false,
		clearable: false,
		mode: 'day',
	},
};

const shortcutsStr =
	"[\n	{\n		label: 'Since start of week',\n		range: PremadeShortcuts['SinceStartOfWeek']('fr'),\n	},\n	{\n		label: 'Last week',\n		range: PremadeShortcuts['LastWeek']('fr'),\n	},\n	{\n		label: 'Last month',\n		range: PremadeShortcuts['LastMonth']('fr'),\n	},\n]";

export const WithShortcuts: StoryObj<DateRangeInputComponent> = {
	render: (args: any, { argTypes }) => {
		const { min, max, selected, ...flags } = args;
		return {
			props: {
				min: min ? new Date(min) : null,
				max: max ? new Date(max) : null,
				shortcuts: [
					{
						label: 'Since start of week',
						range: PremadeShortcuts['SinceStartOfWeek']('fr'),
					},
					{
						label: 'Last week',
						range: PremadeShortcuts['LastWeek']('fr'),
					},
					{
						label: 'Last month',
						range: PremadeShortcuts['LastMonth']('fr'),
					},
				] as CalendarShortcut[],
				shortcutsStr,
			},

			template: cleanupTemplate(`
			<lu-form-field label="Date range input example" inlineMessage="Inline message example">
				<lu-date-range-input [(ngModel)]="selected" [min]="min" [max]="max" [shortcuts]="shortcuts" ${generateInputs(flags, argTypes)}></lu-date-range-input>
			</lu-form-field>

			<pr-story-model-display>{{selected | json}}</pr-story-model-display>`),
		};
	},
	args: {
		hideToday: false,

		hideWeekend: false,
		clearable: false,
		mode: 'day',
	},
};
