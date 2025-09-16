import { Component, inject, input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { LU_GRID_INSTANCE } from '../grid.token';

@Component({
	selector: 'lu-grid-column',
	standalone: true,
	templateUrl: './grid-column.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'grid-column',
		'[style.--grid-colspan]': 'colspan()',
		'[style.--grid-rowspan]': 'rowspan()',
		'[style.--grid-column]': 'col()',
		'[style.--grid-row]': 'row()',
		'[style.--grid-align]': 'align()',
		'[style.--grid-justify]': 'justify()',
	},
})
export class GridColumnComponent {
	protected gridRef = inject(LU_GRID_INSTANCE);

	colspan = input(null, { transform: numberAttribute });
	rowspan = input(null, { transform: numberAttribute });
	col = input(null, { transform: numberAttribute });
	row = input(null, { transform: numberAttribute });
	align = input<'start' | 'center' | 'end' | 'auto' | null>(null);
	justify = input<'start' | 'center' | 'end' | 'auto' | null>(null);
}
