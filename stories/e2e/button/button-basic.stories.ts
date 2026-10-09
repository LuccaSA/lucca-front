import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import meta, { Basic } from '@/stories/actions/button/angular/button-basic.stories';
import { expect, within } from 'storybook/test';

export default {
	...meta,
	title: 'E2E/Button/Basic',
	tags: ['!autodocs'],
};

// Derived from the documentation story for the test only: not exported
const Block = { ...Basic, args: { ...Basic.args, block: true } };

export const BasicTEST = createTestStory(Basic, async (context) => {
	const canvas = within(context.canvasElement);
	const button = await canvas.findByRole('button');
	await expect(button).toHaveClass('button is-default palette-none');
});

export const BlockTEST = createTestStory(Block, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Takes the full width of its container', async () => {
		const button = await canvas.findByRole('button');
		await expect(button).toHaveClass('mod-block');
		// The story host is inline: the canvas is the block that the button fills
		await expect(button.getBoundingClientRect().width).toBe(canvasElement.getBoundingClientRect().width);
	});
});
