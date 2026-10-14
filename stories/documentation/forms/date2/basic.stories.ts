import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CALENDAR_MODE, Calendar2Component, luDate2Translations } from '@lucca-front/ng/date2';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { generateInputs, intlArgType } from '@/helpers/stories';

export default {
	title: 'Documentation/Forms/Date2/Calendar',
	decorators: [
		moduleMetadata({
			imports: [Calendar2Component, FormsModule],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
	argTypes: {
		showOverflow: {
			control: 'boolean',
			description: 'Affiche les jours du mois précédent et suivant visibles sur le mois en cours.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		enableOverflow: {
			control: 'boolean',
			description: 'Permet la sélection des jours du mois précédent et suivant visibles sur le mois en cours.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		removeYearOverflow: {
			control: 'boolean',
			description: 'Retire les années précédant et suivant la décennie affichée dans la vue année.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		hideToday: {
			control: 'boolean',
			description: 'Retire la mise en valeur de la date du jour.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		hasTodayButton: {
			control: 'boolean',
			description: 'Ajoute un bouton pour sélectionner la date du jour.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		hideWeekend: {
			control: 'boolean',
			description: 'Retire l’effet grisé visible sur les jours du week-end.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		disableModeChange: {
			control: 'boolean',
			description: 'Empêche de passer à la vue mois ou année en cliquant sur l’en-tête du calendrier.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		ranges: {
			control: false,
			description: 'Périodes à mettre en valeur dans le calendrier (voir la story SelectRange).',
			table: { category: 'inputs', type: { summary: 'readonly DateRange[]' } },
		},
		getCellInfo: {
			control: false,
			description: 'Fonction appelée pour chaque cellule afin de personnaliser son statut : classes, désactivation, sélection (voir la story SelectDay).',
			table: { category: 'inputs', type: { summary: '(date: Date, displayMode: CalendarMode | null) => CellStatus' } },
		},
		date: {
			control: false,
			type: { name: 'other', value: 'Date', required: true },
			description: 'Date utilisée pour initialiser la période affichée, sert aussi de modèle de focus interne. Two-way.',
			table: { category: 'models', type: { summary: 'Date' } },
		},
		mode: {
			control: 'select',
			options: CALENDAR_MODE,
			description: 'Granularité de sélection : jour, semaine, mois ou année. Two-way.',
			table: { category: 'models', type: { summary: 'CalendarMode' }, defaultValue: { summary: 'day' } },
		},
		displayMode: {
			control: false,
			description: 'Vue affichée par le calendrier (jour, mois ou année). Vaut `mode` par défaut. Two-way.',
			table: { category: 'models', type: { summary: 'CalendarMode | null' } },
		},
		tabbableDate: {
			control: false,
			description: 'Date de la cellule qui reçoit le focus avec la touche Tab. Vaut `date` par défaut. Two-way.',
			table: { category: 'models', type: { summary: 'Date | null' } },
		},
		dateHovered: {
			control: false,
			description: 'Date de la cellule survolée ou focus, utilisée pour prévisualiser une période en cours de sélection. Two-way.',
			table: { category: 'models', type: { summary: 'Date | null' } },
		},
		nextPage: {
			description: 'Événement déclenché lors de la navigation vers la page suivante du calendrier.',
			action: 'nextPage',
			control: false,
			table: { category: 'outputs', type: { summary: 'void' } },
		},
		previousPage: {
			description: 'Événement déclenché lors de la navigation vers la page précédente du calendrier.',
			action: 'previousPage',
			control: false,
			table: { category: 'outputs', type: { summary: 'void' } },
		},
		dateClicked: {
			description: 'Événement déclenché lors du clic sur une date, avec la date en paramètre.',
			action: 'dateClicked',
			control: false,
			table: { category: 'outputs', type: { summary: 'Date' } },
		},
		intl: intlArgType(luDate2Translations, 'Date2Translate'),
	},
	render: (args, { argTypes }) => {
		return {
			props: {
				...args,
				currentMonth: new Date(),
			},
			template: `<lu-calendar2 [date]="currentMonth"${generateInputs(args, argTypes)} (dateClicked)="dateClicked($event)" (nextPage)="nextPage()" (previousPage)="previousPage()" />`,
		};
	},
} as Meta;

export const Basic: StoryObj<Calendar2Component> = {
	args: {
		showOverflow: true,
		enableOverflow: true,
		removeYearOverflow: false,
		hideToday: false,
		hasTodayButton: false,
		hideWeekend: false,
		disableModeChange: false,
		mode: 'day',
	},
};
