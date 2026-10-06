import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, within } from 'storybook/test';
import meta, { Basic } from '@/stories/navigation/skip-links/skip-links-basic.stories';

export default {
	...meta,
	title: 'E2E/SkipLinks',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial du composant', async () => {
		const skipLink = canvas.getByRole('link', { name: /contenu/i });
		await expect(skipLink).toBeInTheDocument();
	});
});
