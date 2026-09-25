import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CALENDAR_MODE, CalendarShortcut, DATE2_CLEAR_BEHAVIOR, DATE_FORMAT_CONST, DateRange, DateRangeInputComponent, PremadeShortcuts } from '@lucca-front/ng/date2';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { expect, screen, userEvent, within } from 'storybook/test';
import { cleanupTemplate, createTestStory, generateInputs, setStoryOptions } from '../../../helpers/stories';
import { StoryModelDisplayComponent } from '../../../helpers/story-model-display.component';
import { expectNgModelDisplay, pickDay, repeatKeyboardUserEvent, waitForAngular } from '../../../helpers/test';

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
			table: { category: 'inputs' },
		},
		max: {
			control: 'date',
			description: 'Définit une date maximum de sélection.',
			table: { category: 'inputs' },
		},
		hideToday: {
			control: 'boolean',
			description: 'Retire la mise en valeur de la date du jour.',
			table: { category: 'inputs' },
		},
		clearable: {
			control: 'boolean',
			description: 'Ajoute un bouton de suppression lorsqu’une date est sélectionnée.',
			table: { category: 'inputs' },
		},
		clearBehavior: {
			control: 'select',
			options: setStoryOptions(DATE2_CLEAR_BEHAVIOR),
			description: '[v20.1] Change le comportement au clic sur la croix de suppression',
			table: { category: 'inputs' },
		},
		format: {
			control: 'select',
			options: setStoryOptions(DATE_FORMAT_CONST),
			description: 'Modifie le format de date.',
			table: { category: 'inputs' },
		},
		mode: {
			control: 'select',
			options: setStoryOptions(CALENDAR_MODE),
			description: "Modifie le mode de sélection à la semaine, au mois ou à l'année.",
			table: { category: 'inputs' },
		},
		focusedDate: {
			control: 'date',
			description: 'Définit la date préselectionnée à l’ouverture du calendrier.',
			table: { category: 'inputs' },
		},
		widthAuto: {
			control: 'boolean',
			description: 'Applique une pleine largeur au composant.',
			table: { category: 'inputs' },
		},
		selected: {
			description: 'Définit une période sélectionnée.',
			table: { category: 'inputs' },
		},
		hideWeekend: {
			description: 'Retire l’effet grisé visible sur les jours du isWeekend.',
			table: { category: 'inputs' },
		},
		autocomplete: {
			control: 'select',
			options: ['', 'on'],
			description: 'Applique une valeur d’autocomplete au champ.',
			table: { category: 'inputs' },
		},
		placeholder: {
			control: 'text',
			description: 'Modifie le placeholder au champ.',
			table: { category: 'inputs' },
		},
		shortcuts: {
			description: 'Définit une liste de sélection rapide de périodes',
			table: { category: 'inputs' },
		},
		hasTodayButton: {
			description: 'Ajoute un bouton pour sélectionner la date du jour.',
			table: { category: 'inputs' },
		},
		presentation: {
			description: '[v21.1] Transforme le champ de formulaire en donnée textuelle non éditable.',
			table: { category: 'inputs' },
		},
		panelOpened: {
			description: "Événement déclenché à l'ouverture du calendrier.",
			action: 'panelOpened',
			control: false,
			table: { category: 'outputs', type: { summary: 'void' } },
		},
		panelClosed: {
			description: 'Événement déclenché à la fermeture du calendrier.',
			action: 'panelClosed',
			control: false,
			table: { category: 'outputs', type: { summary: 'void' } },
		},
	},
	render: (args, { argTypes }) => {
		const { selected, min, max, focusedDate, presentation, ...flags } = args;
		const minValue = args['format'] === 'date' ? new Date(args['min']) : new Date(args['min'] ?? 0)?.toISOString().substring(0, 10);
		const maxValue = args['format'] === 'date' ? new Date(args['max']) : new Date(args['max'] ?? 0)?.toISOString().substring(0, 10);
		const focusedDateValue = args['format'] === 'date' ? new Date(args['focusedDate']) : new Date(args['focusedDate'] ?? 0)?.toISOString().substring(0, 10);
		return {
			props: {
				...args,
				selected,
				min: args['min'] ? minValue : null,
				max: args['max'] ? maxValue : null,
				focusedDate: args['focusedDate'] ? focusedDateValue : null,
			},
			template: cleanupTemplate(`<lu-form-field label="Date range input example" inlineMessage="Inline message example" ${generateInputs({ presentation }, argTypes)}>
				<lu-date-range-input [(ngModel)]="selected" [min]="min" [max]="max" [focusedDate]="focusedDate" ${generateInputs(flags, argTypes)} (panelOpened)="panelOpened()" (panelClosed)="panelClosed()" />
			</lu-form-field>

			<pr-story-model-display>{{ selected | json }}</pr-story-model-display>`),
		};
	},
} as Meta;

