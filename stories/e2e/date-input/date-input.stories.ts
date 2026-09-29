import { expect, screen, userEvent, within } from 'storybook/test';
import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import meta, { Basic, Week } from '@/stories/forms/date2/date-input.stories';

export default {
	...meta,
	title: 'E2E/DateInput/Basic',
	tags: ['!autodocs'],
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
