import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
	selector: 'lu-skeleton-field',
	standalone: true,
	templateUrl: './skeleton-field.component.html',
	styleUrl: './skeleton-field.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonFieldComponent {
	readonly dark = input(false, { transform: booleanAttribute });

	readonly hiddenLabel = input(false, { transform: booleanAttribute });

	rows = input<number>(1);

	lines = computed(() => Array.from(Array(this.rows()).keys()));

	getRandomPercent = (min: number = 33, max: number = 66): string => `${Math.floor(Math.random() * (max - min) + min).toString()}%`;
}
