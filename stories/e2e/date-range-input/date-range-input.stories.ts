import { expect, userEvent, within } from 'storybook/test';
import { createTestStory } from '@/helpers/stories';
import { expectNgModelDisplay, pickDay, waitForAngular } from '@/helpers/test';
import meta, { Basic } from '@/stories/forms/date2/date-range-input.stories';

export default {
	...meta,
	title: 'E2E/DateRangeInput',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	const canvas = within(canvasElement);
	await waitForAngular();
	const startInput = canvas.getByLabelText('Start');
	const endInput = canvas.getByLabelText('End');
	const today = new Date();

	await step('Select start and end date', async () => {
		const targetStartDay = today.getDate() === 15 ? 16 : 15;
		const expectedStart = new Date(today.getFullYear(), today.getMonth(), targetStartDay);
		const targetEndDay = today.getDate() === 20 ? 21 : 20;
		const expectedEnd = new Date(today.getFullYear(), today.getMonth(), targetEndDay);

		await step('Start', async () => {
			const targetDay = today.getDate() === 15 ? 16 : 15;
			await pickDay(startInput, targetDay, true);
			await waitForAngular();
			await expectNgModelDisplay(canvasElement, `{ "start": "${expectedStart.toISOString()}", "end": null, "scope": "day" }`);
		});

		await step('End', async () => {
			const targetDay = today.getDate() === 20 ? 21 : 20;
			await pickDay(endInput, targetDay, true);
			await waitForAngular();
			await expectNgModelDisplay(canvasElement, `{ "start": "${expectedStart.toISOString()}", "end": "${expectedEnd.toISOString()}", "scope": "day" }`);
		});
	});

	await step('Invalid date', async () => {
		await userEvent.clear(startInput);
		await userEvent.type(startInput, 'not a date');
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(startInput).toHaveAttribute('aria-invalid', 'true');
	});
});
