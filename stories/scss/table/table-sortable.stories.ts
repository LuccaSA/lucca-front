import { Meta, Story } from '@storybook/angular';

interface TableSortableStory {
	palette: string;
}

export default {
	title: 'SCSS/Table/Sortable',
	argTypes: {
	},
} as Meta;

function getTemplate(args: TableSortableStory): string {
	const classes = [].filter(Boolean).join(' ');
	return `
	<table class="table">
		<thead class="table-head">
			<tr class="table-head-row">
				<th class="table-head-row-cell" aria-sort="descending">
					<button class="table-head-row-cell-sortableButton">Triable</button>
				</th>
				<th class="table-head-row-cell" aria-sort="none">
					<button class="table-head-row-cell-sortableButton">Triable</button>
				</th>
				<th class="table-head-row-cell" >
					Non triable
				</th>
			</tr>
		</thead>
		<tbody class="table-body">
			<tr class="table-body-row">
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
			</tr>
			<tr class="table-body-row">
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
				<td class="table-body-row-cell">Contenu</td>
			</tr>
		</tbody>
	</table>
	`
}

const Template: Story<TableSortableStory> = (args: TableSortableStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Sortable = Template.bind({});
Sortable.args = {};
