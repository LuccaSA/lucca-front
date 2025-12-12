import { Meta, StoryFn } from '@storybook/angular';

interface IndexTableSortableStory {
	align: string;
}

export default {
	title: 'Documentation/Listings/Index Table/HTML & CSS/Sortable',
	argTypes: {
		align: {
			options: ['', 'mod-alignRight', 'mod-alignCenter'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: IndexTableSortableStory): string {
	return `<table class="indexTable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell ${args.align}" scope="col">Not sortable</th>
			<th class="indexTable-head-row-cell ${args.align}" scope="col">
				<button type="button" class="tableSortable button">
					Sortable
					<span class="tableSortable-arrows">
						<span class="lucca-icon icon-arrowChevronTop tableSortable-arrows-ascending"></span>
						<span class="lucca-icon icon-arrowChevronBottom tableSortable-arrows-descending"></span>
					</span>
				</button>
			</th>
			<th class="indexTable-head-row-cell ${args.align}" scope="col" aria-sort="ascending">
				<button type="button" class="tableSortable button">
					Sorted ascending
					<span class="tableSortable-arrows">
						<span class="lucca-icon icon-arrowChevronTop tableSortable-arrows-ascending"></span>
						<span class="lucca-icon icon-arrowChevronBottom tableSortable-arrows-descending"></span>
					</span>
				</button>
			</th>
			<th class="indexTable-head-row-cell ${args.align}" scope="col" aria-sort="descending">
				<button type="button" class="tableSortable button">
					Sorted descending
					<span class="tableSortable-arrows">
						<span class="lucca-icon icon-arrowChevronTop tableSortable-arrows-ascending"></span>
						<span class="lucca-icon icon-arrowChevronBottom tableSortable-arrows-descending"></span>
					</span>
				</button>
			</th>
			<th class="indexTable-head-row-cell ${args.align}" scope="col" aria-sort="none">
				<button type="button" class="tableSortable button" onclick="switch (this.parentNode.getAttribute('aria-sort')) { case 'ascending': this.parentNode.setAttribute('aria-sort', 'descending'); break; case 'descending': this.parentNode.setAttribute('aria-sort', 'none'); break; default: this.parentNode.setAttribute('aria-sort', 'ascending'); }">
					Interactive
					<span class="tableSortable-arrows">
						<span class="lucca-icon icon-arrowChevronTop tableSortable-arrows-ascending"></span>
						<span class="lucca-icon icon-arrowChevronBottom tableSortable-arrows-descending"></span>
					</span>
				</button>
			</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell ${args.align}">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell ${args.align}">Content</td>
			<td class="indexTable-body-row-cell ${args.align}">Content</td>
			<td class="indexTable-body-row-cell ${args.align}">Content</td>
			<td class="indexTable-body-row-cell ${args.align}">Content</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell ${args.align}">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell ${args.align}">Content</td>
			<td class="indexTable-body-row-cell ${args.align}">Content</td>
			<td class="indexTable-body-row-cell ${args.align}">Content</td>
			<td class="indexTable-body-row-cell ${args.align}">Content</td>
		</tr>
	</tbody>
</table>`;
}

const Template: StoryFn<IndexTableSortableStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Sortable = Template.bind({});
Sortable.args = {
	align: '',
};
