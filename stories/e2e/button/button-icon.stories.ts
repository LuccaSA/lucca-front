import { createTestStory } from '@/helpers/stories';
import { expect, within } from 'storybook/test';
import { BasicTEST as ButtonBasic } from './button-basic.stories';
import meta, { Basic } from '@/stories/actions/button/angular/button-icon.stories';

export default {
	...meta,
	title: 'E2E/Button/Icon',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async (context) => {
	const canvas = within(context.canvasElement);
	await ButtonBasic.play(context);
	const button = await canvas.findByRole('button');
	if (context.args.label) {
		await expect(button).toHaveClass('mod-withIcon');
	} else {
		await expect(button).toHaveClass('mod-onlyIcon');
	}
});
