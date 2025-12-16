import { ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';

@Component({
	selector: 'lu-skeleton-resource-card',
	templateUrl: './skeleton-resource-card.component.html',
	styleUrl: './skeleton-resource-card.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonResourceCardComponent {
	descriptionLines = input(0, { transform: numberAttribute });

	readonly lines = computed(() => Array.from({ length: this.descriptionLines() }));

	getRandomPercent = (min: number = 33, max: number = 66): string => `${Math.floor(Math.random() * (max - min) + min).toString()}%`;
}
