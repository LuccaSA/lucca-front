import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import meta, { Basic } from '@/stories/listings/data-table/angular/basic.stories';
import { StoryObj } from '@storybook/angular-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

export default {
	...meta,
	title: 'E2E/DataTable',
	tags: ['!autodocs'],
};

const Sortable: StoryObj = {
	...Basic,
	args: { ...Basic.args, sort: 'none', sortChange: fn() },
};

// `disabled` only applies to the last body row of the story.
const Selectable: StoryObj = {
	...Basic,
	args: { ...Basic.args, lines: 3, selectable: true, disabled: true },
};

const Group: StoryObj = {
	...Basic,
	args: { ...Basic.args, group: true },
};

function getColumnHeader(sortButton: HTMLElement): HTMLElement {
	const columnHeader = sortButton.closest<HTMLElement>('th');
	if (!columnHeader) {
		throw new Error('The sort button is not inside a column header.');
	}
	return columnHeader;
}

export const SortTEST = createTestStory(Sortable, async ({ canvasElement, args, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const sortButton = canvas.getByRole('button', { name: 'header' });
	const columnHeader = getColumnHeader(sortButton);

	await step('Renders a sortable column header', async () => {
		await expect(sortButton).toBeVisible();
		await expect(columnHeader).toHaveAttribute('aria-sort', 'none');
	});

	await step('Mouse - cycles through ascending, descending and none', async () => {
		for (const sort of ['ascending', 'descending', 'none']) {
			await userEvent.click(sortButton);
			await waitForAngular();
			await expect(columnHeader).toHaveAttribute('aria-sort', sort);
			await expect(args['sortChange']).toHaveBeenLastCalledWith(sort);
		}
		await expect(args['sortChange']).toHaveBeenCalledTimes(3);
	});

	await step('Keyboard - Enter changes the sort', async () => {
		sortButton.focus();
		await expect(sortButton).toHaveFocus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(columnHeader).toHaveAttribute('aria-sort', 'ascending');
		await expect(args['sortChange']).toHaveBeenLastCalledWith('ascending');
	});
});

export const SelectableTEST = createTestStory(Selectable, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const rowCheckboxes = canvas.getAllByRole('checkbox', { name: 'Sélectionner cette ligne' });

	await step('Renders a selection checkbox on the head row and on each body row', async () => {
		await expect(canvas.getByRole('checkbox', { name: 'Sélectionner toutes les lignes' })).toBeVisible();
		await expect(rowCheckboxes).toHaveLength(3);
		for (const checkbox of rowCheckboxes) {
			await expect(checkbox).not.toBeChecked();
		}
		await expect(rowCheckboxes[2]).toBeDisabled();
	});

	await step('Mouse - selects and unselects a row', async () => {
		await userEvent.click(rowCheckboxes[0]);
		await waitForAngular();
		await expect(rowCheckboxes[0]).toBeChecked();
		await expect(rowCheckboxes[1]).not.toBeChecked();

		await userEvent.click(rowCheckboxes[0]);
		await waitForAngular();
		await expect(rowCheckboxes[0]).not.toBeChecked();
	});

	await step('Keyboard - Space selects a row', async () => {
		rowCheckboxes[1].focus();
		await expect(rowCheckboxes[1]).toHaveFocus();
		await userEvent.keyboard(' ');
		await waitForAngular();
		await expect(rowCheckboxes[1]).toBeChecked();
	});

	await step('Does not select a disabled row', async () => {
		await userEvent.click(rowCheckboxes[2]);
		await waitForAngular();
		await expect(rowCheckboxes[2]).not.toBeChecked();
	});
});

export const GroupTEST = createTestStory(Group, async ({ canvasElement, args, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);
	const groupButton = canvas.getByRole('button', { name: args['groupButtonAlt'] as string });

	// Each body row starts with a row header: they are only exposed while the group is expanded.
	await step('Renders a collapsed group', async () => {
		await expect(canvas.getByText('Group')).toBeVisible();
		await expect(groupButton).toHaveAttribute('aria-expanded', 'false');
		await expect(canvas.queryAllByRole('rowheader')).toHaveLength(0);
	});

	await step('Mouse - expands and collapses the group', async () => {
		await userEvent.click(groupButton);
		await waitForAngular();
		await expect(groupButton).toHaveAttribute('aria-expanded', 'true');
		await expect(canvas.getAllByRole('rowheader')).toHaveLength(2);

		await userEvent.click(groupButton);
		await waitForAngular();
		await expect(groupButton).toHaveAttribute('aria-expanded', 'false');
		await expect(canvas.queryAllByRole('rowheader')).toHaveLength(0);
	});

	await step('Keyboard - Enter expands the group', async () => {
		groupButton.focus();
		await expect(groupButton).toHaveFocus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(groupButton).toHaveAttribute('aria-expanded', 'true');
		await expect(canvas.getAllByRole('rowheader')).toHaveLength(2);
	});
});
