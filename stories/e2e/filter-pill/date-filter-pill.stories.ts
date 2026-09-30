import { createTestStory } from '@/helpers/stories';
import { pickDay, waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import meta, { Basic } from '@/stories/forms/filter-pills/angular/date-filter-pill.stories';

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
