import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import meta, { Basic } from '@/stories/overlays/dialog/dialog-confirmation.stories';

export default {
	...meta,
	title: 'E2E/Dialog/Confirmation',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const trigger = canvas.getByRole('button', { name: 'Open Dialog with confirmation on dismiss' });

	await step('The first dialog opens on click', async () => {
		await userEvent.click(trigger);
		await waitForAngular();
		const dialog = await screen.findByRole('dialog');
		await expect(within(dialog).getByRole('heading', { name: 'Dialog' })).toBeVisible();
	});

	await step('Dismissing stacks a confirmation dialog on top of the first one', async () => {
		await userEvent.click(screen.getByRole('button', { name: 'Cancel with confirmation' }));
		await waitForAngular();
		await waitFor(() => expect(screen.getAllByRole('dialog')).toHaveLength(2));
		await expect(screen.getByRole('heading', { name: 'Confirmation' })).toBeVisible();
	});

	await step('Confirming closes the confirmation dialog and leaves the first one open', async () => {
		const confirmation = screen.getAllByRole('dialog')[1];
		await userEvent.click(within(confirmation).getByRole('button', { name: 'Confirm' }));
		await waitFor(() => expect(screen.getAllByRole('dialog')).toHaveLength(1));
		await expect(screen.getByRole('heading', { name: 'Dialog' })).toBeVisible();
	});

	await step('Escape closes the topmost dialog only, then the last one', async () => {
		await userEvent.click(screen.getByRole('button', { name: 'Cancel with confirmation' }));
		await waitFor(() => expect(screen.getAllByRole('dialog')).toHaveLength(2));

		await userEvent.keyboard('{Escape}');
		await waitFor(() => expect(screen.getAllByRole('dialog')).toHaveLength(1));

		await userEvent.keyboard('{Escape}');
		await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
	});
});
