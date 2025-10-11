import { booleanAttribute, Component, contentChildren, forwardRef, input, signal, ViewEncapsulation } from '@angular/core';

import { DataTableRowCellHeaderComponent } from '../data-table-cell-header/data-table-cell-header.component';
import { LU_DATA_TABLE_HEAD_INSTANCE } from './data-table-head.token';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'thead[luDataTableHead]',
	standalone: true,
	template: '<ng-content />',
	styleUrl: './data-table-head.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dataTable-head',
		'[class.mod-sticky]': 'sticky()',
		'[class.is-firstBodyRowVisible]': 'isFirstVisible()',
	},
	providers: [
		{
			provide: LU_DATA_TABLE_HEAD_INSTANCE,
			useExisting: forwardRef(() => DataTableHeadComponent),
		},
	],
})
export class DataTableHeadComponent {
	sticky = input(false, { transform: booleanAttribute });
	isFirstVisible = signal(false);

	cols = contentChildren(DataTableRowCellHeaderComponent, { descendants: true });
}
