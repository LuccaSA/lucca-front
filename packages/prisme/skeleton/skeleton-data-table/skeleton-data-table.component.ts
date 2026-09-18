import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';
import { SkeletonColsAlign } from '../skeleton.type';

@Component({
	selector: 'lu-skeleton-data-table,pr-skeleton-data-table',
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
	readonly cols = input(5, { transform: numberAttribute });

	/**
	 * Defines the horizontal alignment of the cells content
	 */
	readonly colsAlign = input<Record<number, SkeletonColsAlign>>({});

	/**
	 * Defines the number of row (8 by default)
	 */
	readonly rows = input(8, { transform: numberAttribute });

	readonly colsNumber = computed<number[]>(() => Array.from({ length: this.cols() }, (_, index) => index + 1));
	readonly rowsNumber = computed<unknown[]>(() => new Array(this.rows()));

	readonly getRandomPercent = (min: number = 33, max: number = 66): string => `${Math.floor(Math.random() * (max - min) + min).toString()}%`;
}
