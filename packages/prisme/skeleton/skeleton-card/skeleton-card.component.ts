import { ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';
import { ɵinjectRandomPercent } from '@lucca/prisme/core';

@Component({
	selector: 'lu-skeleton-card',
	templateUrl: './skeleton-card.component.html',
	styleUrl: './skeleton-card.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonCardComponent {
	/**
	 * Defines the number of description lines in card
	 */
	readonly descriptionLines = input<number, number | `${number}`>(1, { transform: numberAttribute });

	readonly lines = computed(() => Array.from({ length: this.descriptionLines() }));

	readonly getRandomPercent = ɵinjectRandomPercent(33, 66);
}
