import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, forwardRef, input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { ResponsiveProperty } from '@lucca-front/ng/core';
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
	 * Display the grid in container mode
	 */
	readonly container = input(false, { transform: booleanAttribute });

	/**
	 * Defines the number of columns in the grid
	 */
	readonly columns = input(null, { transform: numberAttribute });

	/**
	 * Defines the number of columns of a table cell
	 */
	readonly colspan = input(null, { transform: numberAttribute });

	/**
	 * Defines the number of rows of a table cell
	 */
	readonly rowspan = input(null, { transform: numberAttribute });

	/**
	 * Defines grid mode between form or auto
	 */
	readonly mode = input<'form' | 'auto' | ResponsiveProperty<'auto'> | null>(null);

	/**
	 * Defines a specific gap between columns and rows
	 */
	readonly gap = input<Gap | null>(null);

	/**
	 * Defines a specific gap for columns
	 */
	readonly columnGap = input<Gap | null>(null);

	/**
	 * Defines a specific gap for rows
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

	protected gridStyle = computed(() => ({
		'--grid-columns': this.mode() === null ? this.columns() : null,
		'--grid-gap': this.#gapTransform(this.gap()),
		'--grid-column-gap': this.#gapTransform(this.columnGap()),
		'--grid-row-gap': this.#gapTransform(this.rowGap()),
	}));
}

export type Gap = '0' | '25' | '50' | '75' | '100' | '150' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | `${number}${string}`;
