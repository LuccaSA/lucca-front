import { Meta, StoryFn } from '@storybook/angular';

interface StickyHeaderStory {}

export default {
	title: 'Documentation/Listings/Data table/HTML&CSS/Sticky header',
	argTypes: {},
} as Meta;

function getTemplate(args: StickyHeaderStory): string {
	return `<div class="dataTableWrapper" style="height: 10rem">
	<table class="dataTable mod-stickyHeader">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
				<th class="dataTable-head-row-cell">Head cell</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
				<td class="dataTable-body-row-cell">Body cell</td>
			</tr>
		</tbody>
	</table>
</div>`;
}

const Template: StoryFn<StickyHeaderStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const StickyHeader = Template.bind({});
StickyHeader.args = {};
