import { Meta, StoryObj } from '@storybook/angular-vite';

interface NoValueTableCellStory {}

export default {
	title: 'Documentation/Texts/NoValue/HTML&CSS/TableCell',
	argTypes: {},
} as Meta;

export const TableCell: StoryObj<NoValueTableCellStory> = {
	args: {},
	render: () => ({
		template: `<table class="indexTable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Lorem ipsum</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell"><span aria-hidden="true" data-content-before="—"></span></td>
		</tr>
	</tbody>
</table>`,
	}),
};
