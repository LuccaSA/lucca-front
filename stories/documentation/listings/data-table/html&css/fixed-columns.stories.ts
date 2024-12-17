import { Meta, StoryFn } from '@storybook/angular';

interface FixedColumnsStory {}

export default {
	title: 'Documentation/Listings/Data table/HTML&CSS/Fixed columns',
	argTypes: {},
} as Meta;

function getTemplate(args: FixedColumnsStory): string {
	return `<div class="dataTableWrapper">
	<table class="dataTable mod-layoutFixed">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell" [attr.style]="'--dataTable-layoutFixed-width: 10rem'">Fixed 8rem column</th>
				<th class="dataTable-head-row-cell" [attr.style]="'--dataTable-layoutFixed-width: 12rem'">Fixed 12rem column</th>
				<th class="dataTable-head-row-cell">Label</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
				<td class="dataTable-body-row-cell">Table cell</td>
			</tr>
		</tbody>
	</table>
</div>`;
}

const Template: StoryFn<FixedColumnsStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const FixedColumns = Template.bind({});
FixedColumns.args = {};
