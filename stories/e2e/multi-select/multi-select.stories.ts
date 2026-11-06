import { createTestStory } from '@/helpers/stories';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import { ensurePickerPanelStyles, findPanelOptions, getPanelScrollContainer, isFullyVisibleInPanel, isSelectAllOption, waitForAngular } from '@/helpers/test';
import meta, { SelectAll, Basic, WithClue, ScrollOnOpen, Establishment } from '@/stories/forms/select/multi-select.stories';

export default {
	...meta,
	title: 'E2E/MultiSelect/Basic',
	tags: ['!autodocs'],
};

async function checkValues(input: HTMLElement, values: string[]) {
	if (values.length === 0) {
		await expect(input.parentElement?.getElementsByTagName('lu-chip').length).toBe(0);
	}
	// If it's a counter displayer
	if (input.parentElement?.getElementsByTagName('lu-chip').length === 1) {
		const counter = input.parentElement?.getElementsByTagName('lu-chip')[0];
		await expect(counter).toHaveTextContent(values.length.toString());
	} else {
		for (const value of values) {
			await expect(input.parentElement.parentElement).toHaveTextContent(value.trim());
		}
	}
}

const basePlay = async ({ canvasElement, step }) => {
	// Mouse interactions
	const input = within(canvasElement).getByRole('combobox');
	const buttons = within(canvasElement).queryAllByRole('button');
	// Context
	const isBadgeDisplayer = input.parentElement?.getElementsByTagName('lu-simple-select-default-option').length > 0;
	if (buttons.length > 0) {
		const clearButton = buttons.find((button) => button.className.includes('clear'));
		if (clearButton) {
			await userEvent.click(clearButton);
		}
	}
	await userEvent.click(input);
	await waitForAngular();
	const options = (await findPanelOptions()).filter((el) => !isSelectAllOption(el));
	const optionValues = options.slice(0, 4).map((option) => option.textContent);
	await userEvent.click(options[0]);
	await userEvent.click(options[1]);
	await userEvent.click(options[2]);
	await userEvent.click(options[3]);
	await userEvent.keyboard('{Escape}');
	await waitForAngular();
	await waitFor(() => {
		expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
	});
	await checkValues(input, optionValues);
	if (isBadgeDisplayer) {
		await step('Clear and remove values using mouse', async () => {
			const chipClearButtons = await within(input.parentElement).findAllByRole('button');
			await userEvent.click(chipClearButtons[0]);
			await expect(input.parentElement).not.toHaveTextContent(optionValues[0]);
			await userEvent.click(input);
			await waitForAngular();
			const options = (await findPanelOptions()).filter((el) => !isSelectAllOption(el));
			await userEvent.click(options[1]);
			await userEvent.keyboard('{Escape}');
			await waitForAngular();
			await waitFor(() => {
				expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
			});
			await expect(input.parentElement).not.toHaveTextContent(optionValues[1]);
		});
	}
	// Doing the same but with keyboard
	await step('Keyboard interactions', async () => {
		const buttons = await within(canvasElement).findAllByRole('button');
		const clearButton = buttons.find((button) => button.className.includes('clear'));
		await expect(clearButton).not.toBeUndefined();
		await userEvent.click(clearButton);
		await waitForAngular();
		input.focus();
		await expect(input).toHaveFocus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await expect(screen.getByRole('listbox')).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => {
			expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
		});
		await waitForAngular();
		await expect(input).toHaveFocus();
		// Broken but fixed in current master, TODO uncomment
		// await userEvent.keyboard('{Space}');
		// await waitForAngular();
		// await expect(screen.getByRole('listbox')).toBeVisible();
		// await userEvent.keyboard('{Escape}');
		input.focus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		// For some reason, this arrowdown is not being handled properly, even tho it reaches the key manager
		// I'm keeping it as commented for now as it only happens in test env and I want to test more stuff and not get stuck on this
		// await userEvent.keyboard('{ArrowDown}');
		await userEvent.keyboard('{Enter}');
		// Because of the arrowDown issue, we'll select more using mouse in order to be able to test more stuff
		const allOptions = await findPanelOptions();
		const options = allOptions.filter((el) => !isSelectAllOption(el));
		const optionValues = options.slice(0, 4).map((option) => option.textContent);
		await userEvent.click(options[1]);
		await userEvent.click(options[2]);
		await userEvent.click(options[3]);
		await userEvent.keyboard('{Escape}');
		if (allOptions.some(isSelectAllOption)) {
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
			const searchResult = (await findPanelOptions()).filter((el) => !isSelectAllOption(el));
			await expect(searchResult).toHaveLength(1);
			await userEvent.keyboard('{Enter}');
			await userEvent.keyboard('{Escape}');
			await expect(input.parentElement).toHaveTextContent(searchResult[0].textContent);
		}
	});
};

