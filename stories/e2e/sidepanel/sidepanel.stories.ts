import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, within } from 'storybook/test';
import meta, { Basic } from '@/stories/overlays/sidepanel/sidepanel.stories';

export default {
	...meta,
	title: 'E2E/Sidepanel',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Ouvre le sidepanel', async () => {
		await userEvent.click(canvas.getByRole('button', { name: 'Open' }));
		await waitForAngular();
		await expect(screen.getByRole('dialog')).toBeVisible();
	});

	await step('Ferme avec Escape', async () => {
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});
});
