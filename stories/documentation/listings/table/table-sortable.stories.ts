import { Meta, StoryFn } from '@storybook/angular';

interface TableSortableStory {
	align: string;
}

export default {
	title: 'Documentation/Listings/Table/Sortable',
	argTypes: {
		align: {
			options: ['', 'mod-alignRight', 'mod-alignCenter'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: TableSortableStory): string {
	return `
<table class="table mod-layoutFixed">
	<thead class="table-head">
		<tr class="table-head-row">
			<th class="table-head-row-cell ${args.align}" >
				Non triable
			</th>
			<th class="table-head-row-cell ${args.align}" aria-sort="none">
				<button type="button" class="table-head-row-cell-sortableButton">Triable</button>
			</th>
			<th class="table-head-row-cell ${args.align}" aria-sort="ascending">
				<button type="button" class="table-head-row-cell-sortableButton">Trié ascendant</button>
			</th>
			<th class="table-head-row-cell ${args.align}" aria-sort="descending">
				<button type="button" class="table-head-row-cell-sortableButton">Trié descendant</button>
			</th>
		</tr>
	</thead>
	<tbody class="table-body">
		<tr class="table-body-row">
			<td class="table-body-row-cell ${args.align}">Contenu</td>
			<td class="table-body-row-cell ${args.align}">Contenu</td>
			<td class="table-body-row-cell ${args.align}">Contenu</td>
			<td class="table-body-row-cell ${args.align}">Contenu</td>
		</tr>
		<tr class="table-body-row">
			<td class="table-body-row-cell ${args.align}">Contenu</td>
			<td class="table-body-row-cell ${args.align}">Contenu</td>
			<td class="table-body-row-cell ${args.align}">Contenu</td>
			<td class="table-body-row-cell ${args.align}">Contenu</td>
		</tr>
	</tbody>
</table>
<br />
<table class="table mod-layoutFixed">
	<thead class="table-head">
		<tr class="table-head-row">
			<th class="table-head-row-cell ${args.align}">
				Non triable
			</th>
			<th class="table-head-row-cell ${args.align} mod-sortable">
				Triable
			</th>
			<th class="table-head-row-cell ${args.align} mod-sortable sortedAscending">
				Trié ascendant
			</th>
			<th class="table-head-row-cell ${args.align}  mod-sortable sortedDescending">
				Trié descendant
			</th>
		</tr>
	</thead>
	<tbody class="table-body">
		<tr class="table-body-row">
			<td class="table-body-row-cell ${args.align}">Contenu</td>
			<td class="table-body-row-cell ${args.align}">Contenu</td>
			<td class="table-body-row-cell ${args.align}">Contenu</td>
			<td class="table-body-row-cell ${args.align}">Contenu</td>
		</tr>
		<tr class="table-body-row">
			<td class="table-body-row-cell ${args.align}">Contenu</td>
			<td class="table-body-row-cell ${args.align}">Contenu</td>
			<td class="table-body-row-cell ${args.align}">Contenu</td>
			<td class="table-body-row-cell ${args.align}">Contenu</td>
		</tr>
	</tbody>
</table>
<br />
<table class="table mod-layoutFixed">
	<thead class="table-head">
		<tr class="table-head-row">
			<th class="table-head-row-cell ${args.align}" >
				Non triable
			</th>
			<th class="table-head-row-cell ${args.align}" aria-sort="none">
				<button type="button" class="tableSortable button">
					Triable
					<span class="tableSortable-arrows">
						<span class="lucca-icon icon-chevronTop tableSortable-arrows-ascending"></span>
						<span class="lucca-icon icon-chevronBottom tableSortable-arrows-descending"></span>
					</span>
				</button>
			</th>
			<th class="table-head-row-cell ${args.align}" aria-sort="ascending">
				<button type="button" class="tableSortable button">
					Trié ascendant
					<span class="tableSortable-arrows">
						<span class="lucca-icon icon-chevronTop tableSortable-arrows-ascending"></span>
						<span class="lucca-icon icon-chevronBottom tableSortable-arrows-descending"></span>
					</span>
				</button>
			</th>
			<th class="table-head-row-cell ${args.align}" aria-sort="descending">
				<button type="button" class="tableSortable button">
					Trié descendant
					<span class="tableSortable-arrows">
						<span class="lucca-icon icon-chevronTop tableSortable-arrows-ascending"></span>
						<span class="lucca-icon icon-chevronBottom tableSortable-arrows-descending"></span>
					</span>
				</button>
			</th>
		</tr>
	</thead>
	<tbody class="table-body">
		<tr class="table-body-row">
			<td class="table-body-row-cell ${args.align}">Contenu</td>
			<td class="table-body-row-cell ${args.align}">Contenu</td>
			<td class="table-body-row-cell ${args.align}">Contenu</td>
			<td class="table-body-row-cell ${args.align}">Contenu</td>
		</tr>
		<tr class="table-body-row">
			<td class="table-body-row-cell ${args.align}">Contenu</td>
			<td class="table-body-row-cell ${args.align}">Contenu</td>
			<td class="table-body-row-cell ${args.align}">Contenu</td>
			<td class="table-body-row-cell ${args.align}">Contenu</td>
		</tr>
	</tbody>
</table>`;
}

const Template: StoryFn<TableSortableStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Sortable = Template.bind({});
Sortable.args = {
	align: '',
};
