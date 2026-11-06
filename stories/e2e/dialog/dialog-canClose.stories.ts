import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import { createTestStory } from '@/helpers/stories';
import { sleep, waitForAngular } from '@/helpers/test';
import meta, { Basic } from '@/stories/overlays/dialog/dialog-canClose.stories';

export default {
	...meta,
	title: 'E2E/Dialog/CanClose',
	tags: ['!autodocs'],
};

const openDialog = async (trigger: HTMLElement) => {
	await userEvent.click(trigger);
	await waitForAngular();
	return screen.findByRole('dialog');
};

const expectClosed = () => waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());

/** Gives the close attempt time to go through before asserting the dialog is still there. */
const expectStillOpen = async () => {
	await sleep(100);
	await expect(screen.getByRole('dialog')).toBeVisible();
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const trigger = canvas.getByRole('button', { name: 'Open dialog' });

	await step('Escape closes the dialog when canClose allows it', async () => {
		const dialog = await openDialog(trigger);
		await expect(dialog).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await expectClosed();
	});

	await step('Cancel closes the dialog when canClose allows it', async () => {
		await openDialog(trigger);
		await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Cancel' }));
		await expectClosed();
	});

	await step('Confirm closes the dialog through the injected LuDialogRef', async () => {
		await openDialog(trigger);
		await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Confirm' }));
		await expectClosed();
	});
});

export const CannotCloseTEST = createTestStory({ ...Basic, args: { ...Basic.args, canClose: false } }, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const trigger = canvas.getByRole('button', { name: 'Open dialog' });
	await openDialog(trigger);

	await step('Escape does not close a dialog denied by canClose', async () => {
		await userEvent.keyboard('{Escape}');
		await expectStillOpen();
	});

	await step('Cancel does not close a dialog denied by canClose', async () => {
		await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Cancel' }));
		await expectStillOpen();
	});

	await step('Confirm still closes it, as LuDialogRef.close bypasses canClose', async () => {
		await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Confirm' }));
		await expectClosed();
	});
});

export const CannotCloseWithBackdropTEST = createTestStory({ ...Basic, args: { ...Basic.args, canCloseWithBackdrop: false } }, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const trigger = canvas.getByRole('button', { name: 'Open dialog' });
	await openDialog(trigger);

	await step('Escape is ignored, as it goes through the same stream as the backdrop click', async () => {
		await userEvent.keyboard('{Escape}');
		await expectStillOpen();
	});

	await step('Cancel still closes the dialog', async () => {
		await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Cancel' }));
		await expectClosed();
	});
});
