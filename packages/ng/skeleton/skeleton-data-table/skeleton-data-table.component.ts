import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
	selector: 'lu-skeleton-data-table',
	templateUrl: './skeleton-data-table.component.html',
	styleUrl: './skeleton-data-table.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgTemplateOutlet],
})
export class SkeletonDataTableComponent {
	/**
	 * Skeleton only show in data table body
	 */
	readonly dataTableBodyOnly = input(false, { transform: booleanAttribute });

	/**
	 * Defines the number of cols (5 by default)
	 */
	readonly cols = input<number>(5);

	/**
	 * Defines the number of row (8 by default)
	 */
	readonly rows = input<number>(8);

	readonly colsNumber = computed<unknown[]>(() => new Array(this.cols()));
	readonly rowsNumber = computed<unknown[]>(() => new Array(this.rows()));

	readonly getRandomPercent = (min: number = 33, max: number = 66): string => `${Math.floor(Math.random() * (max - min) + min).toString()}%`;
}
