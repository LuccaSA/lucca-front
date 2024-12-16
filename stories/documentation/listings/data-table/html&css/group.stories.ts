import { Meta, StoryFn } from '@storybook/angular';

interface GroupStory {}

export default {
	title: 'Documentation/Listings/Data table/HTML&CSS/Group',
	argTypes: {},
} as Meta;

function getTemplate(args: GroupStory): string {
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
			<tr class="dataTable-body-row mod-group">
				<td class="dataTable-body-row-cell" colspan="3">
					<button type="button" class="button dataTable-body-row-cell-expand" aria-expanded="false">
						<span aria-hidden="true" class="lucca-icon icon-arrowChevronTop"></span
						><span class="u-mask">Afficher 2 lignes supplémentaires</span>
					</button>
					<span class="dataTable-body-row-cell-groupLabel">Text</span>
					<span class="numericBadge">7</span>
				</td>
			</tr>
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
		<tbody class="dataTable-body">
			<tr class="dataTable-body-row mod-group">
				<td class="dataTable-body-row-cell" colspan="3">
					<button type="button" class="button dataTable-body-row-cell-expand" aria-expanded="false">
						<span aria-hidden="true" class="lucca-icon icon-arrowChevronTop"></span
						><span class="u-mask">Afficher 2 lignes supplémentaire</span>
					</button>
					<span class="dataTable-body-row-cell-groupLabel">Text</span>
					<span class="numericBadge">7</span>
				</td>
			</tr>
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
	</table>
</div>`;
}

const Template: StoryFn<GroupStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Group = Template.bind({});
Group.args = {};
