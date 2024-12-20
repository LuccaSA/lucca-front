import { Meta, StoryFn } from '@storybook/angular';

interface OverflowVerticalStory {}

export default {
	title: 'Documentation/Listings/Data table/HTML&CSS/Overflow vertical',
	argTypes: {},
} as Meta;

function getTemplate(args: OverflowVerticalStory): string {
	return `<div class="dataTableWrapper" style="height: 10rem">
	<div class="dataTableShadows">
		<table class="dataTable mod-rowsOverflow -is-firstRowVisible -is-lastRowVisible">
			<thead class="dataTable-head">
				<tr class="dataTable-head-row">
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
				</tr>
				<tr class="dataTable-body-row">
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
				</tr>
				<tr class="dataTable-body-row">
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
				</tr>
				<tr class="dataTable-body-row">
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
					<td class="dataTable-body-row-cell">Body cell</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>`;
}

const Template: StoryFn<OverflowVerticalStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const OverflowVertical = Template.bind({});
OverflowVertical.args = {};
