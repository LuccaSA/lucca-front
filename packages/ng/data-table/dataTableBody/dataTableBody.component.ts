import { Component, forwardRef, ViewEncapsulation } from '@angular/core';
import { LU_DATA_TABLE_BODY_INSTANCE } from './dataTableBody.token';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'tbody[luDataTableBody]',
	standalone: true,
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dataTable-body',
	},
	providers: [
		{
			provide: LU_DATA_TABLE_BODY_INSTANCE,
			useExisting: forwardRef(() => DataTableBodyComponent),
		},
	],
})
export class DataTableBodyComponent {}
