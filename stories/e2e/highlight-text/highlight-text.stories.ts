import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, within } from 'storybook/test';
import meta, { Basic } from '@/stories/texts/highlight-text/angular/highlight-text.stories';

export default {
	...meta,
	title: 'E2E/HighlightText',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie que le texte mis en évidence est affiché', async () => {
		const highlighted = canvas.getByText('ipsum');
		await expect(highlighted).toBeVisible();
	});

	await step('Vérifie que le texte entourant le highlight est présent', async () => {
		const heading = canvas.getByRole('heading', { level: 1 });
		await expect(heading).toBeVisible();
		await expect(heading).toHaveTextContent('Lorem ipsum dolor');
	});
});
