import { createTestStory } from '@/helpers/stories';
import meta, { Basic } from '@/stories/actions/button/angular/button-basic.stories';
import { expect, within } from 'storybook/test';

export default {
	...meta,
	title: 'E2E/Button/Basic',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async (context) => {
	const canvas = within(context.canvasElement);
	const button = await canvas.findByRole('button');
	await expect(button).toHaveClass('button is-default palette-none');
});
