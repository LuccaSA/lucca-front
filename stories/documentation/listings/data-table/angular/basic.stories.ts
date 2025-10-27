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
		verticalAlign: {
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
		selectedLabel: {
			if: { arg: 'selectable', truthy: true },
		},
		selectedLabelHead: {
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
		cols: {
			control: { type: 'range', min: 2, max: 6 },
		},
		lines: {
			control: { type: 'range', min: 2, max: 6 },
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
		const {
			cols,
			actions,
			editable,
			verticalAlign,
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
			lines,
			nested,
			selectedLabel,
			selectedLabelHead,
			...inputArgs
		} = args;

		const text = 'cell';
		const textHeader = 'header';
		const layoutFixedAttr = layoutFixed ? ` layoutFixed` : ``;
		const hoverAttr = hover ? ` hover` : ``;
		const cellBorderAttr = cellBorder ? ` cellBorder` : ``;
		const sortAttr = sort ? ` sort="${sort}"` : ``;
		const fixedWithAttr = fixedWidth && fixedWidthValue !== '' ? ` fixedWidth="${fixedWidthValue}"` : ``;
		const selectableAttr = selectable ? ` selectable` : ``;
		const selectedAttr = selected ? ` [selected]="true"` : ``;
		const selectableLabelAttr = selectable ? ` selectedLabel="${selectedLabel}"` : ``;
		const selectableLabelHeadAttr = selectable ? ` selectedLabel="${selectedLabelHead}"` : ``;
		const disabledAttr = disabled ? ` disabled` : ``;
		const stickyHeaderAttr = stickyHeader ? ` sticky` : ``;
		const groupAttr = group ? ` groupButtonAlt="${groupButtonAlt}" group="${groupLabel}"` : ``;
		const expandedAttr = expanded ? ` [expanded]="true"` : ``;
		const alignAttr = align ? ` align="${align}"` : ``;
		const verticalAlignAttr = verticalAlign ? ` verticalAlign="${verticalAlign}"` : ``;
		const editableAttr = editable ? ` editable` : ``;
		const actionsAttr = actions ? ` actions` : ``;
		const nestedAttr = nested ? ` nested` : ``;
		const verticalAlignContent = verticalAlign ? `<br />${textHeader}` : ``;
		let colsContent = ``;
		let colsHeaderContent = ``;
		let linesContent = ``;
		const col = `
			<td luDataTableCell>${text}</td>`;
		const header = `
			<th luDataTableCell>${textHeader}</th>`;
		for (let i = 1; i <= cols - 2; i++) {
			colsContent = colsContent + col;
		}
		for (let i = 1; i <= cols - 2; i++) {
			colsHeaderContent = colsHeaderContent + header;
		}
		const line = `
		<tr luDataTableRow${selectableLabelAttr}>
			<th luDataTableCell>${textHeader}</th>${colsContent}
			<td luDataTableCell${alignAttr}>${text}</td>
		</tr>`;
		for (let i = 1; i <= lines - 2; i++) {
			linesContent = linesContent + line;
		}

		const actionsContent = actions
			? `
				<button type="button" luButton>
					<lu-icon icon="officePen" alt="Edit" />
				</button>
				<button type="button" luButton>
					<lu-icon icon="trashDelete" alt="Delete" />
				</button>
			`
			: text;
		const editableContent = editable
			? `
				<lu-form-field label="Label" hiddenLabel>
					<lu-text-input type="text" [(ngModel)]="example" />
				</lu-form-field>
			`
			: text;
		const tfootTpl = tfoot
			? `
	<tfoot luDataTableFoot>
		<tr luDataTableRow${selectableLabelAttr}>
			<th luDataTableCell>${textHeader}</th>${colsContent}
			<td luDataTableCell${alignAttr}>${text}</td>
		</tr>
	</tfoot>`
			: ``;

		return {
			styles: stickyHeader ? [`lu-data-table { max-block-size: 7.5rem }`] : [``],
			props: { example: text },
			template: `<lu-data-table${layoutFixedAttr}${hoverAttr}${cellBorderAttr}${selectableAttr}${verticalAlignAttr}${nestedAttr}>
	<thead luDataTableHead${stickyHeaderAttr}>
		<tr luDataTableRow${selectableLabelHeadAttr}>
			<th luDataTableCell>${textHeader}</th>${colsHeaderContent}
			<th luDataTableCell${fixedWithAttr}${sortAttr}${alignAttr}>${textHeader}</th>
		</tr>
	</thead>
	<tbody luDataTableBody${groupAttr}${expandedAttr}>${linesContent}
		<tr luDataTableRow${selectableLabelAttr}>
			<th luDataTableCell>${textHeader}${verticalAlignContent}</th>${colsContent}
			<td luDataTableCell${alignAttr}${actionsAttr}>${actionsContent}</td>
		</tr>
		<tr luDataTableRow${selectableLabelAttr}${selectedAttr}${disabledAttr}>
			<th luDataTableCell>${textHeader}</th>${colsContent}
			<td luDataTableCell${alignAttr}${editableAttr}>${editableContent}</td>
		</tr>
	</tbody>${tfootTpl}
	<ng-container dataTablePagination>test</ng-container>
</lu-data-table>`,
		};
	},
} as Meta;

export const Basic: StoryObj = {
	args: {
		cols: 2,
		lines: 2,
		tfoot: false,
		align: undefined,
		verticalAlign: undefined,
		sort: undefined,
		stickyHeader: false,
		hover: false,
		cellBorder: false,
		layoutFixed: false,
		fixedWidth: false,
		fixedWidthValue: '6rem',
		selectable: false,
		selected: false,
		disabled: false,
		selectedLabel: 'Sélectionner cette ligne',
		selectedLabelHead: 'Sélectionner toutes les lignes',
		group: false,
		groupLabel: 'Group',
		groupButtonAlt: 'Afficher X lignes supplémentaires',
		expanded: false,
		editable: false,
		actions: false,
		nested: false,
	},
};
