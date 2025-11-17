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

import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Listings/Data table/Angular/Overflow',
	argTypes: {
		cols: {
			control: { type: 'range', min: 2, max: 8 },
		},
		lines: {
			control: { type: 'range', min: 2, max: 8 },
		},
		stickyColsStart: {
			control: { type: 'range', min: 0, max: 4 },
		},
		stickyColsEnd: {
			control: { type: 'range', min: 0, max: 4 },
		},
	},
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
			],
		}),
	],

	render: (args, { argTypes }) => {
		const { cols, stickyHeader, lines, stickyColsStart, stickyColsEnd, ...inputArgs } = args;

		const text = 'cell';
		const textHeader = 'header';

		const stickyHeaderAttr = stickyHeader ? ` sticky` : ``;

		const stickyColsStartAttr = stickyColsStart > 0 ? ` stickyColsStart="${stickyColsStart}"` : ``;
		const stickyColsEndAttr = stickyColsEnd > 0 ? ` stickyColsEnd="${stickyColsEnd}"` : ``;

		let colsContent = `<td luDataTableCell>${text}</td>`;
		let colsHeaderContent = `
			<th luDataTableCell>${textHeader}</th>`;
		let linesContent = ``;
		const col = `
			<td luDataTableCell>${text}</td>`;
		const header = `
			<th luDataTableCell>${textHeader}</th>`;
		for (let i = 1; i <= cols - 3; i++) {
			colsContent = colsContent + col;
		}
		for (let i = 1; i <= cols - 3; i++) {
			colsHeaderContent = colsHeaderContent + header;
		}
		const line = `
		<tr luDataTableRow>
			<th luDataTableCell>${textHeader}</th>${colsContent}
			<td luDataTableCell>${text}</td>
		</tr>`;
		for (let i = 1; i <= lines; i++) {
			linesContent = linesContent + line;
		}

		return {
			styles: [`lu-data-table { max-block-size: 15rem; max-inline-size: 30rem; inline-size: fit-content; }`],
			props: { example: text },
			template: `<lu-data-table${stickyColsStartAttr}${stickyColsEndAttr}>
	<thead luDataTableHead${stickyHeaderAttr}>
		<tr luDataTableRow>
			<th luDataTableCell>${textHeader}</th>${colsHeaderContent}
			<th luDataTableCell>${textHeader}</th>
		</tr>
	</thead>
	<tbody luDataTableBody>${linesContent}
	</tbody>
</lu-data-table>`,
		};
	},
} as Meta;

export const Basic: StoryObj = {
	args: {
		cols: 8,
		lines: 2,
		stickyColsStart: 0,
		stickyColsEnd: 0,
		stickyHeader: true,
	},
};