export const SelectAllTEST = createTestStory(SelectAll, async (context) => {
	await basePlay(context);
	const input = within(context.canvasElement).getByRole('combobox');
	const buttons = within(context.canvasElement).queryAllByRole('button');
	if (buttons.length > 0) {
		const clearButton = buttons.find((button) => button.className.includes('multipleSelect-clear'));
		if (clearButton) {
			await userEvent.click(clearButton);
			await waitForAngular();
		}
	}
	await userEvent.click(input);
	await waitForAngular();
	const panel = within(screen.getByRole('listbox'));
	const selectAllCheckbox = await panel.findByLabelText('Tout sélectionner');
	await userEvent.click(selectAllCheckbox);
	await waitForAngular();
	const options = (await findPanelOptions()).filter((el) => !isSelectAllOption(el));
	const optionValues = options.map((option) => option.textContent);
	await userEvent.keyboard('{Escape}');
	await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
	await waitForAngular();
	await waitFor(() => checkValues(input, optionValues));
	await context.step('Select all keyboard interactions', async () => {
		input.focus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await waitFor(() => checkValues(input, []));
	});
});

export const SelectAllScrollTEST = {
	...createTestStory(SelectAll, async ({ canvasElement, step }) => {
		await waitForAngular();
		ensurePickerPanelStyles();
		const canvas = within(canvasElement);
		const input = canvas.getByRole('combobox');

		await step('Panel opens at the top with "select all" visible (mouse)', async () => {
			await userEvent.click(input);
			await waitForAngular();
			const selectAllOption = (await findPanelOptions()).find(isSelectAllOption);
			await expect(selectAllOption).not.toBeUndefined();
			// The opening animation must settle without applying a spurious scroll:
			// the panel stays at the top and the "select all" header is visible
			await waitFor(() => {
				expect(getPanelScrollContainer().scrollTop).toBeLessThan(5);
				expect(isFullyVisibleInPanel(selectAllOption)).toBe(true);
			});
		});

		await step('Selected option stays marked and scrolled into view on reopen', async () => {
			const options = (await findPanelOptions()).filter((el) => !isSelectAllOption(el));
			// Pick an option far enough down that it is NOT visible without scrolling
			const pickedText = options[12].textContent;
			await userEvent.click(options[12]);
			await waitForAngular();
			await userEvent.keyboard('{Escape}');
			await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());

			await userEvent.click(input);
			await waitForAngular();
			const reopenedPanel = within(screen.getByRole('listbox'));
			const selectedOptions = await reopenedPanel.findAllByRole('option', { selected: true });
			// The picked option is still marked as selected...
			const pickedOption = selectedOptions.find((el) => el.textContent === pickedText);
			await expect(pickedOption).not.toBeUndefined();
			// ...and the panel scrolls it into view once the opening animation settles
			await waitFor(() => expect(isFullyVisibleInPanel(pickedOption)).toBe(true));
			await userEvent.keyboard('{Escape}');
			await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
		});

		await step('Keyboard: opening scrolls to the selection too', async () => {
			// Same contract as the mouse case above: the option selected in the previous step is
			// scrolled into view, the select-all header does not keep the panel at the top
			input.focus();
			await expect(input).toHaveFocus();
			await userEvent.keyboard('{ArrowDown}');
			await waitForAngular();
			await expect(screen.getByRole('listbox')).toBeVisible();
			const selectedOptions = await within(screen.getByRole('listbox')).findAllByRole('option', { selected: true });
			await expect(selectedOptions).toHaveLength(1);
			await waitFor(() => expect(isFullyVisibleInPanel(selectedOptions[0])).toBe(true));
			await userEvent.keyboard('{Escape}');
			await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
		});

		await step('Keyboard: with nothing selected the panel opens at the top', async () => {
			// Nothing legitimately scrolls anymore, so any scroll here is the spurious one applied
			// while the opening animation runs
			const clearButton = canvas.queryAllByRole('button').find((button) => button.className.includes('clear'));
			await expect(clearButton).not.toBeUndefined();
			await userEvent.click(clearButton);
			await waitForAngular();
			input.focus();
			await expect(input).toHaveFocus();
			await userEvent.keyboard('{ArrowDown}');
			await waitForAngular();
			await expect(screen.getByRole('listbox')).toBeVisible();
			await waitFor(() => expect(getPanelScrollContainer().scrollTop).toBeLessThan(5));
			await userEvent.keyboard('{Escape}');
			await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
		});
	}),
	name: 'Select all scroll TEST',
};

