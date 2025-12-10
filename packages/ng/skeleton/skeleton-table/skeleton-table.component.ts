import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { getRandomPercent } from '../skeleton.utils';

@Component({
	selector: 'lu-skeleton-table',
	templateUrl: './skeleton-table.component.html',
	styleUrl: './skeleton-table.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgTemplateOutlet],
})
export class SkeletonTableComponent {
	readonly tableBodyOnly = input(false, { transform: booleanAttribute });

	readonly cols = input<number>(5);
	readonly colsNumber = computed<unknown[]>(() => new Array(this.cols()));

	readonly rows = input<number>(8);
	readonly rowsNumber = computed<unknown[]>(() => new Array(this.rows()));

	readonly randomPercent: string = getRandomPercent();
}
