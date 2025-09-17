import { Component, computed, inject, input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { LU_GRID_INSTANCE } from '../grid.token';

type Property = 'row' | 'col' | 'rowspan' | 'colspan';
type At = 'media' | 'container';
type Breakpoint = 'XXXS' | 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';

type ResponsiveOptionKey = `${Property}At${Capitalize<At>}Min${Breakpoint}`;
type ResponsiveConfig = Partial<Record<ResponsiveOptionKey, number>>;

@Component({
	selector: 'lu-grid-column',
	standalone: true,
	templateUrl: './grid-column.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'grid-column',
		'[style]': 'style()',
	},
})
export class GridColumnComponent {
	protected gridRef = inject(LU_GRID_INSTANCE);

	colspan = input(null, { transform: numberAttribute });
	rowspan = input(null, { transform: numberAttribute });
	column = input(null, { transform: numberAttribute });
	row = input(null, { transform: numberAttribute });
	align = input<'start' | 'center' | 'end' | 'auto' | null>(null);
	justify = input<'start' | 'center' | 'end' | 'auto' | null>(null);

	responsive = input<ResponsiveConfig>({});

	style = computed(() => {
		return {
			'--grid-colspan': this.colspan(),
			'--grid-rowspan': this.rowspan(),
			'--grid-column': this.column(),
			'--grid-row': this.row(),
			'--grid-align': this.align(),
			'--grid-justify': this.justify(),
			...Object.entries(this.responsive()).reduce((acc, [key, value]) => {
				return {
					...acc,
					[`--grid-${key}`]: value,
				};
			}, {}),
		};
	});
}
