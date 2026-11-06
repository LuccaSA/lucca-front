import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import meta, { Basic } from '@/stories/overlays/dialog/dialog-service.stories';

export default {
	...meta,
	title: 'E2E/Dialog/Service',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const trigger = canvas.getByRole('button', { name: 'Open dialog' });
	const expectClosed = () => waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
	const openDialog = async () => {
		await userEvent.click(trigger);
		await waitForAngular();
		return screen.findByRole('dialog');
	};

	await step('Opening through LuDialogService renders the dialog content component', async () => {
		const dialog = await openDialog();
		await expect(dialog).toBeVisible();
		await expect(within(dialog).getByText('Header')).toBeVisible();
		await expect(within(dialog).getAllByRole('combobox')).toHaveLength(4);
	});

	await step('Confirm closes the dialog through the injected LuDialogRef', async () => {
		await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Confirm' }));
		await expectClosed();
	});

	await step('Cancel closes the dialog through luDialogDismiss', async () => {
		await openDialog();
		await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Cancel' }));
		await expectClosed();
	});

	await step('The header close button closes the dialog', async () => {
		await openDialog();
		await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Fermer' }));
		await expectClosed();
	});

	await step('The dialog opens with Enter and closes with Escape', async () => {
		trigger.focus();
		await expect(trigger).toHaveFocus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(await screen.findByRole('dialog')).toBeVisible();

		await userEvent.keyboard('{Escape}');
		await expectClosed();
	});
});
