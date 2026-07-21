import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { luBooleanAttribute } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-skeleton-highlight-data',
	templateUrl: './skeleton-highlight-data.component.html',
	styleUrl: './skeleton-highlight-data.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonHighlightDataComponent {
	/**
	 * Applies dark color for skeleton
	 */
	readonly dark = input(false, { transform: luBooleanAttribute });

	readonly getRandomPercent = (min: number = 25, max: number = 75): string => `${Math.floor(Math.random() * (max - min) + min).toString()}%`;
}
