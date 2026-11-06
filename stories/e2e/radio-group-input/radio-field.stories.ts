import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';
import meta, { Basic } from '@/stories/forms/fields/radio/angular/radio-field.stories';

export default {
	...meta,
	title: 'E2E/RadioGroupInput',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const radios = canvas.getAllByRole('radio');
		await expect(radios.length).toBeGreaterThanOrEqual(2);
		await expect(radios[0]).toBeChecked();
	});

	await step('Interaction souris - sélectionner option B', async () => {
		const radios = canvas.getAllByRole('radio');
		await userEvent.click(radios[1]);
		await waitForAngular();
		await expect(radios[1]).toBeChecked();
		await expect(radios[0]).not.toBeChecked();
	});

	await step('Interaction clavier - naviguer avec les flèches', async () => {
		const radios = canvas.getAllByRole('radio');
		radios[1].focus();
		await userEvent.keyboard('{ArrowUp}');
		await waitForAngular();
		await expect(radios[0]).toBeChecked();
	});
});
