import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ɵinjectRandomPercent } from '@lucca/prisme/core';

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
	readonly dark = input(false, { transform: booleanAttribute });

	readonly getRandomPercent = ɵinjectRandomPercent(25, 75);
}
