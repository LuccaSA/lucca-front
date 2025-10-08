import { booleanAttribute, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { LU_DATA_TABLE_BODY_INSTANCE } from '../dataTableBody/dataTableBody.token';
import { LU_DATA_TABLE_FOOT_INSTANCE } from '../dataTableFoot/dataTableFoot.token';
import { LU_DATA_TABLE_HEAD_INSTANCE } from '../dataTableHead/dataTableHead.token';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'td[luDataTableCell]',
	standalone: true,
	templateUrl: './dataTableCell.component.html',
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
	},
})
export class DataTableRowCellComponent {
	bodyRef = inject(LU_DATA_TABLE_BODY_INSTANCE, { optional: true });
	headRef = inject(LU_DATA_TABLE_HEAD_INSTANCE, { optional: true });
	footRef = inject(LU_DATA_TABLE_FOOT_INSTANCE, { optional: true });

	align = input<null | 'start' | 'center' | 'end'>(null);
	editable = input(false, { transform: booleanAttribute });
	actions = input(false, { transform: booleanAttribute });
}
