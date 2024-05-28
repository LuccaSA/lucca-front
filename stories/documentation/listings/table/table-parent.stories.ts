import { Meta, StoryFn } from '@storybook/angular';

interface TableParentStory {
}

export default {
	title: 'Documentation/Listings/Table/Parent',
	argTypes: {
	},
} as Meta;

function getTemplate(args: TableParentStory): string {
	return `
	<table class="table">
		<thead class="table-head">
			<tr class="table-head-row">
				<th class="table-head-row-cell">Label</th>
				<th class="table-head-row-cell">Label</th>
				<th class="table-head-row-cell">Label</th>
			</tr>
		</thead>
		<tbody class="table-body">
			<tr class="table-body-row mod-parent">
				<td class="table-body-row-cell" colspan="3">Contenu</td>
			</tr>
			<tr class="table-body-row mod-child">
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
			</tr>
			<tr class="table-body-row mod-child">
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
			</tr>
		</tbody>
		<tbody class="table-body">
			<tr class="table-body-row mod-parent mod-collapsable">
				<td class="table-body-row-cell" colspan="3">Contenu</td>
			</tr>
			<tr class="table-body-row mod-child">
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
			</tr>
			<tr class="table-body-row mod-child">
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
			</tr>
		</tbody>
		<tbody class="table-body">
			<tr class="table-body-row mod-parent mod-collapsable is-collapsed">
				<td class="table-body-row-cell" colspan="3">Contenu</td>
			</tr>
			<tr class="table-body-row mod-child">
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
			</tr>
			<tr class="table-body-row mod-child">
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
			</tr>
		</tbody>
	</table>
	`;
}

const Template: StoryFn<TableParentStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Parent = Template.bind({});
Parent.args = { };
