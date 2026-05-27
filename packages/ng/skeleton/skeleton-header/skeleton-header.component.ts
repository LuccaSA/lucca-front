import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { luBooleanAttribute } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-skeleton-header',
	templateUrl: './skeleton-header.component.html',
	styleUrl: './skeleton-header.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonHeaderComponent {
	/**
	 * Applies dark color for skeleton
	 */
	readonly dark = input(false, { transform: luBooleanAttribute });
}
