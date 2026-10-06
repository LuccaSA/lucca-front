import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, within } from 'storybook/test';
import meta, { Basic } from '@/stories/overlays/dialog/dialog-multiple.stories';

export default {
	...meta,
	title: 'E2E/Dialog/Multiple',
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
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(screen.getAllByRole('dialog').length).toEqual(2);
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(screen.getAllByRole('dialog').length).toEqual(1);
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(screen.queryByText('dialog')).toBeNull();
	});

	await step('Mouse interaction', async () => {
		await userEvent.click(button);
		await waitForAngular();
		await expect(screen.getByRole('dialog')).toBeVisible();
		// open other dialog
		await userEvent.click(screen.getAllByRole('button')[1]);
		await waitForAngular();
		// close with confirm button
		await expect(screen.getAllByRole('dialog').length).toEqual(2);
		await userEvent.click(screen.getAllByRole('button')[4]);
		await waitForAngular();
		await expect(screen.getAllByRole('dialog').length).toEqual(1);
		// close with dialog cross
		await userEvent.click(screen.getAllByRole('button')[2]);
		await waitForAngular();
		await expect(screen.queryByText('dialog')).toBeNull();
	});
});
