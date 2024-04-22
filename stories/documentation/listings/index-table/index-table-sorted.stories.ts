import { Meta, StoryFn } from '@storybook/angular';

interface IndexTableSortedStory {

}

export default {
	title: 'Documentation/Listings/Index Table/Sorted',
	argTypes: {

	},
} as Meta;

function getTemplate(args: IndexTableSortedStory): string {
	return `<table class="indexTable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col" aria-sort="none">
				<button type="button" class="indexTable-head-row-cell-sortableButton">Sortable</button>
			</th>
			<th class="indexTable-head-row-cell" scope="col" aria-sort="descending">
				<button type="button" class="indexTable-head-row-cell-sortableButton">Sorted</button>
			</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-action">See details</a>
				Content
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-action">See details</a>
				Content
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
	</tbody>
</table>`;
}

const Template: StoryFn<IndexTableSortedStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Sorted = Template.bind({});
Sorted.args = { };
