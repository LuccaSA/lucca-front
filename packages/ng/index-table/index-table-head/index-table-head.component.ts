import { Component, contentChildren, forwardRef, inject, ViewEncapsulation } from '@angular/core';

import { IndexTableRowCellHeaderComponent } from '../index-table-cell-header/index-table-cell-header.component';
import { LU_INDEX_TABLE_INSTANCE } from '../index-table.token';
import { LU_INDEX_TABLE_HEAD_INSTANCE } from './index-table-head.token';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'thead[luIndexTableHead]',
	standalone: true,
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'indexTable-head',
		'[attr.inert]': 'tableRef.empty() ? "inert" : null',
	},
	providers: [
		{
			provide: LU_INDEX_TABLE_HEAD_INSTANCE,
			useExisting: forwardRef(() => IndexTableHeadComponent),
		},
	],
})
export class IndexTableHeadComponent {
	cols = contentChildren(IndexTableRowCellHeaderComponent, { descendants: true });

	tableRef = inject(LU_INDEX_TABLE_INSTANCE);
}
