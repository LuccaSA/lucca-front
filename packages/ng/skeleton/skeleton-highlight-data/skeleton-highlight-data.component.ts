import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

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
	readonly dark = input<boolean, boolean | `${boolean}`>(false, { transform: booleanAttribute });

	readonly getRandomPercent = (min: number = 25, max: number = 75): string => `${Math.floor(Math.random() * (max - min) + min).toString()}%`;
}
