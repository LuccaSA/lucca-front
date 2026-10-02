import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';
import meta, { Basic } from '@/stories/forms/fields/switch/angular/switch-field.stories';

export default {
	...meta,
	title: 'E2E/SwitchInput',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const switchInput = canvas.getByRole('checkbox');
		await expect(switchInput).toBeVisible();
		await expect(switchInput).not.toBeChecked();
	});

	await step('Interaction souris - activer', async () => {
		const switchInput = canvas.getByRole('checkbox');
		await userEvent.click(switchInput);
		await waitForAngular();
		await expect(switchInput).toBeChecked();
	});

	await step('Interaction souris - désactiver', async () => {
		const switchInput = canvas.getByRole('checkbox');
		await userEvent.click(switchInput);
		await waitForAngular();
		await expect(switchInput).not.toBeChecked();
	});
});
