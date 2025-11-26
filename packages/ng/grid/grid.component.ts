import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { ResponsiveProperty } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-grid, [lu-grid]',
	templateUrl: './grid.component.html',
	styleUrls: ['./grid.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgTemplateOutlet],
})
export class GridComponent {
	readonly container = input(false, { transform: booleanAttribute });
	readonly columns = input(null, { transform: numberAttribute });

	readonly mode = input<'form' | 'auto' | ResponsiveProperty<'auto'> | null>(null);

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

	readonly gap = input<Gap | null>(null);
	readonly columnGap = input<Gap | null>(null);
	readonly rowGap = input<Gap | null>(null);

	protected gridStyle = computed(() => ({
		'--grid-columns': this.mode() === null ? this.columns() : null,
		'--grid-gap': this.#gapTransform(this.gap()),
		'--grid-column-gap': this.#gapTransform(this.columnGap()),
		'--grid-row-gap': this.#gapTransform(this.rowGap()),
	}));
}

export type Gap = '0' | '25' | '50' | '75' | '100' | '150' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | `${number}${string}`;
