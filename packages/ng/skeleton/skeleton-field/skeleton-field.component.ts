import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';

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
	readonly dark = input<boolean, boolean | `${boolean}`>(false, { transform: booleanAttribute });

	/**
	 * Hide the field label skeleton
	 */
	readonly hiddenLabel = input<boolean, boolean | `${boolean}`>(false, { transform: booleanAttribute });

	/**
	 * Defines the number of row
	 */
	readonly rows = input<number, number | `${number}`>(1, { transform: numberAttribute });

	readonly lines = computed(() => Array.from({ length: this.rows() }));

	readonly getRandomPercent = (min: number = 33, max: number = 66): string => `${Math.floor(Math.random() * (max - min) + min).toString()}%`;
}
