import { booleanAttribute, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'th[luDataTableFootRowCell], td[luDataTableFootRowCell]',
	standalone: true,
	templateUrl: './dataTableFootRowCell.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dataTable-foot-row-cell',
		'[class.mod-stickyColumn]': 'sticky()',
	},
})
export class DataTableFootRowCellComponent {
	sticky = input(false, { transform: booleanAttribute });
}
