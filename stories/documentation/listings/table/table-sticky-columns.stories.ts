import { Meta, StoryFn } from '@storybook/angular';

interface TableStickyColumnsStory {}

export default {
	title: 'Documentation/Listings/Table/Sticky Columns',
	argTypes: {},
} as Meta;

function getTemplate(args: TableStickyColumnsStory): string {
	return `
	<div class="demo-wrapper">
		<table class="table mod-layoutFixed mod-stickyColumn">
			<thead class="table-head">
				<tr class="table-head-row">
					<th class=" table-head-row-cell mod-layoutFixed-8 mod-stickyColumn-leftOffset0 " >
						Head cell
					</th>
					<th class=" table-head-row-cell mod-layoutFixed-7 mod-stickyColumn-leftOffset8 " >
						Head cell
					</th>
					<th class=" table-head-row-cell mod-layoutFixed-5 mod-stickyColumn-leftOffset15 " >
						Head cell
					</th>
					<th class="table-head-row-cell mod-stickyColumn-leftOffset20 mod-stickyColumn-shadow" role="presentation">
						<div class="stickyColumn-shadow-wrapper"></div>
					</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell mod-stickyColumn-rightOffset5 mod-stickyColumn-shadow" role="presentation">
						<div class="stickyColumn-shadow-wrapper"></div>
					</th>
					<th class=" table-head-row-cell mod-layoutFixed-5 mod-stickyColumn-rightOffset0 " >
						Head cell
					</th>
				</tr>
			</thead>
			<tbody class="table-body">
				<tr class="table-body-row">
					<td class="table-body-row-cell mod-stickyColumn-leftOffset0">
						fixed width: 8 // offset 0
					</td>
					<td class="table-body-row-cell mod-stickyColumn-leftOffset8">
						fixed width: 7 // offset 8
					</td>
					<td class="table-body-row-cell mod-stickyColumn-leftOffset15">
						fixed width: 5 // offset 8 + 7 = 15
					</td>
					<td class="table-body-row-cell mod-stickyColumn-leftOffset20 mod-stickyColumn-shadow" role="presentation">
						<div class="stickyColumn-shadow-wrapper"></div>
					</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell mod-stickyColumn-rightOffset5 mod-stickyColumn-shadow" role="presentation">
						<div class="stickyColumn-shadow-wrapper"></div>
					</td>
					<td class="table-body-row-cell mod-stickyColumn-rightOffset0">
						fixed width: 5 // offset 0
					</td>
				</tr>
				<tr class="table-body-row">
					<td class="table-body-row-cell mod-stickyColumn-leftOffset0">
						Body cell
					</td>
					<td class="table-body-row-cell mod-stickyColumn-leftOffset8">
						Body cell
					</td>
					<td class="table-body-row-cell mod-stickyColumn-leftOffset15">
						Body cell
					</td>
					<td class="table-body-row-cell mod-stickyColumn-leftOffset20 mod-stickyColumn-shadow" role="presentation">
						<div class="stickyColumn-shadow-wrapper"></div>
					</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell mod-stickyColumn-rightOffset5 mod-stickyColumn-shadow" role="presentation">
						<div class="stickyColumn-shadow-wrapper"></div>
					</td>
					<td class="table-body-row-cell mod-stickyColumn-rightOffset0">
						Body cell
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	`;
}

const Template: StoryFn<TableStickyColumnsStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [`.demo-wrapper {overflow: auto;}`],
});

export const StickyColumns = Template.bind({});
StickyColumns.args = {};
