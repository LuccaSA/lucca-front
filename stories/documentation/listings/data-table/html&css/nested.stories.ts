import { Meta, StoryFn } from '@storybook/angular';

interface NestedStory {}

export default {
	title: 'Documentation/Listings/Data table/HTML&CSS/Nested',
	argTypes: {},
} as Meta;

function getTemplate(args: NestedStory): string {
	return `<div class="dataTableWrapper mod-nested">
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
				<th class="dataTable-foot-row-cell">Text</th>
				<th class="dataTable-foot-row-cell">Text</th>
				<th class="dataTable-foot-row-cell">Text</th>
			</tr>
		</tfoot>
	</table>
</div>`;
}

const Template: StoryFn<NestedStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Nested = Template.bind({});
Nested.args = {};
