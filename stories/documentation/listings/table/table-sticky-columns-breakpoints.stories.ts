import { Meta, StoryFn } from '@storybook/angular';

interface TableStickyColumnsAndHeaderWithBreakpointsStory {}

export default {
	title: 'Documentation/Listings/Table/Sticky Columns And Header With Breakpoints',
	argTypes: {},
} as Meta;

function getTemplate(args: TableStickyColumnsAndHeaderWithBreakpointsStory): string {
	return `
	<div class="demo-wrapper">
		<table class="table mod-layoutFixed@mediaMinXS mod-stickyColumn@mediaMinXS mod-stickyHeader">
			<thead class="table-head">
				<tr class="table-head-row">
					<th class=" table-head-row-cell mod-layoutFixed-8@mediaMinXS mod-stickyColumn-leftOffset0 " >
						Head cell
					</th>
					<th class=" table-head-row-cell mod-layoutFixed-7@mediaMinXS mod-stickyColumn-leftOffset8 " >
						Head cell
					</th>
					<th class=" table-head-row-cell mod-layoutFixed-5@mediaMinXS mod-stickyColumn-leftOffset15 " >
						Head cell
					</th>
					<th class=" table-head-row-cell mod-stickyColumn-leftOffset20 mod-stickyColumn-shadow " role="presentation" >
						<div class="stickyColumn-shadow-wrapper"></div>
					</th>
					<th class="table-head-row-cell mod-columnSticky-shadowMask">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell">Head cell</th>
					<th class="table-head-row-cell mod-columnSticky-shadowMask">Head cell</th>
					<th class=" table-head-row-cell mod-stickyColumn-rightOffset5 mod-stickyColumn-shadow " role="presentation" >
						<div class="stickyColumn-shadow-wrapper"></div>
					</th>
					<th class=" table-head-row-cell mod-layoutFixed-5@mediaMinXS mod-stickyColumn-rightOffset0 " >
						Head cell
					</th>
				</tr>
			</thead>
			<tbody class="table-body">
				<tr class="table-body-row mod-stickyHeader-shadow">
					<td class="table-body-row-cell" style="--sticky-header-shadow-offset-top: 65px" colspan="16" role="presentation" >
						<div class="stickyHeader-shadow-wrapper"></div>
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
					<td class=" table-body-row-cell mod-stickyColumn-leftOffset20 mod-stickyColumn-shadow " role="presentation" >
						<div class="stickyColumn-shadow-wrapper"></div>
					</td>
					<td class="table-body-row-cell mod-columnSticky-shadowMask">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell mod-columnSticky-shadowMask">Body cell</td>
					<td class=" table-body-row-cell mod-stickyColumn-rightOffset5 mod-stickyColumn-shadow " role="presentation" >
						<div class="stickyColumn-shadow-wrapper"></div>
					</td>
					<td class="table-body-row-cell mod-stickyColumn-rightOffset0">
						Body cell
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
					<td class=" table-body-row-cell mod-stickyColumn-leftOffset20 mod-stickyColumn-shadow " role="presentation" >
						<div class="stickyColumn-shadow-wrapper"></div>
					</td>
					<td class="table-body-row-cell mod-columnSticky-shadowMask">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell mod-columnSticky-shadowMask">Body cell</td>
					<td class=" table-body-row-cell mod-stickyColumn-rightOffset5 mod-stickyColumn-shadow " role="presentation" >
						<div class="stickyColumn-shadow-wrapper"></div>
					</td>
					<td class="table-body-row-cell mod-stickyColumn-rightOffset0">
						Body cell
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
					<td class=" table-body-row-cell mod-stickyColumn-leftOffset20 mod-stickyColumn-shadow " role="presentation" >
						<div class="stickyColumn-shadow-wrapper"></div>
					</td>
					<td class="table-body-row-cell mod-columnSticky-shadowMask">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell">Body cell</td>
					<td class="table-body-row-cell mod-columnSticky-shadowMask">Body cell</td>
					<td class=" table-body-row-cell mod-stickyColumn-rightOffset5 mod-stickyColumn-shadow " role="presentation" >
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

const Template: StoryFn<TableStickyColumnsAndHeaderWithBreakpointsStory> = (args: TableStickyColumnsAndHeaderWithBreakpointsStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [`.demo-wrapper {overflow: auto; height: 10rem;}`],
});

export const StickyColumnsAndHeaderWithBreakpoints = Template.bind({});
StickyColumnsAndHeaderWithBreakpoints.args = {};
