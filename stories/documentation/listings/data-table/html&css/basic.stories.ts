import { Meta, StoryFn } from '@storybook/angular';

interface BasicStory {}

export default {
	title: 'Documentation/Listings/Data table/HTML&CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: BasicStory): string {
	return `<div class="dataTableWrapper">
	<table class="dataTable">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text</td>
			</tr>
		</tbody>
		<tfoot class="dataTable-foot">
			<tr class="dataTable-foot-row">
				<td class="dataTable-foot-row-cell">Text</td>
				<td class="dataTable-foot-row-cell">Text</td>
				<td class="dataTable-foot-row-cell">Text</td>
			</tr>
		</tfoot>
	</table>
</div>`;
}

const Template: StoryFn<BasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