export const Basic: StoryObj<DateRangeInputComponent & { selected: DateRange; presentation: boolean }> = {
	args: {
		hideToday: false,
		hideWeekend: false,
		clearable: false,
		clearBehavior: 'clear',
		widthAuto: false,
		mode: 'day',
		format: 'date',
		presentation: false,
		selected: { start: new Date(), end: null },
	},
};

const shortcutsStr =
	"[\n	{\n		label: 'Since start of week',\n		range: PremadeShortcuts['SinceStartOfWeek']('fr'),\n	},\n	{\n		label: 'Last week',\n		range: PremadeShortcuts['LastWeek']('fr'),\n	},\n	{\n		label: 'Last month',\n		range: PremadeShortcuts['LastMonth']('fr'),\n	},\n]";

export const WithShortcuts: StoryObj<DateRangeInputComponent & { selected: DateRange; presentation: boolean }> = {
	render: (args: any, { argTypes }) => {
		const { min, max, selected, presentation, ...flags } = args;
		return {
			props: {
				...args,
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
			<lu-form-field label="Date range input example" inlineMessage="Inline message example" ${generateInputs({ presentation }, argTypes)}>
				<lu-date-range-input [(ngModel)]="selected" [min]="min" [max]="max" [shortcuts]="shortcuts" ${generateInputs(flags, argTypes)} (panelOpened)="panelOpened()" (panelClosed)="panelClosed()" />
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
		presentation: false,
		selected: { start: new Date(), end: null },
	},
};

// Starts from an empty range: with a single date selected, opening the calendar focuses the empty field
export const BasicTEST = createTestStory({ ...Basic, args: { ...Basic.args, selected: { start: null, end: null } } }, async ({ canvasElement, step }) => {
	const canvas = within(canvasElement);
	await waitForAngular();
	const startInput = canvas.getByLabelText('Start');
	const endInput = canvas.getByLabelText('End');
	const today = new Date();

	await step('Select start and end date', async () => {
		const targetStartDay = today.getDate() === 15 ? 16 : 15;
		const expectedStart = new Date(today.getFullYear(), today.getMonth(), targetStartDay);
		const targetEndDay = today.getDate() === 20 ? 21 : 20;
		const expectedEnd = new Date(today.getFullYear(), today.getMonth(), targetEndDay);

		await step('Start', async () => {
			const targetDay = today.getDate() === 15 ? 16 : 15;
			await pickDay(startInput, targetDay, true);
			await waitForAngular();
			await expectNgModelDisplay(canvasElement, `{ "start": "${expectedStart.toISOString()}", "end": null, "scope": "day" }`);
		});

		await step('End', async () => {
			const targetDay = today.getDate() === 20 ? 21 : 20;
			await pickDay(endInput, targetDay, true);
			await waitForAngular();
			await expectNgModelDisplay(canvasElement, `{ "start": "${expectedStart.toISOString()}", "end": "${expectedEnd.toISOString()}", "scope": "day" }`);
		});
	});

	await step('Invalid date', async () => {
		await userEvent.clear(startInput);
		await userEvent.type(startInput, 'not a date');
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(startInput).toHaveAttribute('aria-invalid', 'true');
	});
});

// Single date selection tests use a fixed month (June 2025), so they don't depend on the current date
type DateRangeInputStory = StoryObj<DateRangeInputComponent & { selected: DateRange; presentation: boolean }>;

function withSelection(name: string, selected: DateRange | undefined): DateRangeInputStory {
	return {
		...Basic,
		name,
		args: { ...Basic.args, selected, focusedDate: new Date(2025, 5, 1) },
	};
}

function getDayCell(day: number): HTMLElement {
	// The first grid displays June 2025, the second one (if any) displays July 2025
	const grid = screen.getAllByRole('grid')[0];
	return within(grid).getByRole('button', { name: day.toString() }).closest('td') as HTMLElement;
}

async function pickDayInOpenCalendar(day: number): Promise<void> {
	await userEvent.click(within(getDayCell(day)).getByRole('button'));
	await waitForAngular();
}

export const StartDateOnlyTEST = createTestStory(withSelection('Start date only', { start: new Date(2025, 5, 10), end: null }), async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const startInput = canvas.getByLabelText('Start');
	const endInput = canvas.getByLabelText('End');

	await step('Keyboard: ArrowDown opens the calendar and Escape closes it', async () => {
		startInput.focus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await expect(screen.getByRole('dialog')).toBeVisible();
		// Escape is handled by the text fields, ArrowDown moved the focus into the calendar
		startInput.focus();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	await step('Opening the calendar moves the focus to the empty end field', async () => {
		await userEvent.click(startInput);
		await waitForAngular();
		await expect(screen.getByRole('dialog')).toBeVisible();
		await expect(endInput).toHaveFocus();
	});

	await step('The start date and every following date are highlighted', async () => {
		await expect(getDayCell(10)).toHaveAttribute('aria-selected', 'true');
		await expect(getDayCell(10)).toHaveClass('is-start');
		await expect(getDayCell(20)).toHaveClass('is-selectionInProgress');
		await expect(getDayCell(20)).toHaveAttribute('aria-selected', 'false');
		await expect(getDayCell(5)).not.toHaveClass('is-selectionInProgress');
	});

	await step('Picking a date completes the range with it as end date', async () => {
		await pickDayInOpenCalendar(20);
		await expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
		await expect(startInput).toHaveValue('10/06/2025');
		await expect(endInput).toHaveValue('20/06/2025');
	});
});

export const StartDateOnlyKeyboardTEST = createTestStory(withSelection('Start date only keyboard', { start: new Date(2025, 5, 10), end: null }), async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const startInput = canvas.getByLabelText('Start');
	const endInput = canvas.getByLabelText('End');

	await step('Keyboard: picking a date from the start field completes the range', async () => {
		startInput.focus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		// The calendar focuses the selected start date, move to the 20th and pick it
		await repeatKeyboardUserEvent('{ArrowRight}', 10);
		await waitForAngular();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
		await expect(startInput).toHaveValue('10/06/2025');
		await expect(endInput).toHaveValue('20/06/2025');
	});
});

export const EndDateOnlyTEST = createTestStory(withSelection('End date only', { start: null, end: new Date(2025, 5, 20) }), async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const startInput = canvas.getByLabelText('Start');
	const endInput = canvas.getByLabelText('End');

	await step('Opening the calendar moves the focus to the empty start field', async () => {
		await userEvent.click(endInput);
		await waitForAngular();
		await expect(screen.getByRole('dialog')).toBeVisible();
		await expect(startInput).toHaveFocus();
	});

	await step('The end date and every previous date are highlighted', async () => {
		await expect(getDayCell(20)).toHaveAttribute('aria-selected', 'true');
		await expect(getDayCell(20)).toHaveClass('is-end');
		await expect(getDayCell(10)).toHaveClass('is-selectionInProgress');
		await expect(getDayCell(10)).toHaveAttribute('aria-selected', 'false');
		await expect(getDayCell(25)).not.toHaveClass('is-selectionInProgress');
	});

	await step('Picking a start date before the end date completes the range', async () => {
		await pickDayInOpenCalendar(10);
		await expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
		await expect(startInput).toHaveValue('10/06/2025');
		await expect(endInput).toHaveValue('20/06/2025');
	});
});

export const EndDateOnlyInvertedTEST = createTestStory(withSelection('End date only inverted', { start: null, end: new Date(2025, 5, 20) }), async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const startInput = canvas.getByLabelText('Start');
	const endInput = canvas.getByLabelText('End');

	await step('Picking a start date after the end date inverts the bounds', async () => {
		await userEvent.click(endInput);
		await waitForAngular();
		await pickDayInOpenCalendar(25);
		await expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
		await expect(startInput).toHaveValue('20/06/2025');
		await expect(endInput).toHaveValue('25/06/2025');
	});
});

export const EmptyRangeFromEndTEST = createTestStory(withSelection('Empty range from end', undefined), async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const startInput = canvas.getByLabelText('Start');
	const endInput = canvas.getByLabelText('End');

	await step('Picking a date from the end field fills the end date', async () => {
		await userEvent.click(endInput);
		await waitForAngular();
		await pickDayInOpenCalendar(20);
		await expect(screen.getByRole('dialog')).toBeVisible();
		await expect(startInput).toHaveValue('');
		await expect(endInput).toHaveValue('20/06/2025');
	});

	await step('Picking a second date fills the start date', async () => {
		await pickDayInOpenCalendar(10);
		await expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
		await expect(startInput).toHaveValue('10/06/2025');
		await expect(endInput).toHaveValue('20/06/2025');
	});
});
