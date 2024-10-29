import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateInputComponent } from '@lucca-front/ng/date2';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';
import { cleanupTemplate, generateInputs } from '../../../../helpers/stories';
import { FormFieldComponent } from '@lucca-front/ng/form-field';

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
		},
		max: {
			control: 'date',
		},
		selected: {
			control: 'date',
		},
		hideToday: {
			control: 'boolean',
			description: 'Masque la mise en valeur du jour en cours.',
		},
		hasTodayButton: {
			control: 'boolean',
		},
		disableOverflow: {
			control: 'boolean',
			description: 'Autorise la sélection des jours du mois précédent ou suivant sur la vue du mois en cours.',
		},
		hideOverflow: {
			control: 'boolean',
			description: 'Affiche la sélection des jours du mois précédent ou suivant sur la vue du mois en cours.',
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
		const { label, hiddenLabel, tooltip, inlineMessage, inlineMessageState, size, min, max, selected, ...flags } = args;
		return {
			props: {
				selected: selected || new Date(),
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
<lu-date-input [(ngModel)]="selected" [min]="min" [max]="max" ${generateInputs(flags, argTypes)}></lu-date-input>
</lu-form-field>
<pr-story-model-display>{{selected}}</pr-story-model-display>`),
		};
	},
} as Meta;

export const Basic: StoryObj<DateInputComponent & FormFieldComponent> = {
	args: {
		// FormField
		label: 'Label',
		tooltip: 'Tooltip message',
		hiddenLabel: false,
		required: true,
		inlineMessage: 'Helper Text',
		inlineMessageState: 'default',
		// DateInput
		disableOverflow: false,
		hideOverflow: false,
		hideToday: false,
		hasTodayButton: false,
		hideWeekend: false,
		clearable: false,
		mode: 'day',
	},
};
