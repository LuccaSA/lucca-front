import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';
import meta, { Basic } from '@/stories/forms/fieldset/angular/fieldset-basic.stories';

export default {
	...meta,
	title: 'E2E/Fieldset',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		await expect(canvas.getByText('Title')).toBeVisible();
		const inputs = canvas.getAllByRole('textbox');
		await expect(inputs.length).toBeGreaterThanOrEqual(2);
	});

	await step('Interaction clavier', async () => {
		const inputs = canvas.getAllByRole('textbox');
		inputs[0].focus();
		await expect(inputs[0]).toHaveFocus();
		await userEvent.type(inputs[0], 'test');
		await waitForAngular();
		await expect(inputs[0]).toHaveValue('test');
	});
});
