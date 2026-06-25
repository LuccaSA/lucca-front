import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CALENDAR_MODE, DATE2_CLEAR_BEHAVIOR, DATE_FORMAT_CONST, DateInputComponent } from '@lucca-front/ng/date2';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { IconComponent } from '@lucca-front/ng/icon';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { createTestStory, generateInputs, setStoryOptions } from '../../../helpers/stories';
import { StoryModelDisplayComponent } from '../../../helpers/story-model-display.component';
import { waitForAngular } from '../../../helpers/test';
import { expect, screen, userEvent, within } from 'storybook/test';

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
			description: 'Ajoute un bouton de suppression lorsqu’une date est sélectionnée.',
		},
		clearBehavior: {
			control: 'select',
			options: setStoryOptions(DATE2_CLEAR_BEHAVIOR),
			description: '[v20.1] Change le comportement au clic sur la croix de suppression',
		},
		format: {
			control: 'select',
			options: setStoryOptions(DATE_FORMAT_CONST),
			description: 'Modifie le format de date.',
		},
		mode: {
			control: 'select',
			options: setStoryOptions(CALENDAR_MODE),
			description: "Modifie le mode de sélection au mois ou à l'année.",
		},
		focusedDate: {
			control: 'date',
			description: 'Définit la date préselectionnée à l’ouverture du calendrier.',
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
			description: 'Retire l’effet grisé visible sur les jours du isWeekend.',
		},
		presentation: {
			description: '[v21.1] Transforme le champ de formulaire en donnée textuelle non éditable.',
		},
	},
	render: (args, { argTypes }) => {
		const { min, max, focusedDate, presentation, ...flags } = args;
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
			<lu-form-field label="Date input example" inlineMessage="Inline message example" ${generateInputs({ presentation }, argTypes)}>
				<lu-date-input [(ngModel)]="selected" [min]="min" [max]="max" [focusedDate]="focusedDate" autocomplete="off" ${generateInputs(flags, argTypes)} />
			</lu-form-field>

			<pr-story-model-display>{{ selected }}</pr-story-model-display>
			`,
		};
	},
} as Meta;

export const Basic: StoryObj<DateInputComponent & { selected: Date; presentation: boolean }> = {
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
		presentation: false,
		// Underlying ngModel
		selected: new Date(),
	},
};

export const StartFromYear: StoryObj<DateInputComponent & { selected: Date; presentation: boolean }> = {
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
		presentation: false,
		// Underlying ngModel
		selected: null,
	},
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const input = canvas.getByTestId('lu-date-input');

	await step('Vérifie le rendu initial', async () => {
		await expect(input).toBeVisible();
	});

	await step('Interaction souris - ouverture du calendrier', async () => {
		await userEvent.click(input);
		await waitForAngular();
		await expect(screen.getByRole('grid')).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
	});

	await step('Interaction clavier - ouverture du calendrier', async () => {
		input.focus();
		await expect(input).toHaveFocus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await expect(screen.getByRole('grid')).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
	});
});

export const Week: StoryObj<DateInputComponent & { selected: Date; presentation: boolean }> = {
	name: 'Week',
	args: {
		disableOverflow: false,
		hideOverflow: false,
		hideToday: false,
		hideWeekend: false,
		clearable: false,
		clearBehavior: 'clear',
		widthAuto: false,
		mode: 'week',
		format: 'date',
		presentation: false,
		selected: null,
		focusedDate: new Date('2024-10-14'),
	},
};

export const WeekTEST = createTestStory(Week, async ({ canvasElement, step }) => {
	const canvas = within(canvasElement);
	const input = canvas.getByRole('combobox');

	await step('Souris : ouvrir le calendrier et sélectionner une semaine', async () => {
		await userEvent.click(input);
		await waitForAngular();

		const rowheaders = within(screen.getByRole('grid')).getAllByRole('rowheader');
		await userEvent.click(within(rowheaders[2]).getByRole('button'));
		await waitForAngular();

		// Le popover se ferme et l'input affiche la semaine sélectionnée
		await expect(input).not.toHaveValue('');

		// Réouverture : exactement une ligne de semaine doit être sélectionnée
		await userEvent.click(input);
		await waitForAngular();
		const selectedWeeks = within(screen.getByRole('grid'))
			.getAllByRole('rowheader')
			.filter((th) => th.getAttribute('aria-selected') === 'true');
		await expect(selectedWeeks).toHaveLength(1);

		await userEvent.keyboard('{Escape}');
		await waitForAngular();
	});

	await step('Clavier : naviguer dans le calendrier et sélectionner une semaine', async () => {
		await userEvent.click(input);
		await waitForAngular();
		// Le focus est sur le bouton de la semaine tabbable

		// Descendre d'une semaine
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();

		// Sélectionner avec Entrée
		await userEvent.keyboard('{Enter}');
		await waitForAngular();

		await expect(input).not.toHaveValue('');

		// Réouverture : exactement une ligne de semaine doit être sélectionnée
		await userEvent.click(input);
		await waitForAngular();
		const selectedWeeks = within(screen.getByRole('grid'))
			.getAllByRole('rowheader')
			.filter((th) => th.getAttribute('aria-selected') === 'true');
		await expect(selectedWeeks).toHaveLength(1);

		await userEvent.keyboard('{Escape}');
		await waitForAngular();
	});
});
