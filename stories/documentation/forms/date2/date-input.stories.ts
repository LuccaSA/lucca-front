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
			description: 'Définit une date minimum de sélection.',
		},
		max: {
			control: 'date',
			description: 'Définit une date maximum de sélection.',
		},
		selected: {
			control: 'date',
			description: 'Définit une date sélectionnée.',
		},
		hideToday: {
			control: 'boolean',
			description: 'Retire la mise en valeur de la date du jour.',
		},
		clearable: {
			control: 'boolean',
			description: "Ajoute un bouton de suppression lorsqu'une date est sélectionnée.",
		},
		clearBehavior: {
			control: 'select',
			options: ['clear', 'reset'],
			description: '[v20.1] Change le comportement au clic sur la croix de suppression',
		},
		format: {
			control: 'select',
			options: ['date', 'date-iso'],
			description: 'Modifie le format de date.',
		},
		mode: {
			control: 'select',
			options: ['day', 'month', 'year'],
			description: "Modifie le mode de sélection au mois ou à l'année.",
		},
		focusedDate: {
			control: 'date',
			description: '',
		},
		widthAuto: {
			control: 'boolean',
			description: 'Applique une pleine largeur au composant.',
		},
		disableOverflow: {
			description: 'Empêche la sélection des jours du mois précédent ou suivant visibles sur le mois en cours.',
		},
		hideOverflow: {
			description: 'Masque les jours du mois précédent ou suivant visibles sur le mois en cours.',
		},
		hideWeekend: {
			description: "Retire l'effet grisé visible sur les jours du isWeekend.",
		},
	},
	render: (args, { argTypes }) => {
		const { min, max, focusedDate, ...flags } = args;
		const selected = args['selected'] ? new Date(args['selected']) : null;
		const defaultDate = args['format'] === 'date' ? selected : selected?.toISOString().substring(0, 10);
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
				<lu-date-input [(ngModel)]="selected" [min]="min" [max]="max" [focusedDate]="focusedDate" autocomplete="off" ${generateInputs(flags, argTypes)} />
			</lu-form-field>

			<pr-story-model-display>{{ selected }}</pr-story-model-display>
			`,
		};
	},
} as Meta;

export const Basic: StoryObj<DateInputComponent & { selected: Date }> = {
	args: {
		disableOverflow: false,
		hideOverflow: false,
		hideToday: false,
		hideWeekend: false,
		clearable: false,
		clearBehavior: 'clear',
		widthAuto: false,
		mode: 'day',
		format: 'date',
		// Underlying ngModel
		selected: new Date(),
	},
};

export const StartFromYear: StoryObj<DateInputComponent & { selected: Date }> = {
	args: {
		disableOverflow: false,
		hideOverflow: false,
		hideToday: false,
		hideWeekend: false,
		clearable: false,
		clearBehavior: 'clear',
		widthAuto: false,
		mode: 'day',
		calendarMode: 'year',
		format: 'date',
		// Underlying ngModel
		selected: null,
	},
};
