import { IconComponent } from '@lucca-front/ng/icon';
import { ListboxComponent, OptionComponent, Treeitem } from '@lucca-front/ng/listbox';
import { Meta, moduleMetadata } from '@storybook/angular-vite';
import { cleanupTemplate, createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, within } from 'storybook/test';

export default {
	title: 'Documentation/Forms/Listbox Option/Angular/Tree',
	decorators: [
		moduleMetadata({
			imports: [ListboxComponent, OptionComponent, IconComponent, Treeitem],
		}),
	],
	argTypes: {
		multiple: {
			description: 'Ajoute une checkbox à l’option.',
			table: { category: 'inputs' },
		},
	},
	render: (args) => {
		const multiple = args['multiple'] ? ` multiple` : ``;
		return {
			template: cleanupTemplate(`<lu-listbox tree${multiple}>
	<lu-listbox-option>option 1</lu-listbox-option>
	<lu-listbox-option>
		option 2
		<ng-container treeitem>
			<lu-listbox-option>option 2.1</lu-listbox-option>
			<lu-listbox-option>
				option 2.2
				<ng-container treeitem>
					<lu-listbox-option>option 2.2.1</lu-listbox-option>
					<lu-listbox-option>
						option 2.2.2
					</lu-listbox-option>
				</ng-container>
			</lu-listbox-option>
		</ng-container>
	</lu-listbox-option>
</lu-listbox>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		multiple: false,
	},
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
