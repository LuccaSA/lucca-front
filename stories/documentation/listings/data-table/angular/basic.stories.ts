import { DataTableBodyComponent, DataTableComponent, DataTableHeadComponent, DataTableRowComponent } from '@lucca-front/ng/dataTable';
import { DataTableBodyRowCellComponent } from '@lucca-front/ng/dataTable/dataTableBodyRowCell';
import { DataTableFootComponent } from '@lucca-front/ng/dataTable/dataTableFoot';

import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Listings/Data table/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [
				DataTableComponent,
				DataTableHeadComponent,
				// DataTableHeadRowCellComponent,
				DataTableBodyComponent,
				DataTableBodyRowCellComponent,
				DataTableFootComponent,
				// DataTableFootRowCellComponent,
				DataTableRowComponent,
			],
		}),
	],

	render: (args) => {
		const { ...inputs } = args;

		return {
			template: `<lu-data-table hover selectable>
	<thead luDataTableHead sticky>
		<tr luDataTableRow>
			<th luDataTableBodyRowCell>test</th>
			<th luDataTableBodyRowCell>test</th>
			<th luDataTableBodyRowCell>test</th>
		</tr>
	</thead>
	<tbody luDataTableBody>
		<tr luDataTableRow>
			<td luDataTableBodyRowCell>test</td>
			<td luDataTableBodyRowCell>test</td>
			<td luDataTableBodyRowCell>test</td>
		</tr>
		<tr luDataTableRow [selected]="true">
			<td luDataTableBodyRowCell>test</td>
			<td luDataTableBodyRowCell>test</td>
			<td luDataTableBodyRowCell>test</td>
		</tr>
		<tr luDataTableRow disabled [selected]="true">
			<td luDataTableBodyRowCell>test</td>
			<td luDataTableBodyRowCell>test</td>
			<td luDataTableBodyRowCell>test</td>
		</tr>
		<tr luDataTableRow>
			<td luDataTableBodyRowCell>test</td>
			<td luDataTableBodyRowCell>test</td>
			<td luDataTableBodyRowCell>test</td>
		</tr>
	</tbody>
	<tfoot luDataTableFoot sticky>
		<tr luDataTableRow>
			<td luDataTableBodyRowCell>test</td>
			<td luDataTableBodyRowCell>test</td>
			<td luDataTableBodyRowCell>test</td>
		</tr>
	</tfoot>
</lu-data-table>`,
		};
	},
	argTypes: {},
} as Meta;

export const Basic: StoryObj = {
	args: {},
};
