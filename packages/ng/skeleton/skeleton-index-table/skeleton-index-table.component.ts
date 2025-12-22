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
	readonly tableBodyOnly = input(false, { transform: booleanAttribute });

	readonly cols = input<number>(5);
	readonly colsNumber = computed<unknown[]>(() => new Array(this.cols()));

	readonly rows = input<number>(8);
	readonly rowsNumber = computed<unknown[]>(() => new Array(this.rows()));

	readonly getRandomPercent = (min: number = 33, max: number = 66): string => `${Math.floor(Math.random() * (max - min) + min).toString()}%`;
}
