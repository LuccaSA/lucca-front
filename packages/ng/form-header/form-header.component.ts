import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-form-header]',
	templateUrl: './form-header.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'form-header',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormHeaderComponent {
	/**
	 * Define the aria level of the title
	 */
	readonly headingLevel = input<1 | 2 | 3 | 4 | 5 | 6>(1);
}
