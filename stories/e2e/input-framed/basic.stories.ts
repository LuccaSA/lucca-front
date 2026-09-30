import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';
import meta, { Basic } from '@/stories/forms/input-framed/angular/basic.stories';

export default {
	...meta,
	title: 'E2E/InputFramed',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		await expect(canvas.getByRole('radiogroup')).toBeVisible();
		await expect(canvas.getByText('Option A')).toBeVisible();
		await expect(canvas.getByText('Option B')).toBeVisible();
	});

	await step('Interaction souris', async () => {
		await userEvent.click(canvas.getByText('Option A'));
		await waitForAngular();
		const radios = canvas.getAllByRole('radio');
		await expect(radios[0]).toBeChecked();
	});

	await step('Interaction clavier', async () => {
		const radios = canvas.getAllByRole('radio');
		radios[0].focus();
		await expect(radios[0]).toHaveFocus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await expect(radios[1]).toBeChecked();
	});
});
