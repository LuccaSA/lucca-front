import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'th[luDataTableBodyRowCell], td[luDataTableBodyRowCell]',
	standalone: true,
	templateUrl: './dataTableBodyRowCell.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dataTable-body-row-cell',
	},
})
export class DataTableBodyRowCellComponent {}
