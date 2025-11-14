import { booleanAttribute, Component, computed, forwardRef, input, ViewEncapsulation } from '@angular/core';

import { BaseIndexTableCell } from '../base-index-table-cell';
import { LU_INDEX_TABLE_CELL_INSTANCE } from '../index-table-cell.token';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'td[luIndexTableCell]',
	standalone: true,
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	host: {
		'[class.indexTable-body-row-cell]': 'bodyRef !== null',
		'[class.indexTable-head-row-cell]': 'headRef !== null',
		'[class.indexTable-foot-row-cell]': 'footRef !== null',
		'[class.mod-alignStart]': 'align() === "start"',
		'[class.mod-alignCenter]': 'align() === "center"',
		'[class.mod-alignEnd]': 'align() === "end"',
		'[class.mod-actions]': 'actions()',
		'[class.mod-allowTextSelection]': 'allowTextSelection()',
		'[class.mod-tfoot]': 'tfoot()',
	},
	providers: [
		{
			provide: LU_INDEX_TABLE_CELL_INSTANCE,
			useExisting: forwardRef(() => IndexTableRowCellComponent),
		},
	],
})
export class IndexTableRowCellComponent extends BaseIndexTableCell {
	allowTextSelection = input(false, { transform: booleanAttribute });
	tfoot = input(false, { transform: booleanAttribute });

	actions = computed(() => {
		return this.tableRef.header().cols()[this.position()].actions();
	});
}
