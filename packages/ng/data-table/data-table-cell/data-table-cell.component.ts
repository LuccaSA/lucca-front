import { booleanAttribute, ChangeDetectionStrategy, Component, computed, forwardRef, input, ViewEncapsulation } from '@angular/core';

import { BaseDataTableCell } from '../base-data-table-cell';
import { LU_DATA_TABLE_CELL_INSTANCE } from '../data-table-cell.token';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'td[luDataTableCell]',
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	host: {
		'[class.dataTable-body-row-cell]': 'bodyRef !== null',
		'[class.dataTable-head-row-cell]': 'headRef !== null',
		'[class.dataTable-foot-row-cell]': 'footRef !== null',
		'[class.mod-alignStart]': 'align() === "start" || alignCol() === "start"',
		'[class.mod-alignCenter]': 'align() === "center" || alignCol() === "center"',
		'[class.mod-alignEnd]': 'align() === "end" || alignCol() === "end"',
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
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableRowCellComponent extends BaseDataTableCell {
	actions = input(false, { transform: booleanAttribute });

	isSticky = computed(() => {
		return this.isStickyStart() || this.isStickyEnd();
	});

	alignCol = computed(() => {
		return this.tableRef?.header().cols()[this.position()].align();
	});

	insetInlineStart = computed(() => {
		return this.tableRef?.header().cols()[this.position()].insetInlineStart();
	});

	insetInlineEnd = computed(() => {
		return this.tableRef?.header().cols()[this.position()].insetInlineEnd();
	});
}
