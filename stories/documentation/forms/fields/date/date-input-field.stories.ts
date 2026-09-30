import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CALENDAR_MODE, DATE2_CLEAR_BEHAVIOR, DateInputComponent } from '@lucca-front/ng/date2';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

import { cleanupTemplate, generateInputs, setStoryOptions } from '../../../../helpers/stories';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/Fields/DateInput/Angular',
	decorators: [
		moduleMetadata({
			imports: [DateInputComponent, FormsModule, FormFieldComponent, StoryModelDisplayComponent],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
	argTypes: {
		min: {
			control: 'date',
			table: { category: 'inputs' },
		},
		max: {
			control: 'date',
			table: { category: 'inputs' },
		},
		selected: {
			control: 'date',
			table: { category: 'inputs' },
		},
		hideToday: {
			control: 'boolean',
			description: 'Masque la mise en valeur du jour en cours.',
			table: { category: 'inputs' },
		},
		hasTodayButton: {
			control: 'boolean',
			table: { category: 'inputs' },
		},
		enableOverflow: {
			control: 'boolean',
			description: 'Autorise la sélection des jours du mois précédent ou suivant sur la vue du mois en cours.',
			table: { category: 'inputs' },
		},
		showOverflow: {
			control: 'boolean',
			description: 'Affiche la sélection des jours du mois précédent ou suivant sur la vue du mois en cours.',
			table: { category: 'inputs' },
		},
		clearable: {
			control: 'boolean',
			table: { category: 'inputs' },
		},
		clearBehavior: {
			control: 'select',
			options: setStoryOptions(DATE2_CLEAR_BEHAVIOR),
			description: '[v20.1] Change le comportement au clic sur la croix de suppression',
			table: { category: 'inputs' },
		},
		mode: {
			control: 'select',
			options: setStoryOptions(CALENDAR_MODE),
			table: { category: 'inputs' },
		},
	},
	render: (args, { argTypes }) => {
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, min, max, selected, ...flags } = args;
		return {
			props: {
				selected,
				min: min ? new Date(min) : null,
				max: max ? new Date(max) : null,
			},
			template: cleanupTemplate(`<lu-form-field ${generateInputs(
				{
					label,
					hiddenLabel,
					tooltip,
					inlineMessage,
					inlineMessageState,
					size,
				},
				argTypes,
			)}>
<lu-date-input [(ngModel)]="selected" [min]="min" [max]="max" autocomplete="off" ${generateInputs(flags, argTypes)} />
</lu-form-field>
<pr-story-model-display>{{ selected }}</pr-story-model-display>`),
		};
	},
} as Meta;

export const Basic: StoryObj<DateInputComponent & FormFieldComponent & { selected: Date }> = {
	args: {
		// FormField
		label: 'Label',
		tooltip: 'Tooltip message',
		hiddenLabel: false,
		inlineMessage: 'Helper text',
		inlineMessageState: 'default',
		// DateInput
		disableOverflow: false,
		hideOverflow: false,
		hideToday: false,
		hasTodayButton: false,
		hideWeekend: false,
		clearable: false,
		clearBehavior: 'clear',
		mode: 'day',
		// Underlying ngModel
		selected: new Date(),
	},
};
