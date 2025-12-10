import { Meta, StoryObj } from '@storybook/angular';

interface AlignementHorizontalStory {}

export default {
	title: 'Documentation/Listings/Data table/HTML&CSS/Horizontal alignement',
	argTypes: {},
} as Meta;

function getTemplate(args: AlignementHorizontalStory): string {
	return `<div class="dataTableWrapper">
	<table class="dataTable">
		<thead class="dataTable-head">
			<tr class="dataTable-head-row">
				<th class="dataTable-head-row-cell">Label</th>
				<th class="dataTable-head-row-cell mod-alignCenter">Label</th>
				<th class="dataTable-head-row-cell mod-alignRight">Label</th>
			</tr>
		</thead>
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell mod-alignCenter">Text</td>
				<td class="dataTable-body-row-cell mod-alignRight">Text</td>
			</tr>
			<tr class="dataTable-body-row">
				<td class="dataTable-body-row-cell">Text</td>
				<td class="dataTable-body-row-cell mod-alignCenter">Text</td>
				<td class="dataTable-body-row-cell mod-alignRight">Text</td>
			</tr>
		</tbody>
	</table>
</div>`;
}

const Template = (args: AlignementHorizontalStory) => ({
	props: args,
	template: getTemplate(args),
});

export const AlignementHorizontal: StoryObj<AlignementHorizontalStory> = {
	args: {},
	render: Template,
};
