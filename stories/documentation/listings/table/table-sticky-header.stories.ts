import { Meta, StoryFn } from '@storybook/angular';

interface TableStickyHeaderStory {}

export default {
	title: 'Documentation/Listings/Table/Sticky Header',
	argTypes: {},
} as Meta;

function getTemplate(args: TableStickyHeaderStory): string {
	return `<!-- header height passed with CSS var -->
		<table class="table mod-stickyHeader" [attr.style]="'--table-stickyHeader-shadow-offset: 2.25rem'">
			<thead class="table-head">
				<tr class="table-head-row">
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
				</tr>
			</thead>
			<tbody class="table-body">
				<!-- row containing the top shadow -->
				<tr class="table-body-row mod-stickyHeader-shadow" aria-hidden="true">
					<td class="table-body-row-cell" colspan="3">
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
	
	`;
}

const Template: StoryFn<TableStickyHeaderStory> = (args: TableStickyHeaderStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [`:host {display: block; height: 10rem; overflow: auto;}`],
});

export const StickyHeader = Template.bind({});
StickyHeader.args = {};
