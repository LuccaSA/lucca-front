import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, within } from 'storybook/test';
import meta, { Dialog } from '@/stories/overlays/dropdown/angular/dropdown-dialog.stories';

export default {
	...meta,
	title: 'E2E/Dropdown/Dialog',
	tags: ['!autodocs'],
};

export const DialogTEST = createTestStory(Dialog, async ({ canvasElement, step }) => {
	await waitForAngular();
	const trigger = within(canvasElement).getByRole('button', { name: /dropdown/i });

	await step('Opens the dialog from the dropdown action', async () => {
		await userEvent.click(trigger);
		await waitForAngular();
		await userEvent.click(screen.getByRole('button', { name: /open dialog/i }));
		await waitForAngular();
		await expect(screen.getByRole('dialog')).toBeVisible();
		await expect(trigger).toHaveAttribute('aria-expanded', 'false');
	});

	await step('Closes the dialog with Escape', async () => {
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
	});
});
