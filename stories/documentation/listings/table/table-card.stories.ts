import { Meta, Story } from '@storybook/angular';

interface TableCardStory {
	palette: string;
}

export default {
	title: 'Documentation/Listings/Table/Card',
	argTypes: {
	},
} as Meta;

function getTemplate(args: TableCardStory): string {
	return `
	<div class="card">
		<table class="table mod-card">
			<thead class="table-head">
				<tr class="table-head-row">
					<th class="table-head-row-cell">Table head</th>
					<th class="table-head-row-cell">Table head</th>
				</tr>
			</thead>
			<tbody class="table-body">
				<tr class="table-body-row">
					<td class="table-body-row-cell">Table cell</td>
					<td class="table-body-row-cell">Table cell</td>
				</tr>
				<tr class="table-body-row">
					<td class="table-body-row-cell">Table cell</td>
					<td class="table-body-row-cell">Table cell</td>
				</tr>
				<tr class="table-body-row">
					<td class="table-body-row-cell">Table cell</td>
					<td class="table-body-row-cell">Table cell</td>
				</tr>
			</tbody>
		</table>
	</div>
	`
}

const Template: Story<TableCardStory> = (args: TableCardStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Card = Template.bind({});
Card.args = {};
