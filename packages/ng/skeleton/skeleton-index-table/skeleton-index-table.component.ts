import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, Input } from '@angular/core';

@Component({
	selector: 'lu-skeleton-index-table',
	standalone: true,
	templateUrl: './skeleton-index-table.component.html',
	styleUrl: './skeleton-index-table.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgTemplateOutlet],
})
export class SkeletonIndexTableComponent {
	@Input({ transform: booleanAttribute })
	tableBodyOnly = false;

	cols = input<number>(5);
	colsNumber = computed<unknown[]>(() => new Array(this.cols()));

	rows = input<number>(8);
	rowsNumber = computed<unknown[]>(() => new Array(this.rows()));

	getRandomPercent = (min: number = 33, max: number = 66): string => `${Math.floor(Math.random() * (max - min) + min).toString()}%`;
}
