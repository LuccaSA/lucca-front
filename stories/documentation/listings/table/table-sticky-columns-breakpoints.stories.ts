import { Meta, StoryFn } from '@storybook/angular';

interface TableStickyColumnsAndHeaderWithBreakpointsStory {}

export default {
	title: 'Documentation/Listings/Table/Sticky Columns And Header With Breakpoints ',
	argTypes: {},
} as Meta;

function getTemplate(args: TableStickyColumnsAndHeaderWithBreakpointsStory): string {
	return `<!-- header height passed with CSS var -->
		<table class="table mod-layoutFixedAtMediaMinS mod-stickyColumnAtMediaMinS mod-stickyHeader" [attr.style]="'--table-stickyHeader-shadow-offset: 2.25rem'">
			<thead class="table-head">
				<tr class="table-head-row">
					<!-- col 1 width passed with CSS var -->
					<th class="table-head-row-cell mod-stickyColumn-left" [attr.style]="'--table-layoutFixed-width: 8rem'">
						Head cell
					</th>
					<!-- col 2 width passed with CSS var -->
					<!-- col 2 offset equal to col 1 width -->
					<th class="table-head-row-cell mod-stickyColumn-left" [attr.style]="'--table-layoutFixed-width: 7rem; --table-stickyColumn-offset: 8rem'">
						Head cell
					</th>
					<!-- col 3 width passed with CSS var -->
					<!-- col 3 offset equal to col 1 width + col 2 width -->
					<th class="table-head-row-cell mod-stickyColumn-left" [attr.style]="'--table-layoutFixed-width: 5rem; --table-stickyColumn-offset: calc(8rem + 7rem)'">
						Head cell
					</th>
					<!-- col containing the left shadow -->
					<!-- col 4 offset equal to col 1 width + col 2 width + col 3 width -->
					<th class="table-head-row-cell mod-stickyColumn-left mod-stickyColumn-shadow" [attr.style]="'--table-stickyColumn-offset: calc(8rem + 7rem + 5rem)'" aria-hidden="true">
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
					<!-- col containing the right shadow -->
					<!-- col 13 offset equal to col 14 width -->
					<th class="table-head-row-cell mod-stickyColumn-right mod-stickyColumn-shadow" [attr.style]="'--table-stickyColumn-offset: 5rem'" aria-hidden="true">
						<div class="stickyColumn-shadow-wrapper"></div>
					</th>
					<!-- col 14 width passed with CSS var -->
					<th class="table-head-row-cell mod-stickyColumn-right" [attr.style]="'--table-layoutFixed-width: 5rem'">
						Head cell
					</th>
				</tr>
			</thead>
			<tbody class="table-body">
				<!-- row containing the top shadow -->
				<tr class="table-body-row mod-stickyHeader-shadow" aria-hidden="true">
					<td class="table-body-row-cell" colspan="16">
						<div class="stickyHeader-shadow-wrapper"></div>
					</td>
				</tr>
				<tr class="table-body-row" *ngFor="let _ of [].constructor(5)">
					<td class="table-body-row-cell mod-stickyColumn-left">
						Body cell
					</td>
					<td class="table-body-row-cell mod-stickyColumn-left" [attr.style]="'--table-stickyColumn-offset: 8rem'">
						Body cell
					</td>
					<td class="table-body-row-cell mod-stickyColumn-left" [attr.style]="'--table-stickyColumn-offset: calc(8rem + 7rem)'">
						Body cell
					</td>
					<!-- col containing the left shadow -->
					<td class="table-body-row-cell mod-stickyColumn-left mod-stickyColumn-shadow" [attr.style]="'--table-stickyColumn-offset: calc(8rem + 7rem + 5rem)'" aria-hidden="true">
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
					<!-- col containing the right shadow -->
					<td class="table-body-row-cell mod-stickyColumn-right mod-stickyColumn-shadow" [attr.style]="'--table-stickyColumn-offset: 5rem'" aria-hidden="true">
						<div class="stickyColumn-shadow-wrapper"></div>
					</td>
					<td class="table-body-row-cell mod-stickyColumn-right">
						Body cell
					</td>
				</tr>
			</tbody>
		</table>
	
	`;
}

const Template: StoryFn<TableStickyColumnsAndHeaderWithBreakpointsStory> = (args: TableStickyColumnsAndHeaderWithBreakpointsStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [`:host {display: block; overflow: auto; height: 10rem; white-space: nowrap}`],
});

export const StickyColumnsAndHeaderWithBreakpoints = Template.bind({});
StickyColumnsAndHeaderWithBreakpoints.args = {};
