import { expect, screen, userEvent, within } from 'storybook/test';
import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import meta, { Basic } from '@/stories/forms/fields/color-input/angular/color-input-field.stories';

export default {
	...meta,
	title: 'E2E/ColorInput/Field',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const trigger = canvas.getByRole('combobox');
		await expect(trigger).toBeVisible();
		await expect(trigger).toHaveAttribute('aria-expanded', 'false');
	});

	await step('Interaction souris - ouvrir la palette', async () => {
		const trigger = canvas.getByRole('combobox');
		await userEvent.click(trigger);
		await waitForAngular();
		await expect(trigger).toHaveAttribute('aria-expanded', 'true');
		await expect(screen.getByRole('listbox')).toBeVisible();
	});

	await step('Interaction clavier - fermer avec Escape', async () => {
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		const trigger = canvas.getByRole('combobox');
		await expect(trigger).toHaveAttribute('aria-expanded', 'false');
	});

	await step('Interaction clavier - ouvrir avec ArrowDown', async () => {
		const trigger = canvas.getByRole('combobox');
		trigger.focus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await expect(trigger).toHaveAttribute('aria-expanded', 'true');
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
	});
});
