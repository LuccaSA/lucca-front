import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';
import meta, { Basic } from '@/stories/forms/fields/textarea/angular/textarea-field.stories';

export default {
	...meta,
	title: 'E2E/TextareaInput',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const textarea = canvas.getByRole('textbox');
		await expect(textarea).toBeVisible();
	});

	await step('Interaction souris - saisir du texte', async () => {
		const textarea = canvas.getByRole('textbox');
		await userEvent.click(textarea);
		await userEvent.type(textarea, 'Texte de test');
		await waitForAngular();
		await expect(textarea).toHaveValue('Texte de test');
	});

	await step('Interaction clavier - focus et saisie supplémentaire', async () => {
		const textarea = canvas.getByRole('textbox');
		textarea.focus();
		await userEvent.keyboard('{Control>}a{/Control}');
		await userEvent.keyboard('Saisie clavier');
		await waitForAngular();
		await expect(textarea).toHaveValue('Saisie clavier');
	});
});
