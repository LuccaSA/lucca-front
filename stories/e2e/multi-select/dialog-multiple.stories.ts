import { createTestStory } from '@/helpers/stories';
import { isStacked, resizeBelowExtraSmallBreakpoint, waitForAngular } from '@/helpers/test';
import meta, { WithSelect } from '@/stories/overlays/dialog/dialog-multiple.stories';
import { expect, screen, userEvent, within } from 'storybook/test';

export default {
	...meta,
	title: 'E2E/MultiSelect/DialogMultiple',
	tags: ['!autodocs'],
};

export const WithSelectTEST = createTestStory(WithSelect, async ({ canvasElement, step }) => {
	const restoreViewport = await resizeBelowExtraSmallBreakpoint();
	if (!restoreViewport) {
		return;
	}

	try {
		await step('Over two stacked dialogs, the multi select sheet joins the stack as a third layer', async () => {
			await waitForAngular();
			await userEvent.click(within(canvasElement).getByRole('button', { name: 'Open Dialog' }));
			await waitForAngular();
			const dialog1 = await screen.findByRole('dialog', { name: 'Dialog 1' });

			await userEvent.click(within(dialog1).getByRole('button', { name: 'Open Dialog' }));
			await waitForAngular();
			const dialog2 = await screen.findByRole('dialog', { name: 'Dialog 2' });

			await userEvent.click(within(dialog2).getByLabelText('Legumes'));
			await waitForAngular();
			const sheet = await screen.findByRole('dialog', { name: 'Legumes' });

			await expect([dialog1, dialog2, sheet].map(isStacked)).toEqual([true, true, true]);
		});
	} finally {
		// Story files share one page: close the sheet and dialogs this story opened, top first.
		for (let opened = 3; opened > 0 && screen.queryAllByRole('dialog').length > 0; opened--) {
			await userEvent.keyboard('{Escape}');
			await waitForAngular();
		}
		await restoreViewport();
	}
});
