import { createTestStory } from '@/helpers/stories';
import { expect, screen, userEvent, within } from 'storybook/test';
import { waitForAngular } from '@/helpers/test';
import meta, { Basic } from '@/stories/forms/select/colors.stories';

export default {
	...meta,
	title: 'E2E/ColorInput/Colors',
	tags: ['!autodocs'],
};

const basePlay = async ({ canvasElement, step }) => {
	const input = within(canvasElement).getByRole('combobox');

	await step('Mouse interactions', async () => {
		await userEvent.click(input);
		await waitForAngular();
		await expect(screen.getByRole('listbox')).toBeVisible();
		const panel = within(screen.getByRole('listbox'));
		const options = await panel.findAllByRole('option');
		const optionText = options[0].innerText;
		await userEvent.click(options[0]);
		await waitForAngular();
		await expect(input).toHaveFocus();
		await expect(input.parentElement).toHaveTextContent(optionText);
	});

	await step('Keyboard interactions', async () => {
		input.focus();
		await expect(input).toHaveFocus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await expect(screen.getByRole('listbox')).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(screen.queryByText('listbox')).toBeNull();
		await expect(input).toHaveFocus();
		await waitForAngular();
	});
};

export const BasicTEST = createTestStory(Basic, basePlay);
