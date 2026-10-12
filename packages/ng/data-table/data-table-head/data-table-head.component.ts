import { ChangeDetectionStrategy, Component, contentChildren, forwardRef, inject, input, signal, ViewEncapsulation } from '@angular/core';

import { luBooleanAttribute } from '@lucca-front/ng/core';
import { DataTableRowCellHeaderComponent } from '../data-table-cell-header/data-table-cell-header.component';
import { LU_DATA_TABLE_INSTANCE } from '../data-table.token';
import { LU_DATA_TABLE_HEAD_INSTANCE } from './data-table-head.token';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'thead[luDataTableHead]',
	template: '<ng-content />',
	styleUrl: './data-table-head.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dataTable-head',
		'[class.mod-sticky]': 'sticky()',
		'[class.is-firstBodyRowVisible]': 'isFirstVisible()',
		'[attr.inert]': 'tableRef.empty() ? "inert" : null',
	},
	providers: [
		{
			provide: LU_DATA_TABLE_HEAD_INSTANCE,
			useExisting: forwardRef(() => DataTableHeadComponent),
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableHeadComponent {
	readonly sticky = input(false, { transform: luBooleanAttribute });
	readonly isFirstVisible = signal(false);

	readonly cols = contentChildren(DataTableRowCellHeaderComponent, { descendants: true });

	tableRef = inject(LU_DATA_TABLE_INSTANCE);
}
