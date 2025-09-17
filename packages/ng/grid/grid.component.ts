import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, computed, forwardRef, input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { LU_GRID_INSTANCE } from './grid.token';

const spacingRegexp = /.*(\d)$/g;

@Component({
	selector: 'lu-grid',
	standalone: true,
	templateUrl: './grid.component.html',
	styleUrls: ['./grid.component.scss'],
	encapsulation: ViewEncapsulation.None,
	imports: [NgTemplateOutlet],
	providers: [
		{
			provide: LU_GRID_INSTANCE,
			useExisting: forwardRef(() => GridComponent),
		},
	],
})
export class GridComponent {
	container = input(false, { transform: booleanAttribute });
	columns = input(null, { transform: numberAttribute });

	mode = input<
		| 'form'
		| 'auto'
		| 'autoAtMediaMinXXXS'
		| 'autoAtMediaMinXXS'
		| 'autoAtMediaMinXS'
		| 'autoAtMediaMinS'
		| 'autoAtMediaMinM'
		| 'autoAtMediaMinL'
		| 'autoAtMediaMinXL'
		| 'autoAtMediaMinXXL'
		| 'autoAtMediaMinXXXL'
		| 'autoAtContainerMinXXXS'
		| 'autoAtContainerMinXXS'
		| 'autoAtContainerMinXS'
		| 'autoAtContainerMinS'
		| 'autoAtContainerMinM'
		| 'autoAtContainerMinL'
		| 'autoAtContainerMinXL'
		| 'autoAtContainerMinXXL'
		| 'autoAtContainerMinXXXL'
		| null
	>(null);

	#gapTransform = (gap: Gap | null): string | null => {
		if (!gap) {
			return null;
		}
		if (spacingRegexp.test(gap)) {
			return `var(--pr-t-spacings-${gap})`;
		}
		return gap;
	};

	gap = input<Gap | null>(null);
	columnGap = input<Gap | null>(null);
	rowGap = input<Gap | null>(null);

	protected gridStyle = computed(() => ({
		'--grid-columns': this.mode() === null ? this.columns() : null,
		'--grid-gap': this.#gapTransform(this.gap()),
		'--grid-column-gap': this.#gapTransform(this.columnGap()),
		'--grid-row-gap': this.#gapTransform(this.rowGap()),
	}));
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
