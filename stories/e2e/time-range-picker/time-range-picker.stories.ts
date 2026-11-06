import { createTestStory } from '@/helpers/stories';
import { clearInputs, expectNgModelDisplay, mapInputs, repeatKeyboardUserEvent, waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';
import meta, { Basic } from '@/stories/forms/time/angular/time-range-picker.stories';

export default {
	...meta,
	title: 'E2E/TimeRangePicker',
	tags: ['!autodocs'],
};

const basePlay = async ({ canvasElement, step, context }) => {
	const canvas = within(canvasElement);
	const inputs = canvas.getAllByRole('textbox');

	// Map inputs to named references
	const { startHours, startMinutes, endHours, endMinutes } = mapInputs(inputs, {
		startHours: 0,
		startMinutes: 1,
		endHours: 2,
		endMinutes: 3,
	});

	await step('Mouse interactions', async () => {
		// Insert start value
		await userEvent.click(startHours);
		await waitForAngular();
		await expect(startHours).toHaveFocus();
		await userEvent.type(startHours, '9');
		await waitForAngular();
		await expectNgModelDisplay(context.canvasElement, '{ "start": "09:00:00" }');

		// Insert end value
		await userEvent.click(endHours);
		await waitForAngular();
		await expect(endHours).toHaveFocus();
		await userEvent.type(endHours, '10');
		await waitForAngular();
		await expectNgModelDisplay(context.canvasElement, '{ "start": "09:00:00", "end": "10:00:00" }');
	});

	await step('Keyboard interactions', async () => {
		await clearInputs(inputs);
		await waitForAngular();

		// Insert start value with keyboard
		startHours.focus();
		await userEvent.keyboard('{ArrowUp}');
		await expect(startHours).toHaveFocus();
		await waitForAngular();
		await expectNgModelDisplay(context.canvasElement, '{ "start": "01:00:00", "end": "00:00:00" }');

		await userEvent.keyboard('{ArrowRight}');
		await repeatKeyboardUserEvent('{ArrowUp}', 2);
		await waitForAngular();
		await expectNgModelDisplay(context.canvasElement, '{ "start": "01:02:00", "end": "00:00:00" }');
		await expect(startMinutes).toHaveFocus();

		// Insert end value with keyboard
		await userEvent.keyboard('{ArrowRight}');
		await repeatKeyboardUserEvent('{ArrowUp}', 5);
		await waitForAngular();
		await expectNgModelDisplay(context.canvasElement, '{ "start": "01:02:00", "end": "05:00:00" }');
		await expect(endHours).toHaveFocus();

		await userEvent.keyboard('{ArrowRight}');
		await repeatKeyboardUserEvent('{ArrowUp}', 15);
		await waitForAngular();
		await expectNgModelDisplay(context.canvasElement, '{ "start": "01:02:00", "end": "05:15:00" }');
		await expect(endMinutes).toHaveFocus();

		// Go back to start hours
		await repeatKeyboardUserEvent('{ArrowLeft}', 4);
		await waitForAngular();
		await expect(startHours).toHaveFocus();
	});
};

export const BasicTEST = createTestStory(Basic, basePlay);
