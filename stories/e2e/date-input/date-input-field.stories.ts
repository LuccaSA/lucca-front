import { expect, screen, userEvent, within } from 'storybook/test';
import { createTestStory } from '@/helpers/stories';
import { expectNgModelDisplay, pickDay, waitForAngular } from '@/helpers/test';
import meta, { Basic } from '@/stories/forms/fields/date/date-input-field.stories';

export default {
	...meta,
	title: 'E2E/DateInput/Field',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, args, context }) => {
	const canvas = within(canvasElement);
	await waitForAngular();
	// Get input using label text to make sure the label link is properly done, we're adding ? for the tooltip
	////const input = canvas.getByLabelText(`${args['label']}${args['tooltip'] ? '?' : ''}`, { selector: 'input' });
	const input = canvas.getByTestId('lu-date-input');

	await userEvent.click(input);
	await waitForAngular();
	// We have to get table by role using the screen as matcher, as overlay isn't in the canvas itself
	const table = screen.getByRole('grid');
	// Not ideal but we need to do this until we have a better way to get the calendar component
	const calendarComponent = table.parentElement?.parentElement;
	const today = new Date();
	const calendar = within(calendarComponent);
	// We can at least check for this year, checking for the month would be harder due to locale considerations
	await expect(calendar.getByText(today.getFullYear())).toBeInTheDocument();
	await expect(calendar.getAllByText(today.getDate()).find((el) => !el.parentElement?.className.includes('is-overflow'))?.parentElement).toHaveAttribute('aria-selected', 'true');
	// We pick 15 because it should show only once
	// Fallback if we're the 15th, pick 16
	const targetDay = today.getDate() === 15 ? 16 : 15;
	await userEvent.click(calendar.getByText(targetDay.toString()));
	await waitForAngular();
	await expectNgModelDisplay(canvasElement, new Date(today.getFullYear(), today.getMonth(), targetDay).toString());

	await context.step('Invalid date', async () => {
		await userEvent.clear(input);
		await userEvent.type(input, 'not a date');
		await userEvent.keyboard('{Escape}');
		await expectNgModelDisplay(canvasElement, 'Invalid Date');
		await expect(input).toHaveAttribute('aria-invalid', 'true');
	});
	await waitForAngular();

	await context.step('Select today after another date', async () => {
		await userEvent.clear(input);
		// We pick 15 because it should show only once
		// Fallback if we're the 15th, pick 16
		const targetDay = today.getDate() === 15 ? 16 : 15;
		const yesterday = targetDay - 1;
		await pickDay(input, yesterday);
		await expectNgModelDisplay(canvasElement, new Date(today.getFullYear(), today.getMonth(), yesterday).toString());

		await pickDay(input, targetDay);
		await expectNgModelDisplay(canvasElement, new Date(today.getFullYear(), today.getMonth(), targetDay).toString());
	});
	await waitForAngular();
});
