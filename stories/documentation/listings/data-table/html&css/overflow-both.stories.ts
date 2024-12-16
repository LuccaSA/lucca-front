import { Meta, StoryFn } from '@storybook/angular';

interface OverflowBothStory {}

export default {
	title: 'Documentation/Listings/Data table/HTML&CSS/Overflow both',
	argTypes: {},
} as Meta;

function getTemplate(args: OverflowBothStory): string {
	return `<div class="dataTableWrapper" style="width: 30rem; height: 10rem">
	<div class="dataTableShadows">
		<table
			class="dataTable mod-columnsOverflow mod-rowsOverflow -is-firstColumnVisible -is-firstRowVisible -is-lastColumnVisible -is-lastRowVisible"
		>
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

const Template: StoryFn<OverflowBothStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const OverflowBoth = Template.bind({});
OverflowBoth.args = {};
