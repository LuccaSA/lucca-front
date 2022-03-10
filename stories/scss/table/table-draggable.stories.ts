import { Meta, Story } from '@storybook/angular';

interface TableDraggableStory {
}

export default {
	title: 'SCSS/Table/Draggable',
	argTypes: {
	},
} as Meta;

function getTemplate(args: TableDraggableStory): string {
	const classes = [].filter(Boolean).join(' ');
	return `
	<table class="table">
		<thead class="table-head">
			<tr class="table-head-row mod-draggable">
				<th class="table-head-row-cell">Label</th>
				<th class="table-head-row-cell">Label</th>
				<th class="table-head-row-cell">Label</th>
			</tr>
		</thead>
		<tbody class="table-body">
			<tr class="table-body-row mod-draggable">
				<td class="table-body-row-cell">
					<div class="table-body-row-cell-handler"></div>
					Contenu
				</td>
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
			</tr>
			<tr class="table-body-row mod-draggable">
				<td class="table-body-row-cell">
					<div class="table-body-row-cell-handler"></div>
					Contenu
				</td>
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
			</tr>
			<tr class="table-body-row mod-draggable">
				<td class="table-body-row-cell">
					<div class="table-body-row-cell-handler"></div>
					Contenu
				</td>
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
			</tr>
		</tbody>
	</table>
	`
}

const Template: Story<TableDraggableStory> = (args: TableDraggableStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Draggable = Template.bind({});
Draggable.args = {};
