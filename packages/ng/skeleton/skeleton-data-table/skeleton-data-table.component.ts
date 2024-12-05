import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, Input } from '@angular/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'lu-skeleton-data-table',
	standalone: true,
	templateUrl: './skeleton-data-table.component.html',
	styleUrl: './skeleton-data-table.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonDataTableComponent {
	@Input({ transform: booleanAttribute })
	tableBodyOnly = false;

	cols = input<number>(5);
	colsNumber = computed<unknown[]>(() => new Array(this.cols()));

	rows = input<number>(10);
	rowsNumber = computed<unknown[]>(() => new Array(this.rows()));

	getRandomPercent = (min: number = 33, max: number = 66): string => `${Math.floor(Math.random() * (max - min) + min).toString()}%`;
}
