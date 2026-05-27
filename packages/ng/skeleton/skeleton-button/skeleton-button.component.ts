import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { luBooleanAttribute } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-skeleton-button',
	templateUrl: './skeleton-button.component.html',
	styleUrl: './skeleton-button.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonButtonComponent {
	/**
	 * Applies dark color for skeleton
	 */
	readonly dark = input(false, { transform: luBooleanAttribute });

	/**
	 * Changes the size of the skeleton button
	 */
	readonly size = input<'XS' | 'S' | 'M'>();
}
