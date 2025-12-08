import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, numberAttribute, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-progress-bar',
	templateUrl: './progress-bar.component.html',
	styleUrl: './progress-bar.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
	readonly value = input(0, { transform: numberAttribute });
	readonly state = input<'success' | 'error' | 'null'>(null);
	readonly indeterminate = input(false, { transform: booleanAttribute });

	readonly stateClass = computed(() => {
		return {
			[`is-${this.state()}`]: !!this.state(),
		};
	});
}
