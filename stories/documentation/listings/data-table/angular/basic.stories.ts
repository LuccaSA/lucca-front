import { DataTableBodyComponent, DataTableComponent, DataTableHeadComponent, DataTableRowCellComponent, DataTableRowCellHeaderComponent, DataTableRowComponent } from '@lucca-front/ng/data-table';
import { DataTableFootComponent } from '@lucca-front/ng/data-table/dataTableFoot';

import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Listings/Data table/Angular/Basic',
	argTypes: {
		sort: {
			options: ['', 'null', 'ascending', 'descending'],
			control: {
				type: 'select',
			},
		},
		fixedWidth: {
			if: { arg: 'layoutFixed', truthy: true },
		},
		selected: {
			if: { arg: 'selectable', truthy: true },
		},
		disabled: {
			if: { arg: 'selectable', truthy: true },
		},
		fixedWidthValue: {
			if: { arg: 'fixedWidth', truthy: true },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [DataTableComponent, DataTableHeadComponent, DataTableBodyComponent, DataTableFootComponent, DataTableRowComponent, DataTableRowCellComponent, DataTableRowCellHeaderComponent],
		}),
	],

	render: (args, { argTypes }) => {
		const { stickyHeader, tfoot, selected, disabled, layoutFixed, hover, sort, cellBorder, fixedWidth, fixedWidthValue, selectable, ...inputArgs } = args;

		const layoutFixedAttr = layoutFixed ? ` layoutFixed` : ``;
		const hoverAttr = hover ? ` hover` : ``;
		const cellBorderAttr = cellBorder ? ` cellBorder` : ``;
		const sortAttr = sort ? ` sort="${sort}"` : ``;
		const fixedWithAttr = fixedWidth && fixedWidthValue !== '' ? ` fixedWidth="${fixedWidthValue}"` : ``;
		const selectableAttr = selectable ? ` selectable` : ``;
		const selectedAttr = selected ? ` [selected]="true"` : ``;
		const disabledAttr = disabled ? ` disabled` : ``;
		const stickyHeaderAttr = stickyHeader ? ` sticky` : ``;
		const tfootTpl = tfoot
			? `<tfoot luDataTableFoot>
		<tr luDataTableRow>
			<th luDataTableCell>test</th>
			<td luDataTableCell>test</td>
			<td luDataTableCell>test</td>
		</tr>
	</tfoot>`
			: ``;

		return {
			template: `<lu-data-table${layoutFixedAttr}${hoverAttr}${cellBorderAttr}${selectableAttr}>
	<thead luDataTableHead${stickyHeaderAttr}>
		<tr luDataTableRow>
			<th luDataTableCell${fixedWithAttr}>test</th>
			<th luDataTableCell>test</th>
			<th luDataTableCell${sortAttr}>test</th>
		</tr>
	</thead>
	<tbody luDataTableBody>
		<tr luDataTableRow>
			<th luDataTableCell>test</th>
			<td luDataTableCell>test</td>
			<td luDataTableCell>test</td>
		</tr>
		<tr luDataTableRow${selectedAttr}${disabledAttr}>
			<th luDataTableCell>test</th>
			<td luDataTableCell>test</td>
			<td luDataTableCell>test</td>
		</tr>
	</tbody>
	${tfootTpl}
</lu-data-table>`,
		};
	},
} as Meta;

export const Basic: StoryObj = {
	args: {
		tfoot: false,
		stickyHeader: false,
		sort: undefined,
		hover: false,
		cellBorder: false,
		layoutFixed: false,
		fixedWidth: false,
		fixedWidthValue: '3rem',
		selectable: false,
		selected: false,
		disabled: false,
	},
};
