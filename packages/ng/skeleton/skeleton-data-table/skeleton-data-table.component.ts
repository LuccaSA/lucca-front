import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, Input } from '@angular/core';

@Component({
	selector: 'lu-skeleton-data-table',
	templateUrl: './skeleton-data-table.component.html',
	styleUrl: './skeleton-data-table.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgTemplateOutlet],
})
export class SkeletonDataTableComponent {
	@Input({ transform: booleanAttribute })
	dataTableBodyOnly = false;

	cols = input<number>(5);
	colsNumber = computed<unknown[]>(() => new Array(this.cols()));

	rows = input<number>(8);
	rowsNumber = computed<unknown[]>(() => new Array(this.rows()));

	getRandomPercent = (min: number = 33, max: number = 66): string => `${Math.floor(Math.random() * (max - min) + min).toString()}%`;
}
