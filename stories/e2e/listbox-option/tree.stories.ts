import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, within } from 'storybook/test';
import meta, { Basic } from '@/stories/forms/listbox-option/angular/tree.stories';

export default {
	...meta,
	title: 'E2E/ListboxOption/Tree',
	tags: ['!autodocs'],
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);

	await step('The listbox is exposed as a tree of treeitems', async () => {
		const tree = canvas.getByRole('tree');
		await expect(canvas.queryByRole('listbox')).not.toBeInTheDocument();
		await expect(within(tree).getAllByRole('treeitem')).toHaveLength(6);
		await expect(within(tree).queryAllByRole('option')).toHaveLength(0);
	});

	await step('Children are nested in a group carrying their level', async () => {
		const option2 = canvas.getByText('option 2').closest('lu-listbox-option');
		const level2 = option2.querySelector(':scope > [role="group"]');
		await expect(level2).toHaveAttribute('style', expect.stringContaining('--components-listboxOptionWrapper-level: 1'));
		await expect(within(level2 as HTMLElement).getAllByRole('treeitem')).toHaveLength(4);

		const level3 = level2.querySelector('[role="group"]');
		await expect(level3).toHaveAttribute('style', expect.stringContaining('--components-listboxOptionWrapper-level: 2'));
		await expect(within(level3 as HTMLElement).getAllByRole('treeitem')).toHaveLength(2);
	});

	await step('Leaf treeitems have no nested group', async () => {
		const option1 = canvas.getByText('option 1').closest('lu-listbox-option');
		await expect(option1.querySelector('[role="group"]')).not.toBeInTheDocument();
	});
});
