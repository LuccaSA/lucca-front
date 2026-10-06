import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, within } from 'storybook/test';
import meta, { Template } from '@/stories/listings/listing/angular/inline.stories';

export default {
	...meta,
	title: 'E2E/Listing',
	tags: ['!autodocs'],
};

export const TemplateTEST = createTestStory(Template, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu de la liste inline', async () => {
		const list = canvas.getByRole('list');
		await expect(list).toBeVisible();
	});

	await step('Vérifie que les éléments de liste sont visibles', async () => {
		const items = canvas.getAllByRole('listitem');
		await expect(items.length).toBeGreaterThan(0);
		for (const item of items) {
			await expect(item).toBeVisible();
		}
	});
});
