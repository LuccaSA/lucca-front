import { Meta, StoryFn } from '@storybook/angular';

interface FixedColumnsResponsiveStory {}

export default {
	title: 'Documentation/Listings/Data table/HTML&CSS/Fixed columns responsive',
	argTypes: {},
} as Meta;

function getTemplate(args: FixedColumnsResponsiveStory): string {
	return `<div class="dataTableWrapper">
	<table class="dataTable mod-layoutFixedAtMediaMinM">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell" [attr.style]="'--dataTable-layoutFixed-width: 10rem'">Fixed 10rem column</th>
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

const Template: StoryFn<FixedColumnsResponsiveStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const FixedColumnsResponsive = Template.bind({});
FixedColumnsResponsive.args = {};
