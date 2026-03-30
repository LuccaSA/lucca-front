import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { ProgressBarState } from './progress-bar-type';

@Component({
	selector: 'lu-progress-bar',
	templateUrl: './progress-bar.component.html',
	styleUrl: './progress-bar.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
	/**
	 * Progress percentage (0 to 100)
	 */
	readonly value = input(0, { transform: numberAttribute });

	/**
	 * Progress bar state
	 */
	readonly state = input<ProgressBarState | null>(null);

	/**
	 * Displays a loading state without progress information
	 */
	readonly indeterminate = input(false, { transform: booleanAttribute });

	readonly stateClass = computed(() => ({
		[`is-${this.state()}`]: !!this.state(),
	}));
}
