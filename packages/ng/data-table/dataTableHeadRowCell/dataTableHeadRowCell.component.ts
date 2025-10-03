import { booleanAttribute, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'th[luDataTableHeadRowCell], td[luDataTableHeadRowCell]',
	standalone: true,
	templateUrl: './dataTableHeadRowCell.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dataTable-head-row-cell',
		'[class.mod-stickyColumn]': 'sticky()',
	},
})
export class DataTableHeadRowCellComponent {
	sticky = input(false, { transform: booleanAttribute });
}
