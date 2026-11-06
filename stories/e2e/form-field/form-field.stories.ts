import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';
import meta, { Template } from '@/stories/forms/fields/form-field.stories';

export default {
	...meta,
	title: 'E2E/FormField',
	tags: ['!autodocs'],
};

export const TemplateTEST = createTestStory(Template, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		await expect(canvas.getByText('Label')).toBeVisible();
		await expect(canvas.getByRole('textbox')).toBeVisible();
	});

	await step('Interaction clavier', async () => {
		const textarea = canvas.getByRole('textbox');
		textarea.focus();
		await expect(textarea).toHaveFocus();
		await userEvent.type(textarea, 'test input');
		await waitForAngular();
		await expect(textarea).toHaveValue('test input');
	});
});
