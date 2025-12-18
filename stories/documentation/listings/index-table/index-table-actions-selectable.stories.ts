import { Meta, StoryObj } from '@storybook/angular';

interface IndexTableActionsSelectableStory {}

export default {
	title: 'Documentation/Listings/Index Table/Actions/Selectable',
} as Meta;

function getTemplate(args: IndexTableActionsSelectableStory): string {
	return `<table class="indexTable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell mod-allowTextSelection">
				Content selectable
			</td>
			<td class="indexTable-body-row-cell">
				Content
			</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell"><a href="#">Content actionable</a></td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
	</tbody>
</table>`;
}

const Template = (args: IndexTableActionsSelectableStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Selectable: StoryObj<IndexTableActionsSelectableStory> = {
	args: {},
	render: Template,
};
