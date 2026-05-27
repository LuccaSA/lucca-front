import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute, luNumberAttribute } from '@lucca-front/ng/core';

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
	readonly value = input(0, { transform: luNumberAttribute });

	/**
	 * Progress bar state
	 */
	readonly state = input<'success' | 'error' | null>(null);

	/**
	 * Displays a loading state without progress information
	 */
	readonly indeterminate = input(false, { transform: luBooleanAttribute });

	readonly stateClass = computed(() => ({
		[`is-${this.state()}`]: !!this.state(),
	}));
}
