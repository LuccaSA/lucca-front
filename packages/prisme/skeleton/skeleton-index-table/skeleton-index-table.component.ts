import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';
import { ɵinjectRandomPercent } from '@lucca/prisme/core';
import { SkeletonColsAlign } from '../skeleton.type';

@Component({
	selector: 'lu-skeleton-index-table,pr-skeleton-index-table',
	templateUrl: './skeleton-index-table.component.html',
	styleUrl: './skeleton-index-table.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgTemplateOutlet],
	host: {
		class: 'skeleton is-loading',
	},
})
export class SkeletonIndexTableComponent {
	/**
	 * Skeleton only show in index table body
	 */
	readonly tableBodyOnly = input<boolean, boolean | `${boolean}` | ''>(false, { transform: booleanAttribute });

	/**
	 * Defines the number of cols (5 by default)
	 */
	readonly cols = input<number, number | `${number}`>(5, { transform: numberAttribute });

	readonly colsAlign = input<Record<number, SkeletonColsAlign>>({});

	/**
	 * Defines the number of row (8 by default)
	 */
	readonly rows = input<number, number | `${number}`>(8, { transform: numberAttribute });

	readonly rowsNumber = computed<unknown[]>(() => new Array(this.rows()));
	readonly colsNumber = computed<unknown[]>(() => new Array(this.cols()));

	readonly getRandomPercent = ɵinjectRandomPercent(33, 66);
}
