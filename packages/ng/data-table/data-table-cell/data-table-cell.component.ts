import { booleanAttribute, Component, computed, forwardRef, inject, input, numberAttribute, ViewEncapsulation } from '@angular/core';

import { LU_DATA_TABLE_CELL_INSTANCE } from '../data-table-cell.token';
import { BaseDataTableCell } from '../base-data-table-cell';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'td[luDataTableCell]',
	standalone: true,
	templateUrl: './data-table-cell.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		'[class.dataTable-body-row-cell]': 'bodyRef !== null',
		'[class.dataTable-head-row-cell]': 'headRef !== null',
		'[class.dataTable-foot-row-cell]': 'footRef !== null',
		'[class.mod-alignStart]': 'align() === "start"',
		'[class.mod-alignCenter]': 'align() === "center"',
		'[class.mod-alignEnd]': 'align() === "end"',
		'[class.mod-editable]': 'editable()',
		'[class.mod-actions]': 'actions()',
		'[class.mod-stickyColumn]': 'isSticky()',
		'[style.insetInlineStart]': 'insetInlineStart()',
		'[style.insetInlineEnd]': 'insetInlineEnd()',
	},
	providers: [
		{
			provide: LU_DATA_TABLE_CELL_INSTANCE,
			useExisting: forwardRef(() => DataTableRowCellComponent),
		},
	],
})
export class DataTableRowCellComponent extends BaseDataTableCell {
	actions = input(false, { transform: booleanAttribute });

	isSticky = computed(() => {
		return this.isStickyStart() || this.isStickyEnd();
	});

	insetInlineStart = computed(() => {
		return this.tableRef.header().cols()[this.position()].insetInlineStart();
	});

	insetInlineEnd = computed(() => {
		return this.tableRef.header().cols()[this.position()].insetInlineEnd();
	});
}
