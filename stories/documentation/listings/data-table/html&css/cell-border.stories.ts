import { Meta, StoryFn } from '@storybook/angular';

interface CellBorderStory {}

export default {
	title: 'Documentation/Listings/Data table/HTML&CSS/Cell Border',
	argTypes: {},
} as Meta;

function getTemplate(args: CellBorderStory): string {
	return `<div class="dataTableWrapper">
	<table class="dataTable mod-cellBorder">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell" rowspan="2">Label</th>
				<th class="dataTable-head-row-cell" colspan="2">Label</th>
			</tr>
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
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
				<td class="dataTable-body-row-cell" rowspan="2">Text</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
		</tbody>
	</table>
</div>`;
}

const Template: StoryFn<CellBorderStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const CellBorder = Template.bind({});
CellBorder.args = {};
