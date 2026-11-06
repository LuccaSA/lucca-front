import { expect, screen, userEvent, within } from 'storybook/test';
import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import meta, { Basic } from '@/stories/forms/fields/multi-select/angular/multi-select.stories';

export default {
	...meta,
	title: 'E2E/MultiSelect/Field',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const combobox = canvas.getByRole('combobox');
		await expect(combobox).toBeVisible();
		await expect(combobox).toHaveAttribute('aria-expanded', 'false');
	});

	await step('Interaction souris - ouvrir la liste', async () => {
		const combobox = canvas.getByRole('combobox');
		await userEvent.click(combobox);
		await waitForAngular();
		await expect(combobox).toHaveAttribute('aria-expanded', 'true');
		const listbox = screen.getByRole('listbox');
		await expect(listbox).toBeVisible();
	});

	await step('Interaction souris - sélectionner une option', async () => {
		const options = screen.getAllByRole('option');
		await userEvent.click(options[0]);
		await waitForAngular();
	});

	await step('Interaction clavier - fermer avec Escape', async () => {
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		const combobox = canvas.getByRole('combobox');
		await expect(combobox).toHaveAttribute('aria-expanded', 'false');
	});

	await step('Interaction clavier - ouvrir et naviguer', async () => {
		const combobox = canvas.getByRole('combobox');
		combobox.focus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await expect(screen.getByRole('listbox')).toBeVisible();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
	});
});
