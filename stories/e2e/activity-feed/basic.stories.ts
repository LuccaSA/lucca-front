import { createTestStory } from '@/helpers/stories';
import { expect, within } from 'storybook/test';
import { waitForAngular } from '@/helpers/test';
import meta, { Basic } from '@/stories/listings/activity-feed/angular/basic.stories';

export default {
	...meta,
	title: 'E2E/ActivityFeed',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step("Vérifie le rendu initial du fil d'activité", async () => {
		const list = canvas.getByRole('list');
		await expect(list).toBeVisible();
	});

	await step('Vérifie que les étapes sont visibles', async () => {
		const items = canvas.getAllByRole('listitem');
		await expect(items.length).toBeGreaterThan(0);
		for (const item of items) {
			await expect(item).toBeVisible();
		}
	});
});
