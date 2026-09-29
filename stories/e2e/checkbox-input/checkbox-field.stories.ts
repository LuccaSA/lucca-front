import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';
import meta, { Basic } from '@/stories/forms/fields/checkbox/angular/checkbox-field.stories';

export default {
	...meta,
	title: 'E2E/CheckboxInput',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const checkbox = canvas.getByRole('checkbox');
		await expect(checkbox).toBeVisible();
		await expect(checkbox).not.toBeChecked();
	});

	await step('Interaction souris - cocher', async () => {
		const checkbox = canvas.getByRole('checkbox');
		await userEvent.click(checkbox);
		await waitForAngular();
		await expect(checkbox).toBeChecked();
	});

	await step('Interaction souris - décocher', async () => {
		const checkbox = canvas.getByRole('checkbox');
		await userEvent.click(checkbox);
		await waitForAngular();
		await expect(checkbox).not.toBeChecked();
	});

	// We have issues with keyboard interactions testing in general
	// await step('Interaction clavier - espace pour cocher', async () => {
	// 	const checkbox = canvas.getByRole('checkbox');
	// 	checkbox.focus();
	// 	await userEvent.keyboard('{Space}');
	// 	await waitForAngular();
	// 	await expect(checkbox).toBeChecked();
	// });
});
