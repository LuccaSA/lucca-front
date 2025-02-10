import { Meta, StoryFn } from '@storybook/angular';

interface StickyHeaderColumnsStory {}

export default {
	title: 'Documentation/Listings/Data table/HTML&CSS/Sticky header & columns',
	argTypes: {},
} as Meta;

function getTemplate(args: StickyHeaderColumnsStory): string {
	return `<div class="dataTableWrapper" style="width: 30rem; height: 10rem">
	<table class="dataTable mod-stickyHeader">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell mod-stickyColumn">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell mod-stickyColumn">Head cell</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
			</tr>
		</tbody>
	</table>
</div>`;
}

const Template: StoryFn<StickyHeaderColumnsStory> = (args) => ({
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

export const StickyHeaderColumns = Template.bind({});
StickyHeaderColumns.args = {};
