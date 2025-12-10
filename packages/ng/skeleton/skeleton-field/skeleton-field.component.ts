import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';
import { getRandomPercent } from '../skeleton.utils';

@Component({
	selector: 'lu-skeleton-field',
	templateUrl: './skeleton-field.component.html',
	styleUrl: './skeleton-field.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonFieldComponent {
	readonly dark = input<boolean, boolean | `${boolean}`>(false, { transform: booleanAttribute });

	readonly hiddenLabel = input<boolean, boolean | `${boolean}`>(false, { transform: booleanAttribute });

	readonly rows = input<number, number | `${number}`>(1, { transform: numberAttribute });

	readonly lines = computed(() => Array.from({ length: this.rows() }));

	randomPercent(min: number = 33, max: number = 66) {
		return getRandomPercent(min, max);
	}
}
