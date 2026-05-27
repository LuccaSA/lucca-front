import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { luBooleanAttribute, luNumberAttribute } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-skeleton-field',
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
	 * Defines the number of row
	 */
	readonly rows = input(1, { transform: luNumberAttribute });

	readonly lines = computed(() => Array.from({ length: this.rows() }));

	readonly getRandomPercent = (min: number = 33, max: number = 66): string => `${Math.floor(Math.random() * (max - min) + min).toString()}%`;
}
