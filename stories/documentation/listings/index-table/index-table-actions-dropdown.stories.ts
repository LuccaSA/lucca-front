import { Meta, StoryObj } from '@storybook/angular';

interface IndexTableActionsDropdownStory {}

export default {
	title: 'Documentation/Listings/Index Table/Actions/Dropdown',
} as Meta;

function getTemplate(args: IndexTableActionsDropdownStory): string {
	return `<table class="indexTable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">
				<span class="pr-u-mask">Actions</span>
			</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell mod-actions">
				<button type="button" class="button indexTable-body-row-cell-subActionDropdownTrigger mod-ghost mod-onlyIcon mod-S">
					<span aria-hidden="true" class="lucca-icon icon-ellipsis"></span>
				</button>
			</td>
		</tr>
	</tbody>
</table>`;
}

const Template = (args: IndexTableActionsDropdownStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Dropdown: StoryObj<IndexTableActionsDropdownStory> = {
	args: {},
	render: Template,
};
