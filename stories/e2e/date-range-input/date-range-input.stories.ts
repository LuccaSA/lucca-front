import { expect, screen, userEvent, within } from 'storybook/test';
import { createTestStory } from '@/helpers/stories';
import { expectNgModelDisplay, pickDay, repeatKeyboardUserEvent, waitForAngular } from '@/helpers/test';
import meta, { Basic } from '@/stories/forms/date2/date-range-input.stories';
import { DateRange, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { StoryObj } from '@storybook/angular-vite';

export default {
	...meta,
	title: 'E2E/DateRangeInput',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
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
		endInput.focus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await expect(screen.getByRole('dialog')).toBeVisible();
		// Escape pressed on a calendar cell doesn't reach the popover: the cell's tooltip trigger stops its
		// propagation even when no tooltip is displayed, so press it from the text field
		endInput.focus();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});

	await step('Clicking the empty end field opens the calendar', async () => {
		await userEvent.click(endInput);
		await waitForAngular();
		await expect(screen.getByRole('dialog')).toBeVisible();
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

export const StartDateOnlyEditStartTEST = createTestStory(withSelection('Start date only edit start', { start: new Date(2025, 5, 10), end: null }), async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const startInput = canvas.getByLabelText('Start');
	const endInput = canvas.getByLabelText('End');

	await step('Picking a date from the filled start field replaces the start date', async () => {
		await userEvent.click(startInput);
		await waitForAngular();
		await expect(startInput).toHaveFocus();
		await pickDayInOpenCalendar(5);
		await expect(screen.getByRole('dialog')).toBeVisible();
		await expect(startInput).toHaveValue('05/06/2025');
		await expect(endInput).toHaveValue('');
	});
});

export const StartDateOnlyKeyboardTEST = createTestStory(withSelection('Start date only keyboard', { start: new Date(2025, 5, 10), end: null }), async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const startInput = canvas.getByLabelText('Start');
	const endInput = canvas.getByLabelText('End');

	await step('Keyboard: picking a date from the end field completes the range', async () => {
		endInput.focus();
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

	await step('Clicking the empty start field opens the calendar', async () => {
		await userEvent.click(startInput);
		await waitForAngular();
		await expect(screen.getByRole('dialog')).toBeVisible();
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
		await userEvent.click(startInput);
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
