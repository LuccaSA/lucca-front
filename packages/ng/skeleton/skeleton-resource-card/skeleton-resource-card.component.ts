import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { luNumberAttribute } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-skeleton-resource-card',
	templateUrl: './skeleton-resource-card.component.html',
	styleUrl: './skeleton-resource-card.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonResourceCardComponent {
	/**
	 * Defines the number of description lines in resource card
	 */
	readonly descriptionLines = input(0, { transform: luNumberAttribute });

	readonly lines = computed(() => Array.from({ length: this.descriptionLines() }));

	getRandomPercent = (min: number = 33, max: number = 66): string => `${Math.floor(Math.random() * (max - min) + min).toString()}%`;
}
