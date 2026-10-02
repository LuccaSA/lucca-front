import { createTestStory } from '@/helpers/stories';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import { ensurePickerPanelStyles, getPanelScrollContainer, isFullyVisibleInPanel, waitForAngular } from '@/helpers/test';
import meta, { Basic, ScrollOnOpen, Minimal, WithDisplayer, WithClue, WithPagination, WithClearer, AddOption, CustomPanelHeader } from '@/stories/forms/select/simple-select.stories';

export default {
	...meta,
	title: 'E2E/SimpleSelect/Basic',
	tags: ['!autodocs'],
};

const basePlay = async ({ canvasElement, step }) => {
	// Mouse interactions
	const input = within(canvasElement).getByRole('combobox');
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

	await step('Keyboard interactions', async () => {
		input.focus();
		await expect(input).toHaveFocus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await expect(screen.getByRole('listbox')).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
		await expect(input).toHaveFocus();
		// await userEvent.keyboard('{Space}');
		// await waitForAngular();
		// await expect(screen.getByRole('listbox')).toBeVisible();
		// await userEvent.keyboard('{Escape}');
		// await waitForAngular();
		await waitForAngular();
	});
};

export const BasicTEST = createTestStory(Basic, basePlay);

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

export const MinimalTEST = createTestStory(Minimal, basePlay);

export const WithDisplayerTEST = createTestStory(WithDisplayer, async (context) => {
	await basePlay(context);
	const input = within(context.canvasElement).getByRole('combobox');
	await expect(input.parentElement).toHaveTextContent(new RegExp(`🥗🥗.+`));
});

export const WithClueTEST = createTestStory(WithClue, async (context) => {
	await basePlay(context);
	const canvas = within(context.canvasElement);
	const input = canvas.getByRole('combobox');
	await userEvent.tab();
	await userEvent.type(input, 'artichaut');
	await waitForAngular();
	await expect(screen.getByRole('listbox')).toBeVisible();
	const panel = within(screen.getByRole('listbox'));
	const options = await panel.findAllByRole('option');
	await expect(options.length).toBe(1);
	await userEvent.keyboard('{Enter}');
	await expect(input.parentElement).toHaveTextContent('Artichaut');
});

export const WithPaginationTEST = createTestStory(WithPagination, basePlay);

export const WithClearerTEST = createTestStory(WithClearer, async (context) => {
	await basePlay(context);
	const canvas = within(context.canvasElement);
	const inputContentElement = canvas.getByRole('combobox').parentElement;
	const input = within(inputContentElement);
	await userEvent.click(input.getByRole('button'));
	await expect(inputContentElement).toHaveTextContent('');
});

export const ScrollToSelectedTEST = {
	...createTestStory(WithClearer, async ({ canvasElement, step }) => {
		await waitForAngular();
		ensurePickerPanelStyles();
		const canvas = within(canvasElement);
		const input = canvas.getByRole('combobox');

		await step('Opening scrolls the preselected option into view (mouse)', async () => {
			await userEvent.click(input);
			await waitForAngular();
			const panel = within(screen.getByRole('listbox'));
			const selectedOption = await panel.findByRole('option', { selected: true });
			await expect(selectedOption).toHaveTextContent('Concombre');
			// The list must actually overflow for this test to be meaningful
			const container = getPanelScrollContainer();
			await expect(container.scrollHeight).toBeGreaterThan(container.clientHeight);
			// Once the opening animation settles, the panel must be scrolled to the selected option
			await waitFor(() => expect(isFullyVisibleInPanel(selectedOption)).toBe(true));
			await userEvent.keyboard('{Escape}');
			await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
		});

		await step('Opening with the keyboard scrolls to the selected option too', async () => {
			input.focus();
			await expect(input).toHaveFocus();
			await userEvent.keyboard('{ArrowDown}');
			await waitForAngular();
			const panel = within(screen.getByRole('listbox'));
			const selectedOption = await panel.findByRole('option', { selected: true });
			await waitFor(() => expect(isFullyVisibleInPanel(selectedOption)).toBe(true));
			await userEvent.keyboard('{Escape}');
			await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
		});
	}),
	name: 'Scroll to selected TEST',
};

// export const WithDisabledOptionsTEST = createTestStory(WithDisabledOptions, async (context) => {
// 	await basePlay(context);
// 	const input = within(context.canvasElement).getByRole('combobox');
// 	await userEvent.click(input);
// 	await waitForAngular();
// 	const panel = within(screen.getByRole('listbox'));
// 	const options = await panel.findAllByRole('option');
// 	await expect(options[1].firstChild).toHaveClass('is-disabled');
// });

export const AddOptionTEST = createTestStory(AddOption, async (context) => {
	await basePlay(context);
	const story = within(context.canvasElement);
	const input = within(context.canvasElement).getByRole('combobox');
	const count = story.getByTestId('legumes-count');
	const previousTotal = +count.innerText;
	await userEvent.click(input);
	await waitForAngular();
	await expect(screen.getByRole('listbox')).toBeVisible();
	const panel = within(screen.getByRole('listbox').parentElement);
	const addOptionButton = await panel.findByRole('option', { name: /ajouter un /i });
	await userEvent.click(addOptionButton);
	await waitForAngular();
	await waitFor(() => expect(+count.innerText).toBe(previousTotal + 1));
});

export const CustomPanelHeaderTEST = createTestStory(CustomPanelHeader, async (context) => {
	await basePlay(context);
	const input = within(context.canvasElement).getByRole('combobox');
	await userEvent.click(input);
	await waitForAngular();
	await expect(screen.getByRole('listbox')).toBeVisible();
	const panel = within(screen.getByRole('listbox').parentElement);
	await expect(panel.getByTestId('custom-header')).toBeInTheDocument();
});
