import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { luBooleanAttribute, luNumberAttribute } from '@lucca-front/ng/core';

export type ColAlignIndexTable = 'start' | 'center' | 'end';

@Component({
	selector: 'lu-skeleton-index-table',
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
	readonly tableBodyOnly = input(false, { transform: luBooleanAttribute });

	/**
	 * Defines the number of cols (5 by default)
	 */
	readonly cols = input(5, { transform: luNumberAttribute });

	readonly colsAlign = input<Record<number, ColAlignIndexTable>>({});

	/**
	 * Defines the number of row (8 by default)
	 */
	readonly rows = input(8, { transform: luNumberAttribute });

	readonly rowsNumber = computed<unknown[]>(() => new Array(this.rows()));
	readonly colsNumber = computed<unknown[]>(() => new Array(this.cols()));

	readonly getRandomPercent = (min: number = 33, max: number = 66): string => `${Math.floor(Math.random() * (max - min) + min).toString()}%`;
}
