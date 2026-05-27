import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { luBooleanAttribute, luNumberAttribute } from '@lucca-front/ng/core';

export type ColAlignTable = 'start' | 'center' | 'end';

@Component({
	selector: 'lu-skeleton-table',
	templateUrl: './skeleton-table.component.html',
	styleUrl: './skeleton-table.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgTemplateOutlet],
})
export class SkeletonTableComponent {
	/**
	 * Skeleton only show in table body
	 */
	readonly tableBodyOnly = input(false, { transform: luBooleanAttribute });

	/**
	 * Defines the number of cols (5 by default)
	 */
	readonly cols = input(5, { transform: luNumberAttribute });

	readonly colsAlign = input<Record<number, ColAlignTable>>({});

	/**
	 * Defines the number of row (8 by default)
	 */
	readonly rows = input(8, { transform: luNumberAttribute });

	readonly colsNumber = computed<unknown[]>(() => new Array(this.cols()));
	readonly rowsNumber = computed<unknown[]>(() => new Array(this.rows()));

	readonly randomPercent: string = `${Math.floor(Math.random() * (66 - 33) + 33).toString()}%`;
}
