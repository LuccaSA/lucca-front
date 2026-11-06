import { createTestStory } from '@/helpers/stories';
import { sleep, waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, within } from 'storybook/test';
import meta, { Basic } from '@/stories/overlays/popover/popover.stories';

export default {
	...meta,
	title: 'E2E/Popover',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Ouvre le popover', async () => {
		await userEvent.click(canvas.getByRole('button'));
		await sleep(500);
		await expect(screen.getByText('🎉 popover content 🏖️')).toBeVisible();
	});

	await step('Ferme avec Escape', async () => {
		await userEvent.keyboard('{Escape}');
		await sleep(500);
		await expect(screen.queryByText('🎉 popover content 🏖️')).not.toBeInTheDocument();
	});
});
