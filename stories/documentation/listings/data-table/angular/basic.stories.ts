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
		align: {
			options: ['', 'start', 'center', 'end'],
			control: {
				type: 'select',
			},
		},
		valign: {
			options: ['', 'top', 'middle', 'bottom'],
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
		groupLabel: {
			if: { arg: 'group', truthy: true },
		},
		groupButtonAlt: {
			if: { arg: 'group', truthy: true },
		},
		expanded: {
			if: { arg: 'group', truthy: true },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [DataTableComponent, DataTableHeadComponent, DataTableBodyComponent, DataTableFootComponent, DataTableRowComponent, DataTableRowCellComponent, DataTableRowCellHeaderComponent],
		}),
	],

	render: (args, { argTypes }) => {
		const {
			editable,
			valign,
			align,
			stickyHeader,
			group,
			groupLabel,
			expanded,
			groupButtonAlt,
			tfoot,
			selected,
			disabled,
			layoutFixed,
			hover,
			sort,
			cellBorder,
			fixedWidth,
			fixedWidthValue,
			selectable,
			...inputArgs
		} = args;

		const layoutFixedAttr = layoutFixed ? ` layoutFixed` : ``;
		const hoverAttr = hover ? ` hover` : ``;
		const cellBorderAttr = cellBorder ? ` cellBorder` : ``;
		const sortAttr = sort ? ` sort="${sort}"` : ``;
		const fixedWithAttr = fixedWidth && fixedWidthValue !== '' ? ` fixedWidth="${fixedWidthValue}"` : ``;
		const selectableAttr = selectable ? ` selectable` : ``;
		const selectedAttr = selected ? ` [selected]="true"` : ``;
		const disabledAttr = disabled ? ` disabled` : ``;
		const stickyHeaderAttr = stickyHeader ? ` sticky` : ``;
		const groupAttr = group ? ` groupButtonAlt="${groupButtonAlt}" group="${groupLabel}"` : ``;
		const expandedAttr = expanded ? ` [expanded]="true"` : ``;
		const alignAttr = align ? ` align="${align}"` : ``;
		const valignAttr = valign ? ` valign="${valign}"` : ``;
		const valignContent = valign ? `<br />test` : ``;
		const editableAttr = editable ? ` editable` : ``;
		const editableContent = editable ? `field` : `test`;
		const tfootTpl = tfoot
			? `<tfoot luDataTableFoot>
		<tr luDataTableRow>
			<th luDataTableCell>test</th>
			<td luDataTableCell>test</td>
			<td luDataTableCell${alignAttr}>test</td>
		</tr>
	</tfoot>`
			: ``;

		return {
			styles: stickyHeader ? [`lu-data-table { max-block-size: 7.5rem }`] : [``],
			template: `<lu-data-table${layoutFixedAttr}${hoverAttr}${cellBorderAttr}${selectableAttr}${valignAttr} [responsive]="{ layoutFixedAtMediaMinM: true }">
	<thead luDataTableHead${stickyHeaderAttr}>
		<tr luDataTableRow>
			<th luDataTableCell${fixedWithAttr}>test</th>
			<th luDataTableCell>test</th>
			<th luDataTableCell${sortAttr}${alignAttr}>test</th>
		</tr>
	</thead>
	<tbody luDataTableBody${groupAttr}${expandedAttr}>
		<tr luDataTableRow>
			<th luDataTableCell>test</th>
			<td luDataTableCell>test${valignContent}</td>
			<td luDataTableCell${alignAttr}>test${valignContent}</td>
		</tr>
		<tr luDataTableRow>
			<th luDataTableCell>test</th>
			<td luDataTableCell${editableAttr}>${editableContent}</td>
			<td luDataTableCell${alignAttr}>test</td>
		</tr>
		<tr luDataTableRow${selectedAttr}${disabledAttr}>
			<th luDataTableCell>test</th>
			<td luDataTableCell>test</td>
			<td luDataTableCell${alignAttr}>test</td>
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
		align: undefined,
		valign: undefined,
		sort: undefined,
		stickyHeader: false,
		hover: false,
		cellBorder: false,
		layoutFixed: false,
		fixedWidth: false,
		fixedWidthValue: '3rem',
		selectable: false,
		selected: false,
		disabled: false,
		group: false,
		groupLabel: 'Group',
		groupButtonAlt: 'Afficher 3 lignes supplémentaires',
		expanded: false,
		editable: false,
	},
};
