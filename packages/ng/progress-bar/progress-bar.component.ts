import { booleanAttribute, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-progress-bar',
	standalone: true,
	templateUrl: './progress-bar.component.html',
	styleUrl: './progress-bar.component.scss',
	encapsulation: ViewEncapsulation.None,
})
export class ProgressBarComponent {
	indeterminate = input(false, { transform: booleanAttribute });
}
