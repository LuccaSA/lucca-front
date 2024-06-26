import { Meta, StoryFn } from '@storybook/angular';

interface TableStickyHeaderStory {}

export default {
	title: 'Documentation/Listings/Table/Legacy/Sticky Header',
	argTypes: {},
} as Meta;

function getTemplate(args: TableStickyHeaderStory): string {
	return `
	<div class="demo-wrapper">
		<table class="table mod-stickyHeader">
			<thead class="table-head">
				<tr class="table-head-row">
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
				</tr>
			</thead>
			<tbody class="table-body">
				<tr class="table-body-row mod-stickyHeader-shadow" style="--sticky-header-shadow-offset-top: 36px" >
					<td class="table-body-row-cell" colspan="3" role="presentation">
						<div class="stickyHeader-shadow-wrapper"></div>
					</td>
				</tr>
				<tr class="table-body-row">
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
				</tr>
				<tr class="table-body-row">
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
				</tr>
				<tr class="table-body-row">
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
				</tr>
				<tr class="table-body-row">
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
				</tr>
				<tr class="table-body-row">
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
				</tr>
			</tbody>
		</table>
	</div>
	`;
}

const Template: StoryFn<TableStickyHeaderStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [`.demo-wrapper {height: 10rem; overflow: auto;}`],
});

export const StickyHeader = Template.bind({});
StickyHeader.args = {};
