import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarShortcut, DateRange, DateRangeInputComponent, PremadeShortcuts } from '@lucca-front/ng/date2';
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
			description: 'Définit une date minimum de sélection.',
		},
		max: {
			control: 'date',
			description: 'Définit une date maximum de sélection.',
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
		selected: {
			description: 'Définit une période sélectionnée.',
		},
		hideWeekend: {
			description: "Retire l'effet grisé visible sur les jours du isWeekend.",
		},
		autocomplete: {
			control: 'select',
			options: ['', 'on'],
			description: "Applique une valeur d'autocomplete au champ.",
		},
		placeholder: {
			control: 'text',
			description: 'Modifie le placeholder au champ.',
		},
		shortcuts: {
			description: 'Définit une liste de sélection rapide de périodes',
		},
		hasTodayButton: {
			description: 'Ajoute un bouton pour sélectionner la date du jour.',
		},
	},
	render: (args, { argTypes }) => {
		const { selected, min, max, focusedDate, ...flags } = args;
		const minValue = args['format'] === 'date' ? new Date(args['min']) : new Date(args['min'] ?? 0)?.toISOString().substring(0, 10);
		const maxValue = args['format'] === 'date' ? new Date(args['max']) : new Date(args['max'] ?? 0)?.toISOString().substring(0, 10);
		const focusedDateValue = args['format'] === 'date' ? new Date(args['focusedDate']) : new Date(args['focusedDate'] ?? 0)?.toISOString().substring(0, 10);
		return {
			props: {
				selected,
				min: args['min'] ? minValue : null,
				max: args['max'] ? maxValue : null,
				focusedDate: args['focusedDate'] ? focusedDateValue : null,
			},
			template: cleanupTemplate(`<lu-form-field label="Date range input example" inlineMessage="Inline message example">
				<lu-date-range-input [(ngModel)]="selected" [min]="min" [max]="max" [focusedDate]="focusedDate" ${generateInputs(flags, argTypes)} />
			</lu-form-field>

			<pr-story-model-display>{{ selected | json }}</pr-story-model-display>`),
		};
	},
} as Meta;

export const Basic: StoryObj<DateRangeInputComponent & { selected: DateRange }> = {
	args: {
		hideToday: false,
		hideWeekend: false,
		clearable: false,
		clearBehavior: 'clear',
		widthAuto: false,
		mode: 'day',
		format: 'date',
		selected: { start: new Date(), end: null },
	},
};

const shortcutsStr =
	"[\n	{\n		label: 'Since start of week',\n		range: PremadeShortcuts['SinceStartOfWeek']('fr'),\n	},\n	{\n		label: 'Last week',\n		range: PremadeShortcuts['LastWeek']('fr'),\n	},\n	{\n		label: 'Last month',\n		range: PremadeShortcuts['LastMonth']('fr'),\n	},\n]";

export const WithShortcuts: StoryObj<DateRangeInputComponent & { selected: DateRange }> = {
	render: (args: any, { argTypes }) => {
		const { min, max, selected, ...flags } = args;
		return {
			props: {
				selected,
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
				<lu-date-range-input [(ngModel)]="selected" [min]="min" [max]="max" [shortcuts]="shortcuts" ${generateInputs(flags, argTypes)} />
			</lu-form-field>

			<pr-story-model-display>{{ selected | json }}</pr-story-model-display>`),
		};
	},
	args: {
		hideToday: false,
		hideWeekend: false,
		clearable: false,
		clearBehavior: 'clear',
		widthAuto: false,
		mode: 'day',
		selected: { start: new Date(), end: null },
	},
};
