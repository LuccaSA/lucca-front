import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';
import meta, { Basic } from '@/stories/navigation/table-of-content/angular/table-of-content.stories';

export default {
	...meta,
	title: 'E2E/TableOfContent',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const nav = canvas.getByRole('navigation');
		await expect(nav).toBeVisible();
	});

	await step('Vérifie les liens de la table des matières', async () => {
		const links = canvas.getAllByRole('link');
		await expect(links.length).toBe(4);
	});

	await step('Clic sur un lien', async () => {
		const links = canvas.getAllByRole('link');
		await userEvent.click(links[1]);
		await waitForAngular();
	});

	await step('Navigation clavier entre les liens', async () => {
		const links = canvas.getAllByRole('link');
		links[0].focus();
		await expect(links[0]).toHaveFocus();
		await userEvent.tab();
		await waitForAngular();
		await expect(links[1]).toHaveFocus();
	});
});
