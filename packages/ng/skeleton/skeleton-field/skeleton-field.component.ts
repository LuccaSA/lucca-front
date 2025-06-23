import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';

@Component({
	selector: 'lu-skeleton-field',
	standalone: true,
	templateUrl: './skeleton-field.component.html',
	styleUrl: './skeleton-field.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonFieldComponent {
	readonly dark = input<boolean, boolean | `${boolean}`>(false, { transform: booleanAttribute });

	readonly hiddenLabel = input<boolean, boolean | `${boolean}`>(false, { transform: booleanAttribute });

	readonly rows = input<number, number | `${number}`>(1, { transform: numberAttribute });

	readonly lines = computed(() => Array.from({ length: this.rows() }));

	readonly getRandomPercent = (min = 33, max = 66) => Math.floor(Math.random() * (max - min) + min);
}
