import { createTestStory } from '@/helpers/stories';
import { expect, within } from 'storybook/test';
import { BasicTEST as ButtonBasic } from './button-basic.stories';
import meta, { Basic } from '@/stories/actions/button/angular/button-counter.stories';

export default {
	...meta,
	title: 'E2E/Button/Counter',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async (context) => {
	const canvas = within(context.canvasElement);
	await ButtonBasic.play(context);
	const button = await canvas.findByRole('button');
	const counter = await within(button).findByText('999+');
	await expect(counter).toBeInTheDocument();
});
