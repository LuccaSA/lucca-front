import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { luBooleanAttribute, luNumberAttribute } from '@lucca-front/ng/core';
import { SkeletonColsAlign } from '../skeleton.type';

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
	readonly dataTableBodyOnly = input(false, { transform: luBooleanAttribute });

	/**
	 * Defines the number of cols (5 by default)
	 */
	readonly cols = input(5, { transform: luNumberAttribute });

	readonly colsAlign = input<Record<number, SkeletonColsAlign>>({});

	/**
	 * Defines the number of row (8 by default)
	 */
	readonly rows = input(8, { transform: luNumberAttribute });

	readonly colsNumber = computed<unknown[]>(() => new Array(this.cols()));
	readonly rowsNumber = computed<unknown[]>(() => new Array(this.rows()));

	readonly getRandomPercent = (min: number = 33, max: number = 66): string => `${Math.floor(Math.random() * (max - min) + min).toString()}%`;
}
