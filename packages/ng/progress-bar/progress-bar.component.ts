import { booleanAttribute, Component, input, numberAttribute, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-progress-bar',
	standalone: true,
	templateUrl: './progress-bar.component.html',
	styleUrl: './progress-bar.component.scss',
	encapsulation: ViewEncapsulation.None,
})
export class ProgressBarComponent {
	value = input(0, { transform: numberAttribute });
	state = input<'success' | 'error' | 'null'>(null);
	indeterminate = input(false, { transform: booleanAttribute });

	get stateClass() {
		return {
			[`is-${this.state()}`]: !!this.state(),
		};
	}
}
