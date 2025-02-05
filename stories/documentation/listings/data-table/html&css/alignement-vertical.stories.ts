import { Meta, StoryFn } from '@storybook/angular';

interface AlignementVerticalStory {}

export default {
	title: 'Documentation/Listings/Data table/HTML&CSS/Vertical alignement',
	argTypes: {},
} as Meta;

function getTemplate(args: AlignementVerticalStory): string {
	return `<div class="dataTableWrapper">
	<table class="dataTable mod-alignTop">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell">Label</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text<br />Text</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell">Text<br />Text</td>
			</tr>
		</tbody>
	</table>
</div>`;
}

const Template: StoryFn<AlignementVerticalStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const AlignementVertical = Template.bind({});
AlignementVertical.args = {};
