import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import {
	DataTableBodyComponent,
	DataTableComponent,
	DataTableFootComponent,
	DataTableHeadComponent,
	DataTableRowCellComponent,
	DataTableRowCellHeaderComponent,
	DataTableRowComponent,
} from '@lucca-front/ng/data-table';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { PaginationComponent } from '@lucca-front/ng/pagination';

import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
	selector: 'tr-component',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [DataTableRowComponent, DataTableRowCellComponent, DataTableRowCellHeaderComponent],
	styles: [':host {display: contents}'],
	template: `<tr luDataTableRow>
		<th luDataTableCell>header</th>
		<td luDataTableCell>cell</td>
		<td luDataTableCell>cell</td>
		<td luDataTableCell>cell</td>
		<td luDataTableCell>cell</td>
		<td luDataTableCell>cell</td>
		<td luDataTableCell>cell</td>
		<td luDataTableCell>cell</td>
	</tr>`,
})
export class TrComponent {}

export default {
	title: 'Documentation/Listings/Data table/Angular/Inject',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [
				DataTableComponent,
				DataTableHeadComponent,
				DataTableBodyComponent,
				DataTableFootComponent,
				DataTableRowComponent,
				DataTableRowCellComponent,
				DataTableRowCellHeaderComponent,
				FormFieldComponent,
				TextInputComponent,
				FormsModule,
				ButtonComponent,
				IconComponent,
				PaginationComponent,
				TrComponent,
			],
		}),
	],

	render: (args, { argTypes }) => {
		return {
			styles: [`lu-data-table { max-block-size: 15rem; max-inline-size: 30rem; inline-size: fit-content }`],
			template: `<lu-data-table>
	<thead luDataTableHead>
		<tr luDataTableRow>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
			<th luDataTableCell>header</th>
		</tr>
	</thead>
	<tbody luDataTableBody>
		<tr luDataTableRow>
			<th luDataTableCell>header</th>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
			<td luDataTableCell>cell</td>
		</tr>
		<tr-component />
	</tbody>
</lu-data-table>`,
		};
	},
} as Meta;

export const Basic: StoryObj = {
	args: {},
};
