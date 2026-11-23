import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import meta, { Basic } from '@/stories/structure/box-disclosure/angular/basic.stories';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

export default {
	...meta,
	title: 'E2E/BoxDisclosure',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory({ ...Basic, args: { ...Basic.args, openChange: fn() } }, async ({ canvasElement, step, args }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const getSummary = () => canvasElement.querySelector('summary') as HTMLElement;
	const getDetails = () => canvasElement.querySelector('details') as HTMLDetailsElement;

	await step('Renders closed, with only the heading visible', async () => {
		await expect(canvas.getByText('Title')).toBeVisible();
		await expect(getDetails()).not.toHaveAttribute('open');
		await expect(canvas.getByText('Custom content')).not.toBeVisible();
	});

	await step('Clicking the summary opens the box and emits openChange(true)', async () => {
		await userEvent.click(getSummary());
		await waitForAngular();
		await expect(getDetails()).toHaveAttribute('open');
		await expect(canvas.getByText('Custom content')).toBeVisible();
		await waitFor(() => expect(args['openChange']).toHaveBeenLastCalledWith(true));
	});

	await step('Clicking the summary again closes the box and emits openChange(false)', async () => {
		await userEvent.click(getSummary());
		await waitForAngular();
		await expect(getDetails()).not.toHaveAttribute('open');
		await waitFor(() => expect(args['openChange']).toHaveBeenLastCalledWith(false));
	});

	// Simulated `{Enter}` / `{Space}` don't trigger the native <details> toggle (same limitation as CalloutDisclosure):
	// only the keyboard focusability of the summary is checked, the toggle itself is native browser behavior.
	await step('The summary is focusable with the keyboard', async () => {
		getSummary().blur();
		getSummary().focus();
		await expect(getSummary()).toHaveFocus();
	});
});
