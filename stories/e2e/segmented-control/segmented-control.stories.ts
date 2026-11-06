import { createTestStory } from '@/helpers/stories';
import { expectNgModelDisplay, waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';
import meta, { Basic } from '@/stories/navigation/segmented-control/angular/segmented-control.stories';

export default {
	...meta,
	title: 'E2E/SegmentedControl/Basic',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const options = canvas.getAllByRole('radio');
		await expect(options.length).toBe(4);
	});

	await step('Sélectionne une option par clic', async () => {
		const options = canvas.getAllByRole('radio');
		await userEvent.click(options[1]);
		await waitForAngular();
		await expect(options[1]).toBeChecked();
		await expectNgModelDisplay(canvasElement, '1');
	});

	await step('Navigation clavier entre les options', async () => {
		const options = canvas.getAllByRole('radio');
		options[0].focus();
		await expect(options[0]).toHaveFocus();
		await userEvent.keyboard('{ArrowRight}');
		await waitForAngular();
		await expect(options[1]).toHaveFocus();
	});
});
