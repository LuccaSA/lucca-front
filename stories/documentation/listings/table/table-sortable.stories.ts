import { Meta, StoryFn } from '@storybook/angular';

interface TableSortableStory {}

export default {
	title: 'Documentation/Listings/Table/Sortable',
	argTypes: {},
} as Meta;

function getTemplate(args: TableSortableStory): string {
	return `
	<table class="table">
		<thead class="table-head">
			<tr class="table-head-row">
				<th class="table-head-row-cell" aria-sort="descending">
					<button type="button" class="table-head-row-cell-sortableButton">Triable</button>
				</th>
				<th class="table-head-row-cell" aria-sort="none">
					<button type="button" class="table-head-row-cell-sortableButton">Triable</button>
				</th>
				<th class="table-head-row-cell" >
					Non triable
				</th>
			</tr>
		</thead>
		<tbody class="table-body">
			<tr class="table-body-row">
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
			</tr>
			<tr class="table-body-row">
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
			</tr>
		</tbody>
	</table>
	`;
}

const Template: StoryFn<TableSortableStory> = (args: TableSortableStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Sortable = Template.bind({});
Sortable.args = {};
