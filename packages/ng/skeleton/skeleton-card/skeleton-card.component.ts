import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { luNumberAttribute } from '@lucca-front/ng/core';

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
	readonly descriptionLines = input(1, { transform: luNumberAttribute });

	readonly lines = computed(() => Array.from({ length: this.descriptionLines() }));

	readonly getRandomPercent = (min: number = 33, max: number = 66): string => `${Math.floor(Math.random() * (max - min) + min).toString()}%`;
}
