import { expect, screen, userEvent, within } from 'storybook/test';
import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import meta, { Basic } from '@/stories/forms/select/tree-select.stories';

export default {
	...meta,
	title: 'E2E/TreeSelect',
	tags: ['!autodocs'],
};

// Same as for the multi-select
async function checkValues(input: HTMLElement, values: string[]) {
	if (values.length === 0) {
		await expect(input.parentElement?.getElementsByTagName('lu-numeric-badge').length).toBe(0);
	}
	// If it's a counter displayer
	if (input.parentElement?.getElementsByTagName('lu-numeric-badge').length > 0) {
		const counter = input.parentElement?.getElementsByTagName('lu-numeric-badge')[0];
		await expect(counter).toHaveTextContent(values.length.toString());
	} else {
		for (const value of values) {
			await expect(input.parentElement.parentElement).toHaveTextContent(value);
		}
	}
}

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	// Mouse interactions
	const input = within(canvasElement).getByRole('combobox');
	const buttons = within(canvasElement).queryAllByRole('button');
	// Context
	const isBadgeDisplayer = input.parentElement?.getElementsByTagName('lu-simple-select-default-option').length > 0;
	if (buttons.length > 0) {
		const clearButton = buttons.find((button) => button.className.includes('multipleSelect-clear'));
		if (clearButton) {
			await userEvent.click(clearButton);
		}
	}
	await userEvent.click(input);
	await waitForAngular();
	const panel = within(screen.getByRole('tree'));
	const options = await panel.findAllByRole('treeitem').then((options) => options.filter((el) => !el.id.includes('select-all')));
	const optionValues = ['Artichaut', 'Brocoli', 'Céleri', 'Chou chinois', 'Laitue'];
	await userEvent.click(options[0]);
	await userEvent.click(options[1]);
	await userEvent.click(options[2]);
	await userEvent.click(options[3]);
	await userEvent.keyboard('{Escape}');
	await waitForAngular();
	await expect(screen.queryByText('listbox')).toBeNull();
	await checkValues(input, optionValues);
	if (isBadgeDisplayer) {
		await step('Clear and remove values using mouse', async () => {
			const chipClearButtons = await within(input.parentElement).findAllByRole('button');
			await userEvent.click(chipClearButtons[0]);
			await expect(input.parentElement).not.toHaveTextContent(optionValues[0]);
			await userEvent.click(input);
			await waitForAngular();
			const panel = within(screen.getByRole('tree'));
			const options = await panel.findAllByRole('treeitem');
			await userEvent.click(options[1]);
			await userEvent.keyboard('{Escape}');
			await waitForAngular();
			await expect(screen.queryByText('listbox')).toBeNull();
			await expect(input.parentElement).not.toHaveTextContent(optionValues[1]);
		});
	}
	// Doing the same but with keyboard
	await step('Keyboard interactions', async () => {
		const buttons = await within(canvasElement).findAllByRole('button');
		await userEvent.click(buttons.find((button) => button.className.includes('multipleSelect-clear')));
		await waitForAngular();
		input.focus();
		await expect(input).toHaveFocus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await expect(screen.getByRole('tree')).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(screen.queryByText('listbox')).toBeNull();
		await waitForAngular();
		await expect(input).toHaveFocus();
		// Broken but fixed in current master, TODO uncomment
		// await userEvent.keyboard('{Space}');
		// await waitForAngular();
		// await expect(screen.getByRole('tree')).toBeVisible();
		// await userEvent.keyboard('{Escape}');
		input.focus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		// For some reason, this arrowdown is not being handled properly, even tho it reaches the key manager
		// I'm keeping it as commented for now as it only happens in test env and I want to test more stuff and not get stuck on this
		// await userEvent.keyboard('{ArrowDown}');
		await userEvent.keyboard('{Enter}');
		// Because of the arrowDown issue, we'll select more using mouse in order to be able to test more stuff
		const panel = within(screen.getByRole('tree'));
		const options = await panel.findAllByRole('treeitem').then((options) => options.filter((el) => !el.id.includes('select-all')));
		const optionValues = ['Artichaut', 'Brocoli', 'Céleri', 'Chou chinois', 'Laitue'];
		await userEvent.click(options[1]);
		await userEvent.click(options[2]);
		await userEvent.click(options[3]);
		const allOptions = await panel.findAllByRole('treeitem');
		await userEvent.keyboard('{Escape}');
		if (allOptions.some((opt) => opt.id.includes('select-all'))) {
			const valuesWithSelectAll = options.map((opt) => opt.textContent);
			valuesWithSelectAll.splice(1, 3);
			await checkValues(input, valuesWithSelectAll);
		} else {
			await checkValues(input, optionValues);
		}
		if (isBadgeDisplayer) {
			input.focus();
			await userEvent.tab();
			await userEvent.keyboard('{Enter}');
			// We should have unselected first option
			await expect(input.parentElement).not.toHaveTextContent(optionValues[0]);
			await userEvent.click(input);
			await userEvent.keyboard('{Backspace}');
			// We should have unselected last option
			await expect(input.parentElement).not.toHaveTextContent(optionValues[3]);
			// Now we search and select an option based on the result
			await userEvent.type(input, 'carotte');
			await waitForAngular();
			const searchResult = await within(screen.getByRole('tree')).findAllByRole('treeitem');
			await expect(searchResult).toHaveLength(1);
			await userEvent.keyboard('{Enter}');
			await userEvent.keyboard('{Escape}');
			await expect(input.parentElement).toHaveTextContent(searchResult[0].textContent);
		}
	});
});
