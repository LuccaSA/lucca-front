import { Meta, StoryObj } from '@storybook/angular';

interface OverflowHorizontalStory {}

export default {
	title: 'Documentation/Listings/Data table/HTML&CSS/Overflow horizontal',
	argTypes: {},
} as Meta;

function getTemplate(args: OverflowHorizontalStory): string {
	return `<div class="dataTableWrapper" style="width: 30rem">
	<div class="dataTableShadows">
		<table class="dataTable mod-columnsOverflow -is-firstColumnVisible -is-lastColumnVisible">
			<thead class="dataTable-head">
				<tr class="dataTable-head-row">
					<th class="dataTable-head-row-cell">Head cell</th>
					<th class="dataTable-head-row-cell">Head cell</th>
					<th class="dataTable-head-row-cell">Head cell</th>
					<th class="dataTable-head-row-cell">Head cell</th>
					<th class="dataTable-head-row-cell">Head cell</th>
					<th class="dataTable-head-row-cell">Head cell</th>
					<th class="dataTable-head-row-cell">Head cell</th>
				</tr>
			</thead>
			<tbody class="dataTable-body">
				<tr class="dataTable-body-row">
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
				</tr>
				<tr class="dataTable-body-row">
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
				</tr>
				<tr class="dataTable-body-row">
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
				</tr>
				<tr class="dataTable-body-row">
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
				</tr>
				<tr class="dataTable-body-row">
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>`;
}

const Template = (args: OverflowHorizontalStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.dataTable {
			white-space: nowrap;
		}
		`,
	],
});

export const OverflowHorizontal: StoryObj<OverflowHorizontalStory> = {
	args: {},
	render: Template,
};
