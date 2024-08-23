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
	return `<table class="table mod-layoutFixed">
	<thead class="table-head">
		<tr class="table-head-row">
			<th class="table-head-row-cell ${args.align}" >
				Non triable
			</th>
			<th class="table-head-row-cell ${args.align}">
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
			<th class="table-head-row-cell ${args.align}" aria-sort="none">
				<button type="button" class="tableSortable button" onclick="switch (this.parentNode.getAttribute('aria-sort')) { case 'ascending': this.parentNode.setAttribute('aria-sort', 'descending'); break; case 'descending': this.parentNode.setAttribute('aria-sort', 'none'); break; default: this.parentNode.setAttribute('aria-sort', 'ascending'); }">
					Interactif
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
			<td class="table-body-row-cell ${args.align}">Contenu</td>
		</tr>
		<tr class="table-body-row">
			<td class="table-body-row-cell ${args.align}">Contenu</td>
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
