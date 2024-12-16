import { Meta, StoryFn } from '@storybook/angular';

interface FilterStory {}

export default {
	title: 'Documentation/Listings/Data table/HTML&CSS/Filter',
	argTypes: {},
} as Meta;

function getTemplate(args: FilterStory): string {
	return `<div class="dataTableWrapper">
	<table class="dataTable">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">
					<button type="button" class="tableSortable button">
						Label
						<span class="tableSortable-arrows">
							<span class="lucca-icon icon-chevronTop tableSortable-arrows-ascending"></span>
							<span class="lucca-icon icon-chevronBottom tableSortable-arrows-descending"></span>
						</span>
					</button>
				</th>
				<th class="dataTable-head-row-cell" aria-sort="ascending">
					<button type="button" class="tableSortable button">
						Label
						<span class="tableSortable-arrows">
							<span class="lucca-icon icon-chevronTop tableSortable-arrows-ascending"></span>
							<span class="lucca-icon icon-chevronBottom tableSortable-arrows-descending"></span>
						</span>
					</button>
				</th>
				<th class="dataTable-head-row-cell" aria-sort="descending">
					<button type="button" class="tableSortable button">
						Label
						<span class="tableSortable-arrows">
							<span class="lucca-icon icon-chevronTop tableSortable-arrows-ascending"></span>
							<span class="lucca-icon icon-chevronBottom tableSortable-arrows-descending"></span>
						</span>
					</button>
				</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
		</tbody>
	</table>
</div>`;
}

const Template: StoryFn<FilterStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Filter = Template.bind({});
Filter.args = {};
