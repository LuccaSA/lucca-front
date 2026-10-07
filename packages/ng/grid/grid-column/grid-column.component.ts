import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { luNullableNumberAttribute, ResponsiveConfig } from '@lucca-front/ng/core';
import { LU_GRID_INSTANCE } from '../grid.token';
import { GridColumnAlignment, GridColumnResponsive } from './grid-column.type';

@Component({
	selector: 'lu-grid-column, [lu-grid-column]',
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'grid-column',
		'[style]': 'style()',
	},
})
export class GridColumnComponent {
	/**
	 * Number of columns spanned (overrides the grid `colspan`)
	 */
	readonly colspan = input(null, { transform: luNullableNumberAttribute });

	/**
	 * Number of rows spanned (overrides the grid `rowspan`)
	 */
	readonly rowspan = input(null, { transform: luNullableNumberAttribute });

	/**
	 * Start column of the column
	 */
	readonly column = input(null, { transform: luNullableNumberAttribute });

	/**
	 * Start row of the column
	 */
	readonly row = input(null, { transform: luNullableNumberAttribute });

	/**
	 * Vertical alignment of the column content
	 */
	readonly align = input<GridColumnAlignment | null>(null);

	/**
	 * Horizontal alignment of the column content
	 */
	readonly justify = input<GridColumnAlignment | null>(null);

	/**
	 * Responsive values of `row`, `column`, `rowspan` and `colspan`, per media or container breakpoint (e.g. `{ colspanAtMediaMinS: 2 }`)
	 */
	readonly responsive = input<ResponsiveConfig<GridColumnResponsive, number>>({});

	protected gridRef = inject(LU_GRID_INSTANCE);

	readonly style = computed(() => {
		return {
			'--grid-colspan': this.colspan() || this.gridRef.colspan(),
			'--grid-rowspan': this.rowspan() || this.gridRef.rowspan(),
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
