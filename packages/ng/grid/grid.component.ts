import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, forwardRef, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute, luNullableNumberAttribute } from '@lucca-front/ng/core';
import { GridMode } from './grid.type';
import { LU_GRID_INSTANCE } from './grid.token';

@Component({
	selector: 'lu-grid, [lu-grid]',
	templateUrl: './grid.component.html',
	styleUrls: ['./grid.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgTemplateOutlet],
	providers: [
		{
			provide: LU_GRID_INSTANCE,
			useExisting: forwardRef(() => GridComponent),
		},
	],
})
export class GridComponent {
	/**
	 * Wraps the grid in a container, so that responsive configurations rely on container queries instead of media queries
	 */
	readonly container = input(false, { transform: luBooleanAttribute });

	/**
	 * Number of columns of the grid (ignored when `mode` is set)
	 */
	readonly columns = input(null, { transform: luNullableNumberAttribute });

	/**
	 * Default number of columns spanned by each column of the grid
	 */
	readonly colspan = input(null, { transform: luNullableNumberAttribute });

	/**
	 * Default number of rows spanned by each column of the grid
	 */
	readonly rowspan = input(null, { transform: luNullableNumberAttribute });

	/**
	 * Layout mode of the grid
	 */
	readonly mode = input<GridMode | null>(null);

	/**
	 * Gap between rows and columns (spacing token or CSS length)
	 */
	readonly gap = input<Gap | null>(null);
	/**
	 * Gap between columns (spacing token or CSS length)
	 */
	readonly columnGap = input<Gap | null>(null);

	/**
	 * Gap between rows (spacing token or CSS length)
	 */
	readonly rowGap = input<Gap | null>(null);

	#gapTransform = (gap: Gap | null): string | null => {
		const spacingRegexp = /.*(\d)$/g;

		if (!gap) {
			return null;
		}
		if (spacingRegexp.test(gap)) {
			return `var(--pr-t-spacings-${gap})`;
		}
		return gap;
	};

	protected readonly gridStyle = computed(() => ({
		'--grid-columns': this.mode() === null ? this.columns() : null,
		'--grid-gap': this.#gapTransform(this.gap()),
		'--grid-column-gap': this.#gapTransform(this.columnGap()),
		'--grid-row-gap': this.#gapTransform(this.rowGap()),
	}));
}

export const GRID_GAP = ['0', '25', '50', '75', '100', '150', '200', '300', '400', '500', '600', '700', '800'] as const;
export type Gap = (typeof GRID_GAP)[number] | `${number}${string}`;
