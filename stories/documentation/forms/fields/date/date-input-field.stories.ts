import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, LOCALE_ID, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { CALENDAR_MODE, DATE2_CLEAR_BEHAVIOR, DateInputComponent, validDate } from '@lucca-front/ng/date2';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

import { cleanupTemplate, generateInputs, setStoryOptions } from '../../../../helpers/stories';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/Fields/DateInput/Angular',
	decorators: [
		moduleMetadata({
			imports: [DateInputComponent, FormFieldComponent, StoryModelDisplayComponent],
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
<lu-date-input [(value)]="selected" [min]="min" [max]="max" autocomplete="off" ${generateInputs(flags, argTypes)} />
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
		// Underlying value
		selected: new Date(),
	},
};

@Component({
	selector: 'date-input-signal-forms-story',
	imports: [DateInputComponent, FormFieldComponent, FormField, StoryModelDisplayComponent, JsonPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-form-field label="Date de début" inlineMessage="Requis">
			<lu-date-input [formField]="form.start" autocomplete="off" />
		</lu-form-field>
		<pr-story-model-display>{{ form().value() | json }}</pr-story-model-display>
	`,
})
class DateInputSignalFormsStory {
	readonly model = signal<{ start: Date | null }>({ start: null });
	readonly form = form(this.model, (p) => {
		required(p.start);
		validDate(p.start);
	});
}

export const SignalForms: StoryObj = {
	parameters: {
		docs: {
			description: {
				story:
					'Pilotage par signal forms : `lu-date-input` implémente `FormValueControl<Date | null>` et se branche sur un champ via la directive `[formField]`. Une saisie non parsable produit une date invalide : déclarez `validDate` (importé de `@lucca-front/ng/date2`) dans le schema du `form()`, en plus de `required`.',
			},
		},
	},
	render: () => ({
		moduleMetadata: { imports: [DateInputSignalFormsStory] },
		template: `<date-input-signal-forms-story />`,
	}),
};