export const BasicTEST = createTestStory(Basic, basePlay);

export const WithClueTEST = createTestStory(WithClue, async (context) => {
	await basePlay(context);
	const canvas = within(context.canvasElement);
	const input = canvas.getByRole('combobox');

	await context.step('Search filters options', async () => {
		const clearButton = canvas.queryAllByRole('button').find((b) => b.className.includes('clear'));
		if (clearButton) {
			await userEvent.click(clearButton);
			await waitForAngular();
		}
		await userEvent.click(input);
		await waitForAngular();
		await expect(screen.getByRole('listbox')).toBeVisible();
		await userEvent.type(input, 'artichaut');
		await waitForAngular();
		const panel = within(screen.getByRole('listbox'));
		const options = await panel.findAllByRole('option');
		await expect(options).toHaveLength(1);
		await expect(options[0]).toHaveTextContent('Artichaut');
		await userEvent.click(options[0]);
		await waitForAngular();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => {
			expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
		});
		await checkValues(input, ['Artichaut']);
	});

	await context.step('Keyboard: search and select', async () => {
		const clearButton = canvas.queryAllByRole('button').find((b) => b.className.includes('clear'));
		if (clearButton) {
			await userEvent.click(clearButton);
			await waitForAngular();
		}
		input.focus();
		await expect(input).toHaveFocus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await expect(screen.getByRole('listbox')).toBeVisible();
		await userEvent.type(input, 'carotte');
		await waitForAngular();
		const panel = within(screen.getByRole('listbox'));
		const options = await panel.findAllByRole('option');
		await expect(options).toHaveLength(1);
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => {
			expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
		});
		await checkValues(input, ['Carotte']);
	});
});

export const ScrollOnOpenTEST = createTestStory(ScrollOnOpen, async ({ canvasElement, step }) => {
	await waitForAngular();
	ensurePickerPanelStyles();
	const canvas = within(canvasElement);
	const input = canvas.getByRole('combobox');

	const getPanelScrollTop = () => getPanelScrollContainer().scrollTop;

	await step('Opening with the mouse shows the top of the list', async () => {
		await userEvent.click(input);
		await waitForAngular();
		const panel = within(screen.getByRole('listbox'));
		const options = await panel.findAllByRole('option');
		// The list must be scrollable for the assertion to be meaningful
		await expect(options.length).toBeGreaterThan(10);
		await expect(options[0]).toBeVisible();
		// No spurious scroll should be applied on open: the panel stays at the top
		await waitFor(() => expect(getPanelScrollTop()).toBeLessThan(10));
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
	});

	await step('Opening with the keyboard shows the top of the list', async () => {
		input.focus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await expect(screen.getByRole('listbox')).toBeVisible();
		await waitFor(() => expect(getPanelScrollTop()).toBeLessThan(10));
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
	});
});

export const EstablishmentTEST = createTestStory(Establishment, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const input = canvas.getByRole('combobox');
	let initialCount = 0;

	await step('Open panel and load initial options', async () => {
		await userEvent.click(input);
		await waitForAngular();
		const options = await findPanelOptions();
		initialCount = options.length;
		await expect(initialCount).toBeGreaterThan(1);
	});

	await step('Search filters the options through the API', async () => {
		await userEvent.type(input, 'Marseille');
		// Wait for the debounced API call to filter the options
		await waitFor(async () => {
			const options = await findPanelOptions();
			expect(options.length).toBeLessThan(initialCount);
		});
		const options = await findPanelOptions();
		await expect(options[0]).toHaveTextContent('Marseille');
	});

	await step('Selecting an option clears the search and restores the full list', async () => {
		const options = await findPanelOptions();
		await userEvent.click(options[0]);
		await waitForAngular();
		// The search input must be cleared…
		await expect(input).toHaveValue('');
		// …and the panel must show the unfiltered list again
		// (regression: the panel used to keep showing only the filtered results)
		await waitFor(async () => {
			const refreshedOptions = await findPanelOptions();
			expect(refreshedOptions.length).toBe(initialCount);
		});
	});

	await step('Keyboard: search then Enter also restores the full list', async () => {
		await expect(input).toHaveFocus();
		await userEvent.type(input, 'Marseille');
		await waitFor(async () => {
			const options = await findPanelOptions();
			expect(options.length).toBeLessThan(initialCount);
		});
		// Enter toggles the highlighted option (unselects the one picked above)
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(input).toHaveValue('');
		await waitFor(async () => {
			const refreshedOptions = await findPanelOptions();
			expect(refreshedOptions.length).toBe(initialCount);
		});
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => {
			expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
		});
	});
});
