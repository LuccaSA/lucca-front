import { Component, inject, ViewEncapsulation } from '@angular/core';
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
	},
})
export class DataTableRowCellComponent {
	bodyRef = inject(LU_DATA_TABLE_BODY_INSTANCE, { optional: true });
	headRef = inject(LU_DATA_TABLE_HEAD_INSTANCE, { optional: true });
	footRef = inject(LU_DATA_TABLE_FOOT_INSTANCE, { optional: true });
}
