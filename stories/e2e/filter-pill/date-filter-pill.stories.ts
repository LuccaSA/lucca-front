import { createTestStory } from '@/helpers/stories';
import { pickDay, waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import meta, { Basic } from '@/stories/forms/filter-pills/angular/date-filter-pill.stories';
import { DateRange } from '@lucca-front/ng/date2';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { StoryObj } from '@storybook/angular-vite';

export default {
	...meta,
	title: 'E2E/FilterPill/Date',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const getModelDisplay = (index: number) => canvas.getAllByTestId('pr-ng-model')[index];
	const getClearer = (pill: HTMLElement) => within(pill.closest('.filterPillWrapper') as HTMLElement).getByRole('button', { name: /Vider ce champ/ });
	const queryClearer = (pill: HTMLElement) => within(pill.closest('.filterPillWrapper') as HTMLElement).queryByRole('button', { name: /Vider ce champ/ });

	await step('Picking a date fills the pill and the model', async () => {
		const pill = canvas.getByRole('button', { name: /Date de début/ });
		await expect(pill).toHaveTextContent('Aucune valeur sélectionnée');
		await expect(queryClearer(pill)).not.toBeInTheDocument();

		await userEvent.click(pill);
		await waitForAngular();
		await pickDay(screen.getByTestId('lu-date-input'), 15);
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => expect(pill).toHaveAttribute('aria-expanded', 'false'));

		await expect(pill).not.toHaveTextContent('Aucune valeur sélectionnée');
		await expect(pill).toHaveTextContent(/15/);
		// The model holds a Date whose serialization depends on the time zone: only check it is set
		await expect(getModelDisplay(0).textContent?.trim()).not.toBe('');
	});

	await step('Clearing the date empties the pill and the model', async () => {
		const pill = canvas.getByRole('button', { name: /Date de début/ });
		await userEvent.click(getClearer(pill));
		await waitForAngular();
		await expect(pill).toHaveTextContent('Aucune valeur sélectionnée');
		await expect(getModelDisplay(0).textContent?.trim()).toBe('');
		await expect(queryClearer(pill)).not.toBeInTheDocument();
		await expect(pill).toHaveFocus();
	});

	await step('Picking a period fills the pill and the model', async () => {
		const pill = canvas.getByRole('button', { name: /Période/ });
		await userEvent.click(pill);
		await waitForAngular();
		await pickDay(screen.getByLabelText('Start'), 10, true);
		await pickDay(screen.getByLabelText('End'), 20, true);
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => expect(pill).toHaveAttribute('aria-expanded', 'false'));

		await expect(pill).toHaveTextContent(/10/);
		await expect(pill).toHaveTextContent(/20/);
		// Dates are serialized in UTC, so the days depend on the time zone: only check both bounds are set
		await expect(getModelDisplay(1)).toHaveTextContent(/"start": "[^"]+"/);
		await expect(getModelDisplay(1)).toHaveTextContent(/"end": "[^"]+"/);
	});

	await step('Clearing the period empties the pill and the model', async () => {
		const pill = canvas.getByRole('button', { name: /Période/ });
		await userEvent.click(getClearer(pill));
		await waitForAngular();
		await expect(pill).toHaveTextContent('Aucune valeur sélectionnée');
		await expect(getModelDisplay(1)).toHaveTextContent('null');
	});
});

// Single date selection tests use a fixed month (June 2025), so they don't depend on the current date
function periodWithSelection(examplePeriod: DateRange): StoryObj<FilterPillComponent> {
	return {
		render: () => ({
			props: { examplePeriod },
			template: `<lu-filter-pill label="Période" name="periode"><lu-date-range-input [(ngModel)]="examplePeriod" clearable /></lu-filter-pill>`,
		}),
	};
}

function getDayButton(day: number): HTMLElement {
	// The first grid displays June 2025, the second one (if any) displays July 2025
	return within(screen.getAllByRole('grid')[0]).getByRole('button', { name: day.toString() });
}

function getPillValue(canvasElement: HTMLElement): string {
	return canvasElement.querySelector('.filterPill-value')?.textContent?.replace(/\s+/g, ' ').trim() ?? '';
}

export const PeriodStartDateOnlyTEST = createTestStory(periodWithSelection({ start: new Date(2025, 5, 10), end: null, scope: 'day' }), async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const pill = canvas.getByRole('button', { name: /Période/ });

	await step('Opening the pill focuses the empty end field', async () => {
		await userEvent.click(pill);
		await waitForAngular();
		await expect(screen.getByLabelText('End')).toHaveFocus();
	});

	await step('The start date and every following date are highlighted', async () => {
		await expect(getDayButton(10).closest('td')).toHaveAttribute('aria-selected', 'true');
		await expect(getDayButton(20).closest('td')).toHaveClass('is-selectionInProgress');
		await expect(getDayButton(5).closest('td')).not.toHaveClass('is-selectionInProgress');
	});

	await step('Picking a date completes the range with it as end date', async () => {
		await userEvent.click(getDayButton(20));
		await waitForAngular();
		await expect(screen.queryAllByRole('grid')).toHaveLength(0);
		await expect(getPillValue(canvasElement)).toContain('10/06/2025');
		await expect(getPillValue(canvasElement)).toContain('20/06/2025');
	});
});

export const PeriodEndDateOnlyTEST = createTestStory(periodWithSelection({ start: null, end: new Date(2025, 5, 20), scope: 'day' }), async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const pill = canvas.getByRole('button', { name: /Période/ });

	await step('Keyboard: ArrowDown opens the pill and focuses the empty start field', async () => {
		pill.focus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await expect(screen.getAllByRole('grid')[0]).toBeVisible();
		await expect(screen.getByLabelText('Start')).toHaveFocus();
		await expect(getDayButton(20).closest('td')).toHaveAttribute('aria-selected', 'true');
	});

	await step('Picking a date after the end date inverts the bounds', async () => {
		await userEvent.click(getDayButton(25));
		await waitForAngular();
		await expect(screen.queryAllByRole('grid')).toHaveLength(0);
		await expect(getPillValue(canvasElement)).toMatch(/20\/06\/2025.*25\/06\/2025/);
	});
});
