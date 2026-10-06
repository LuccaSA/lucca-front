import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';
import meta, { Basic } from '@/stories/forms/fields/number/angular/number-field.stories';

export default {
	...meta,
	title: 'E2E/NumberInput',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const input = canvas.getByRole('spinbutton');
		await expect(input).toBeVisible();
	});

	await step('Interaction souris - saisir un nombre', async () => {
		const input = canvas.getByRole('spinbutton');
		await userEvent.clear(input);
		await userEvent.type(input, '42');
		await waitForAngular();
		await expect(input).toHaveValue(42);
	});

	await step('Interaction clavier - focus et saisie', async () => {
		const input = canvas.getByRole('spinbutton');
		await userEvent.clear(input);
		input.focus();
		await userEvent.keyboard('123');
		await waitForAngular();
		await expect(input).toHaveValue(123);
	});
});
