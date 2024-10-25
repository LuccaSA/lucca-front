import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateInputComponent } from '@lucca-front/ng/date2';
import { IconComponent } from '@lucca-front/ng/icon';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from '../../../helpers/stories';
import { StoryModelDisplayComponent } from '../../../helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/Date2/DateInput',
	decorators: [
		moduleMetadata({
			imports: [DateInputComponent, FormsModule, IconComponent, StoryModelDisplayComponent],
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
		enableOverflow: {
			control: 'boolean',
			description: 'Autorise la sélection des jours du mois précédent ou suivant sur la vue du mois en cours.',
		},
		showOverflow: {
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
		const { min, max, selected, ...flags } = args;
		return {
			props: {
				selected: selected || new Date(),
				min: min ? new Date(min) : null,
				max: max ? new Date(max) : null,
			},
			template: `<lu-date-input [(ngModel)]="selected" [min]="min" [max]="max" ${generateInputs(flags, argTypes)}></lu-date-input>
<pr-story-model-display>{{selected}}</pr-story-model-display>`,
		};
	},
} as Meta;

export const Basic: StoryObj<DateInputComponent> = {
	args: {
		enableOverflow: false,
		showOverflow: false,
		hideToday: false,
		hasTodayButton: false,
		hideWeekend: false,
		clearable: false,
		mode: 'day',
	},
};
