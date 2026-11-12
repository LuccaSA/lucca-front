import { createTestStory } from '@/helpers/stories';
import { isStacked, resizeBelowExtraSmallBreakpoint, waitForAngular } from '@/helpers/test';
import meta, { WithSelect } from '@/stories/overlays/dialog/dialog-multiple.stories';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';

export default {
	...meta,
	title: 'E2E/SimpleSelect/DialogMultiple',
	tags: ['!autodocs'],
};

export const WithSelectTEST = createTestStory(WithSelect, async ({ canvasElement, step }) => {
	const restoreViewport = await resizeBelowExtraSmallBreakpoint();
	if (!restoreViewport) {
		return;
	}

	try {
		await waitForAngular();
		await userEvent.click(within(canvasElement).getByRole('button', { name: 'Open Dialog' }));
		await waitForAngular();
		const dialog1 = await screen.findByRole('dialog', { name: 'Dialog 1' });
		const trigger = within(dialog1).getByLabelText('Legume');

		await step('Mouse: the simple select sheet joins the stack of the dialog it covers', async () => {
			await userEvent.click(trigger);
			await waitForAngular();
			const sheet = await screen.findByRole('dialog', { name: 'Legume' });
			await expect(isStacked(sheet)).toBe(true);

			await userEvent.click(within(sheet).getAllByRole('option')[0]);
			await waitForAngular();
			await waitFor(() => expect(screen.getAllByRole('dialog')).toHaveLength(1));
		});

		await step('Keyboard: same with Enter to open and Escape to close', async () => {
			trigger.focus();
			await userEvent.keyboard('{Enter}');
			await waitForAngular();
			const sheet = await screen.findByRole('dialog', { name: 'Legume' });
			await expect(isStacked(sheet)).toBe(true);

			await userEvent.keyboard('{Escape}');
			await waitForAngular();
			await waitFor(() => expect(screen.getAllByRole('dialog')).toHaveLength(1));
		});
	} finally {
		// Story files share one page: close the sheet and dialog this story opened, top first.
		for (let opened = 2; opened > 0 && screen.queryAllByRole('dialog').length > 0; opened--) {
			await userEvent.keyboard('{Escape}');
			await waitForAngular();
		}
		await restoreViewport();
	}
});
