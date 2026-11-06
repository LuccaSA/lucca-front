import { createTestStory } from '@/helpers/stories';
import { expectNgModelDisplay, mapInputs, repeatKeyboardUserEvent, waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';
import meta, { Basic } from '@/stories/forms/time/angular/time-picker-basic.stories';

export default {
	...meta,
	title: 'E2E/TimePicker',
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

		// Typing a complete hour moves the focus to the minutes
		await userEvent.type(hours, '14');
		await waitForAngular();
		await expect(minutes).toHaveFocus();
		await expectNgModelDisplay(canvasElement, '14:00:00');

		await userEvent.type(minutes, '30');
		await waitForAngular();
		await expectNgModelDisplay(canvasElement, '14:30:00');
	});

	await step('Keyboard interactions', async () => {
		minutes.focus();
		await userEvent.keyboard('{Backspace}');
		await waitForAngular();
		await expectNgModelDisplay(canvasElement, '14:00:00');

		await userEvent.keyboard('{ArrowLeft}');
		await waitForAngular();
		await expect(hours).toHaveFocus();

		await userEvent.keyboard('{ArrowUp}');
		await waitForAngular();
		await expectNgModelDisplay(canvasElement, '15:00:00');

		await repeatKeyboardUserEvent('{ArrowDown}', 2);
		await waitForAngular();
		await expectNgModelDisplay(canvasElement, '13:00:00');

		// ":" moves to the minutes like ArrowRight
		await userEvent.keyboard(':');
		await waitForAngular();
		await expect(minutes).toHaveFocus();

		await repeatKeyboardUserEvent('{ArrowUp}', 5);
		await waitForAngular();
		await expectNgModelDisplay(canvasElement, '13:05:00');
	});
};

export const BasicTEST = createTestStory(Basic, basePlay);
