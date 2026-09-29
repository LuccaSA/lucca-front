import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, within } from 'storybook/test';
import meta, { Basic } from '@/stories/forms/listbox-option/angular/group.stories';

export default {
	...meta,
	title: 'E2E/ListboxOption/Group',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();

	const listbox = within(canvasElement).getByRole('listbox');

	await step('Each group is labelled by its title', async () => {
		const groups = within(listbox).getAllByRole('group');
		await expect(groups).toHaveLength(3);
		for (const [index, group] of groups.entries()) {
			await expect(group).toHaveAccessibleName(`Group ${index + 1}`);
		}
	});

	await step('Each group contains its options', async () => {
		for (const group of within(listbox).getAllByRole('group')) {
			await expect(within(group).getAllByRole('option')).toHaveLength(4);
		}
	});

	await step('Groups are not selectable', async () => {
		for (const group of within(listbox).getAllByRole('group')) {
			await expect(group).not.toHaveAttribute('aria-selected');
		}
	});
});

export const MultipleTEST = createTestStory({ ...Basic, name: 'Multiple', args: { ...Basic.args, multiple: true } }, async ({ canvasElement, step }) => {
	await waitForAngular();

	const listbox = within(canvasElement).getByRole('listbox');
	const groups = within(listbox).getAllByRole('group');

	await step('Groups with selectAll get a "select all" option', async () => {
		for (const group of groups.slice(0, 2)) {
			const selectAll = within(group).getByRole('option', { name: 'Tout sélectionner' });
			await expect(selectAll).toHaveClass('mod-select');
			// The "select all" option has no checkbox of its own
			await expect(selectAll.querySelector('.checkboxField')).not.toBeInTheDocument();
		}
	});

	await step('Groups without selectAll get none', async () => {
		await expect(within(groups[2]).queryByRole('option', { name: 'Tout sélectionner' })).not.toBeInTheDocument();
	});

	await step('Regular options have a checkbox', async () => {
		const options = within(groups[2]).getAllByRole('option');
		for (const option of options) {
			await expect(option.querySelector('.checkboxField')).toBeInTheDocument();
		}
	});
});
