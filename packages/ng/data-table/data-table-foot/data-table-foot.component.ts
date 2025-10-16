import { Component, forwardRef, ViewEncapsulation } from '@angular/core';
import { LU_DATA_TABLE_FOOT_INSTANCE } from './data-table-foot.token';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'tfoot[luDataTableFoot]',
	standalone: true,
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dataTable-foot',
	},
	providers: [
		{
			provide: LU_DATA_TABLE_FOOT_INSTANCE,
			useExisting: forwardRef(() => DataTableFootComponent),
		},
	],
})
export class DataTableFootComponent {}
