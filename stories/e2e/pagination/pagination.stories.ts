import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';
import meta, { Basic } from '@/stories/navigation/pagination/angular/pagination.stories';

export default {
	...meta,
	title: 'E2E/Pagination',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const nav = canvas.getByRole('navigation');
		await expect(nav).toBeVisible();
	});

	await step('Vérifie les boutons de navigation', async () => {
		const buttons = canvas.getAllByRole('button');
		await expect(buttons.length).toBeGreaterThan(0);
	});

	await step('Clique sur le bouton page suivante', async () => {
		const buttons = canvas.getAllByRole('button');
		const nextButton = buttons[buttons.length - 1];
		await expect(nextButton).not.toBeDisabled();
		await userEvent.click(nextButton);
		await waitForAngular();
	});

	await step('Navigation clavier sur la pagination', async () => {
		const buttons = canvas.getAllByRole('button');
		const nextButton = buttons[buttons.length - 1];
		nextButton.focus();
		await expect(nextButton).toHaveFocus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
	});
});
