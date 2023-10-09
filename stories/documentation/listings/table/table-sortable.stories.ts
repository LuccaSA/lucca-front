import { Meta, StoryFn } from '@storybook/angular';

interface TableSortableStory {
	ascending: boolean;
	alignRight: boolean;
}

export default {
	title: 'Documentation/Listings/Table/Sortable',
	argTypes: {
		ascending: {
			control: {
				type: 'boolean',
			},
		},
		alignRight: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: TableSortableStory): string {
	const sort = args.ascending ? 'ascending' : 'descending';
	const alignRight = args.alignRight ? ' mod-alignRight' : '';
	return `<table class="table">
	<thead class="table-head">
		<tr class="table-head-row">
			<th class="table-head-row-cell${alignRight}" >
				Non triable
			</th>
			<th class="table-head-row-cell${alignRight}" aria-sort="none">
				<button type="button" class="table-head-row-cell-sortableButton">Triable</button>
			</th>
			<th class="table-head-row-cell${alignRight}" aria-sort="${sort}">
				<button type="button" class="table-head-row-cell-sortableButton">Trié</button>
			</th>
		</tr>
	</thead>
	<tbody class="table-body">
		<tr class="table-body-row">
			<td class="table-body-row-cell${alignRight}">Contenu</td>
			<td class="table-body-row-cell${alignRight}">Contenu</td>
			<td class="table-body-row-cell${alignRight}">Contenu</td>
		</tr>
		<tr class="table-body-row">
			<td class="table-body-row-cell${alignRight}">Contenu</td>
			<td class="table-body-row-cell${alignRight}">Contenu</td>
			<td class="table-body-row-cell${alignRight}">Contenu</td>
		</tr>
	</tbody>
</table>`;
}

const Template: StoryFn<TableSortableStory> = (args: TableSortableStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Sortable = Template.bind({});
Sortable.args = {
	ascending: false,
	alignRight: false,
};
