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
	readonly colspan = input(null, { transform: luNullableNumberAttribute });
	readonly rowspan = input(null, { transform: luNullableNumberAttribute });
	readonly column = input(null, { transform: luNullableNumberAttribute });
	readonly row = input(null, { transform: luNullableNumberAttribute });
	readonly align = input<GridColumnAlignment | null>(null);
	readonly justify = input<GridColumnAlignment | null>(null);

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
