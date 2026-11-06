import { expect, screen, userEvent, within } from 'storybook/test';
import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import meta, { Basic } from '@/stories/forms/fields/simple-select/angular/simple-select.stories';

export default {
	...meta,
	title: 'E2E/SimpleSelect/Field',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		await expect(canvas.getByRole('combobox')).toBeVisible();
	});

	await step('Interaction souris - ouverture du listbox', async () => {
		const combobox = canvas.getByRole('combobox');
		await userEvent.click(combobox);
		await waitForAngular();
		await expect(screen.getByRole('listbox')).toBeVisible();
		const options = within(screen.getByRole('listbox')).getAllByRole('option');
		await expect(options.length).toBeGreaterThan(0);
		await userEvent.click(options[0]);
		await waitForAngular();
		await expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
	});

	await step('Interaction clavier', async () => {
		const combobox = canvas.getByRole('combobox');
		combobox.focus();
		await expect(combobox).toHaveFocus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await expect(screen.getByRole('listbox')).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(combobox).toHaveFocus();
	});
});
