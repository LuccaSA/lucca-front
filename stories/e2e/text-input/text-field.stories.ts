import { createTestStory } from '@/helpers/stories';
import { updateStoryArgs, waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';
import meta, { Basic, PasswordVisiblity } from '@/stories/forms/fields/text/angular/text-field.stories';

export default {
	...meta,
	title: 'E2E/TextInput',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step, id }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const input = canvas.getByRole('textbox');
		await expect(input).toBeVisible();
		await expect(input).toHaveValue('Example value');
	});

	await step('Interaction souris - saisir du texte', async () => {
		const input = canvas.getByRole('textbox');
		await userEvent.clear(input);
		await userEvent.type(input, 'Nouveau texte');
		await waitForAngular();
		await expect(input).toHaveValue('Nouveau texte');
	});

	await step('Interaction clavier - focus et saisie', async () => {
		const input = canvas.getByRole('textbox');
		await userEvent.clear(input);
		input.focus();
		await userEvent.keyboard('Texte clavier');
		await waitForAngular();
		await expect(input).toHaveValue('Texte clavier');
	});

	await step('La valeur saisie survit à un changement de config', async () => {
		const input = canvas.getByRole('textbox');
		await userEvent.clear(input);
		await userEvent.type(input, 'Valeur à conserver');
		await waitForAngular();

		await updateStoryArgs(id, { size: 'S' });
		await waitForAngular();

		await expect(canvas.getByRole('textbox')).toHaveValue('Valeur à conserver');
	});
});

export const BasicCaretPositionTEST = createTestStory(Basic, async ({ canvasElement }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const input = canvas.getByRole('textbox') as HTMLInputElement;

	// Typing at the start of the value must keep the caret right after the typed characters, so the user can keep writing there.
	await userEvent.type(input, 'AB', { initialSelectionStart: 0, initialSelectionEnd: 0 });
	await waitForAngular();

	await expect(input).toHaveValue('ABExample value');
	await expect(input.selectionStart).toBe(2);
});

export const BasicPasswordVisibilityTEST = createTestStory(PasswordVisiblity, async (context) => {
	const canvas = within(context.canvasElement);
	await waitForAngular();

	const input = context.canvasElement.querySelector('input.textField-input-value');
	const toggleButton = await canvas.findByRole('button', { name: /Afficher le mot de passe/i });

	await expect(input).toHaveAttribute('type', 'password');
	await expect(toggleButton).toHaveAttribute('aria-pressed', 'false');

	await userEvent.click(input);
	await userEvent.type(input, 'MonSuperMotDePasse123!');
	await waitForAngular();

	await userEvent.click(toggleButton);
	await waitForAngular();
	await expect(input).toHaveAttribute('type', 'text');
	await expect(toggleButton).toHaveAttribute('aria-pressed', 'true');

	await userEvent.click(toggleButton);
	await waitForAngular();
	await expect(input).toHaveAttribute('type', 'password');
	await expect(toggleButton).toHaveAttribute('aria-pressed', 'false');

	await expect(canvas.getByTestId('pr-ng-model')).toHaveTextContent('MonSuperMotDePasse123!');
});
