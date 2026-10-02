import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';
import meta, { Basic } from '@/stories/forms/fields/phone-number-input/angular/phone-number-input.stories';

export default {
	...meta,
	title: 'E2E/PhoneNumberInput',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const input = canvas.getByRole('textbox');
		await expect(input).toBeVisible();
	});

	await step('Interaction souris - saisir un numéro de téléphone', async () => {
		const input = canvas.getByRole('textbox');
		await userEvent.clear(input);
		await userEvent.type(input, '2125550199');
		await waitForAngular();
	});

	await step('Interaction clavier - focus et saisie', async () => {
		const input = canvas.getByRole('textbox');
		await userEvent.clear(input);
		input.focus();
		await userEvent.keyboard('9876543210');
		await waitForAngular();
	});
});
