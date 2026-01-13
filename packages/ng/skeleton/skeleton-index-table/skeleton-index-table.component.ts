import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
	selector: 'lu-skeleton-index-table',
	templateUrl: './skeleton-index-table.component.html',
	styleUrl: './skeleton-index-table.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgTemplateOutlet],
})
export class SkeletonIndexTableComponent {
	/**
	 * Skeleton only show in index table body
	 */
	readonly tableBodyOnly = input(false, { transform: booleanAttribute });

	/**
	 * Defines the number of cols (5 by default)
	 */
	readonly cols = input<number>(5);

	/**
	 * Defines the number of row (8 by default)
	 */
	readonly rows = input<number>(8);

	readonly rowsNumber = computed<unknown[]>(() => new Array(this.rows()));
	readonly colsNumber = computed<unknown[]>(() => new Array(this.cols()));

	readonly getRandomPercent = (min: number = 33, max: number = 66): string => `${Math.floor(Math.random() * (max - min) + min).toString()}%`;
}
