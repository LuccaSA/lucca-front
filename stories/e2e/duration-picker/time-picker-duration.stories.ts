import { createTestStory } from '@/helpers/stories';
import { expectNgModelDisplay, mapInputs, repeatKeyboardUserEvent, waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';
import meta, { Basic } from '@/stories/forms/time/angular/time-picker-duration.stories';

export default {
	...meta,
	title: 'E2E/DurationPicker',
	tags: ['!autodocs'],
};

const basePlay = async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const { hours, minutes } = mapInputs(canvas.getAllByRole('textbox'), { hours: 0, minutes: 1 });

	await step('Mouse interactions', async () => {
		await userEvent.click(hours);
		await waitForAngular();
		await expect(hours).toHaveFocus();
		await userEvent.type(hours, '2');
		await waitForAngular();
		await expectNgModelDisplay(canvasElement, 'PT2H0M');

		await userEvent.click(minutes);
		await waitForAngular();
		await expect(minutes).toHaveFocus();
		await userEvent.type(minutes, '30');
		await waitForAngular();
		await expectNgModelDisplay(canvasElement, 'PT2H30M');
	});

	await step('Keyboard interactions', async () => {
		minutes.focus();
		await userEvent.keyboard('{Backspace}');
		await waitForAngular();
		await expectNgModelDisplay(canvasElement, 'PT2H0M');

		// Decrementing the minutes below zero borrows from the hours
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await expectNgModelDisplay(canvasElement, 'PT1H59M');

		await userEvent.keyboard('{ArrowLeft}');
		await waitForAngular();
		await expect(hours).toHaveFocus();

		await repeatKeyboardUserEvent('{ArrowUp}', 3);
		await waitForAngular();
		await expectNgModelDisplay(canvasElement, 'PT4H59M');

		// "h" moves to the minutes like ArrowRight
		await userEvent.keyboard('h');
		await waitForAngular();
		await expect(minutes).toHaveFocus();

		await userEvent.keyboard('{ArrowUp}');
		await waitForAngular();
		await expectNgModelDisplay(canvasElement, 'PT5H0M');
	});
};

export const BasicTEST = createTestStory(Basic, basePlay);
