import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { luBooleanAttribute, luNumberAttribute, ɵinjectRandomPercent } from '@lucca/prisme/core';

@Component({
	selector: 'lu-skeleton-field,pr-skeleton-field',
	templateUrl: './skeleton-field.component.html',
	styleUrl: './skeleton-field.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonFieldComponent {
	/**
	 * Applies dark color for skeleton
	 */
	readonly dark = input(false, { transform: luBooleanAttribute });

	/**
	 * Hide the field label skeleton
	 */
	readonly hiddenLabel = input(false, { transform: luBooleanAttribute });

	/**
	 * Changes the size of the skeleton field
	 */
	readonly size = input<'XS' | 'S' | 'M'>();

	/**
	 * Defines the number of row
	 */
	readonly rows = input(1, { transform: luNumberAttribute });

	readonly lines = computed(() => Array.from({ length: this.rows() }));

	readonly getRandomPercent = ɵinjectRandomPercent(33, 66);
}
