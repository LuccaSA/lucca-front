import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, within } from 'storybook/test';
import meta, { Basic } from '@/stories/overlays/dialog/dialog.stories';

export default {
	...meta,
	title: 'E2E/Dialog/Basic',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	const canvas = within(canvasElement);
	const button = await canvas.findByRole('button');

	await step('Keyboard interactions', async () => {
		button.focus();
		await expect(button).toHaveFocus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(screen.getByRole('dialog')).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await expect(screen.queryByText('dialog')).toBeNull();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(screen.getByRole('dialog')).toBeVisible();
		await userEvent.keyboard('{Enter}');
		await expect(screen.queryByText('dialog')).toBeNull();
	});

	await step('Mouse interaction', async () => {
		await userEvent.click(button);
		await waitForAngular();
		await expect(screen.getByRole('dialog')).toBeVisible();
		// close with dialog cross
		await userEvent.click(screen.getAllByRole('button')[0]);
		await expect(screen.queryByText('dialog')).toBeNull();
		await userEvent.click(button);
		await waitForAngular();
		await expect(screen.getByRole('dialog')).toBeVisible();
		// close with confirm button
		await userEvent.click(screen.getAllByRole('button')[1]);
		await expect(screen.queryByText('dialog')).toBeNull();
		await userEvent.click(button);
		await waitForAngular();
		await expect(screen.getByRole('dialog')).toBeVisible();
		// close with cancel button
		await userEvent.click(screen.getAllByRole('button')[2]);
		await expect(screen.queryByText('dialog')).toBeNull();
	});
});
