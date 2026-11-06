import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, within } from 'storybook/test';
import meta, { Basic } from '@/stories/texts/text-flow/angular/basic.stories';

export default {
	...meta,
	title: 'E2E/TextFlow',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie que les titres sont affichés', async () => {
		const heading1 = canvas.getByRole('heading', { level: 1 });
		await expect(heading1).toBeVisible();
		await expect(heading1).toHaveTextContent('Heading 1');
	});

	await step('Vérifie que les paragraphes sont affichés', async () => {
		const paragraphs = canvas.getAllByText('Paragraph');
		await expect(paragraphs.length).toBeGreaterThan(0);
		await expect(paragraphs[0]).toBeVisible();
	});

	await step('Vérifie que les éléments de liste sont affichés', async () => {
		const listItems = canvas.getAllByText('List item');
		await expect(listItems.length).toBeGreaterThan(0);
		await expect(listItems[0]).toBeVisible();
	});
});
