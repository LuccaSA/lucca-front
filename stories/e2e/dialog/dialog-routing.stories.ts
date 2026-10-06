import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import meta, { Basic } from '@/stories/overlays/dialog/dialog-routing.stories';

export default {
	...meta,
	title: 'E2E/Dialog/Routing',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const trigger = canvas.getByRole('button', { name: 'Navigate to /dialog/12' });
	const openRoutedDialog = async () => {
		await userEvent.click(trigger);
		await waitForAngular();
		return screen.findByRole('dialog');
	};

	await step('Navigating to the dialog route opens it with the data from its factory', async () => {
		const dialog = await openRoutedDialog();
		await expect(within(dialog).getByRole('heading', { name: 'Dialog opened by route' })).toBeVisible();
		await expect(within(dialog).getByLabelText('Data received by dialog')).toHaveValue(42);
	});

	await step('Submitting closes the dialog and hands the form value to onClosed', async () => {
		const dialog = screen.getByRole('dialog');
		await userEvent.type(within(dialog).getByLabelText('Additionnal data to submit'), 'lucca');
		await userEvent.click(within(dialog).getByRole('button', { name: 'Submit' }));
		await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
		await expect(await canvas.findByText('dialog onClosed() called')).toBeVisible();
		await expect(canvas.getByText(/"dataString": "lucca"/)).toBeVisible();
	});

	await step('Dismissing routes to the onDismissed destination', async () => {
		await openRoutedDialog();
		await userEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Dismiss' }));
		await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
		await expect(await canvas.findByText('dialog onDismissed() called')).toBeVisible();
	});

	await step('Escape dismisses the routed dialog as well', async () => {
		trigger.focus();
		await expect(trigger).toHaveFocus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(await screen.findByRole('dialog')).toBeVisible();

		await userEvent.keyboard('{Escape}');
		await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
		await expect(await canvas.findByText('dialog onDismissed() called')).toBeVisible();
	});
});
