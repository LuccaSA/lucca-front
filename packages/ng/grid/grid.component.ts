import { Component, forwardRef, input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { LU_GRID_INSTANCE } from './grid.token';

@Component({
	selector: 'lu-grid',
	standalone: true,
	templateUrl: './grid.component.html',
	styleUrls: ['./grid.component.scss'],
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: LU_GRID_INSTANCE,
			useExisting: forwardRef(() => GridComponent),
		},
	],
	host: {
		class: 'grid',
		'[class.mod-auto]': 'mode() === `auto`',
		'[class.mod-form]': 'mode() === `form`',
		'[style.--grid-columns]': 'mode() === null ? columns() : null',
		'[style.--grid-gap]': 'gap()',
		'[style.--grid-column-gap]': 'columnGap()',
		'[style.--grid-row-gap]': 'rowGap()',
	},
})
export class GridComponent {
	columns = input(null, { transform: numberAttribute });

	mode = input<'form' | 'auto' | null>(null);

	gapTransform = (gap: Gap | null): string | null => {
		if (!gap) {
			return null;
		}
		if (gap.startsWith('spacings-')) {
			return `var(--pr-t-${gap})`;
		}
		return gap;
	};

	gap = input(null, { transform: this.gapTransform });
	columnGap = input(null, { transform: this.gapTransform });
	rowGap = input(null, { transform: this.gapTransform });
}

export type Gap =
	| 'spacings-0'
	| 'spacings-25'
	| 'spacings-50'
	| 'spacings-75'
	| 'spacings-100'
	| 'spacings-150'
	| 'spacings-200'
	| 'spacings-300'
	| 'spacings-400'
	| 'spacings-500'
	| 'spacings-600'
	| 'spacings-700'
	| 'spacings-800'
	| `${number}${string}`;
