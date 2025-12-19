import { Meta, StoryObj } from '@storybook/angular';

interface StickyColumnsMultipleStory {}

export default {
	title: 'Documentation/Listings/Data table/HTML&CSS/Sticky multiple columns',
	argTypes: {},
} as Meta;

function getTemplate(args: StickyColumnsMultipleStory): string {
	return `<div class="dataTableWrapper" style="width: 30rem">
	<table class="dataTable mod-layoutFixed" [attr.style]="'--dataTable-layoutFixed-width: 5.5rem'">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell mod-stickyColumn">Head cell</th>
				<th class="dataTable-head-row-cell mod-stickyColumn" style="left: var(--dataTable-layoutFixed-width)">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell mod-stickyColumn" style="right: var(--dataTable-layoutFixed-width)">Head cell</th>
				<th class="dataTable-head-row-cell mod-stickyColumn">Head cell</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn" style="left: var(--dataTable-layoutFixed-width)">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn" style="right: var(--dataTable-layoutFixed-width)">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn" style="left: var(--dataTable-layoutFixed-width)">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn" style="right: var(--dataTable-layoutFixed-width)">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn" style="left: var(--dataTable-layoutFixed-width)">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn" style="right: var(--dataTable-layoutFixed-width)">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn" style="left: var(--dataTable-layoutFixed-width)">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn" style="right: var(--dataTable-layoutFixed-width)">Body cell</td>
				<td class="dataTable-body-row-cell mod-stickyColumn">Body cell</td>
			</tr>
		</tbody>
	</table>
</div>`;
}

const Template = (args: StickyColumnsMultipleStory) => ({
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

export const StickyColumnsMultiple: StoryObj<StickyColumnsMultipleStory> = {
	args: {},
	render: Template,
};
