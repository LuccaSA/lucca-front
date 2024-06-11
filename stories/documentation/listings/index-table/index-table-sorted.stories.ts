import { Meta, StoryFn } from '@storybook/angular';

interface IndexTableSortedStory {
	align: string;
}

export default {
	title: 'Documentation/Listings/Index Table/Sorted',
	argTypes: {
		align: {
			options: ['', 'mod-alignRight', 'mod-alignCenter'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: IndexTableSortedStory): string {
	return `<table class="indexTable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Not sortable</th>
			<th class="indexTable-head-row-cell" scope="col" aria-sort="none">
				<button type="button" class="indexTable-head-row-cell-sortableButton button">
					Sortable
					<span class="indexTable-head-row-cell-sortableButton-arrows">
						<span class="lucca-icon icon-chevronTop indexTable-head-row-cell-sortableButton-arrows-ascending"></span>
						<span class="lucca-icon icon-chevronBottom indexTable-head-row-cell-sortableButton-arrows-descending"></span>
					</span>
				</button>
			</th>
			<th class="indexTable-head-row-cell" scope="col" aria-sort="ascending">
				<button type="button" class="indexTable-head-row-cell-sortableButton button">
					Sorted ascending
					<span class="indexTable-head-row-cell-sortableButton-arrows">
						<span class="lucca-icon icon-chevronTop indexTable-head-row-cell-sortableButton-arrows-ascending"></span>
						<span class="lucca-icon icon-chevronBottom indexTable-head-row-cell-sortableButton-arrows-descending"></span>
					</span>
				</button>
			</th>
			<th class="indexTable-head-row-cell" scope="col" aria-sort="descending">
				<button type="button" class="indexTable-head-row-cell-sortableButton button">
					Sorted descending
					<span class="indexTable-head-row-cell-sortableButton-arrows">
						<span class="lucca-icon icon-chevronTop indexTable-head-row-cell-sortableButton-arrows-ascending"></span>
						<span class="lucca-icon icon-chevronBottom indexTable-head-row-cell-sortableButton-arrows-descending"></span>
					</span>
				</button>
			</th>
			<th class="indexTable-head-row-cell ${args.align}" scope="col" aria-sort="none">
				<button type="button" class="indexTable-head-row-cell-sortableButton button" onclick="switch (this.parentNode.getAttribute('aria-sort')) { case 'ascending': this.parentNode.setAttribute('aria-sort', 'descending'); break; case 'descending': this.parentNode.setAttribute('aria-sort', 'none'); break; default: this.parentNode.setAttribute('aria-sort', 'ascending'); }">
					Interactive
					<span class="indexTable-head-row-cell-sortableButton-arrows">
						<span class="lucca-icon icon-chevronTop indexTable-head-row-cell-sortableButton-arrows-ascending"></span>
						<span class="lucca-icon icon-chevronBottom indexTable-head-row-cell-sortableButton-arrows-descending"></span>
					</span>
				</button>
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
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell ${args.align}">Content</td>
		</tr>
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<a href="#" class="indexTable-body-row-cell-link">Content</a>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell">Content</td>
			<td class="indexTable-body-row-cell ${args.align}">Content</td>
		</tr>
	</tbody>
</table>`;
}

const Template: StoryFn<IndexTableSortedStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Sorted = Template.bind({});
Sorted.args = {
	align: ''
};
