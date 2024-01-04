import { Meta, Story } from '@storybook/angular';

interface TableStickyColumnsAndHeaderWithBreakpointsStory {
}

export default {
	title: 'Documentation/Listings/Table/Sticky Columns And Header With Breakpoints v2',
	argTypes: {
	},
} as Meta;

function getTemplate(args: TableStickyColumnsAndHeaderWithBreakpointsStory): string {
	return `
	<div class="demo-wrapper">
		<table class="table mod-layoutFixedV2@mediaMinS mod-stickyColumnV2@mediaMinS mod-stickyHeaderV2" style="--table-sticky-header-shadow-offset: 56px">
			<thead class="table-head">
				<tr class="table-head-row">
					<th class="table-head-row-cell mod-stickyColumn-left" style="--table-layout-fixed-width: 8; --table-sticky-column-offset: 0">
						Head cell
					</th>
					<th class="table-head-row-cell mod-stickyColumn-left" style="--table-layout-fixed-width: 7; --table-sticky-column-offset: 8">
						Head cell
					</th>
					<th class="table-head-row-cell mod-stickyColumn-left" style="--table-layout-fixed-width: 5; --table-sticky-column-offset: 15">
						Head cell
					</th>
					<th class="table-head-row-cell mod-stickyColumn-left mod-stickyColumn-shadow" role="presentation" style="--table-sticky-column-offset: 20">
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
					<th class="table-head-row-cell mod-stickyColumn-right mod-stickyColumn-shadow" role="presentation" style="--table-sticky-column-offset: 5">
						<div class="stickyColumn-shadow-wrapper"></div>
					</th>
					<th class="table-head-row-cell mod-stickyColumn-right" style="--table-layout-fixed-width: 5; --table-sticky-column-offset: 0">
						Head cell
					</th>
				</tr>
			</thead>
			<tbody class="table-body">
				<tr class="table-body-row mod-stickyHeader-shadow">
					<td class="table-body-row-cell" colspan="16" role="presentation">
						<div class="stickyHeader-shadow-wrapper"></div>
					</td>
				</tr>
				<tr class="table-body-row">
					<td class="table-body-row-cell mod-stickyColumn-left" style="--table-sticky-column-offset: 0">
						Body cell
					</td>
					<td class="table-body-row-cell mod-stickyColumn-left" style="--table-sticky-column-offset: 8">
						Body cell
					</td>
					<td class="table-body-row-cell mod-stickyColumn-left" style="--table-sticky-column-offset: 15">
						Body cell
					</td>
					<td class="table-body-row-cell mod-stickyColumn-left mod-stickyColumn-shadow" role="presentation" style="--table-sticky-column-offset: 20">
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
					<td class="table-body-row-cell mod-stickyColumn-right mod-stickyColumn-shadow" role="presentation" style="--table-sticky-column-offset: 5">
						<div class="stickyColumn-shadow-wrapper"></div>
					</td>
					<td class="table-body-row-cell mod-stickyColumn-right" style="--table-sticky-column-offset: 0">
						Body cell
					</td>
				</tr>
				<tr class="table-body-row">
					<td class="table-body-row-cell mod-stickyColumn-left" style="--table-sticky-column-offset: 0">
						Body cell
					</td>
					<td class="table-body-row-cell mod-stickyColumn-left" style="--table-sticky-column-offset: 8">
						Body cell
					</td>
					<td class="table-body-row-cell mod-stickyColumn-left" style="--table-sticky-column-offset: 15">
						Body cell
					</td>
					<td class="table-body-row-cell mod-stickyColumn-left mod-stickyColumn-shadow" role="presentation" style="--table-sticky-column-offset: 20">
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
					<td class="table-body-row-cell mod-stickyColumn-right mod-stickyColumn-shadow" role="presentation" style="--table-sticky-column-offset: 5">
						<div class="stickyColumn-shadow-wrapper"></div>
					</td>
					<td class="table-body-row-cell mod-stickyColumn-right" style="--table-sticky-column-offset: 0">
						Body cell
					</td>
				</tr>
				<tr class="table-body-row">
					<td class="table-body-row-cell mod-stickyColumn-left" style="--table-sticky-column-offset: 0">
						Body cell
					</td>
					<td class="table-body-row-cell mod-stickyColumn-left" style="--table-sticky-column-offset: 8">
						Body cell
					</td>
					<td class="table-body-row-cell mod-stickyColumn-left" style="--table-sticky-column-offset: 15">
						Body cell
					</td>
					<td class="table-body-row-cell mod-stickyColumn-left mod-stickyColumn-shadow" role="presentation" style="--table-sticky-column-offset: 20">
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
					<td class="table-body-row-cell mod-stickyColumn-right mod-stickyColumn-shadow" role="presentation" style="--table-sticky-column-offset: 5">
						<div class="stickyColumn-shadow-wrapper"></div>
					</td>
					<td class="table-body-row-cell mod-stickyColumn-right" style="--table-sticky-column-offset: 0">
						Body cell
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	`
}

const Template: Story<TableStickyColumnsAndHeaderWithBreakpointsStory> = (args: TableStickyColumnsAndHeaderWithBreakpointsStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`.demo-wrapper {overflow: auto; height: 10rem;}`
	]
});

export const StickyColumnsAndHeaderWithBreakpoints = Template.bind({});
StickyColumnsAndHeaderWithBreakpoints.args = {};
