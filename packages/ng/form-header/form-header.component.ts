import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-form-header]',
	standalone: true,
	templateUrl: './form-header.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'form-header',
	},
})
export class FormHeaderComponent {
	headingLevel = input<1 | 2 | 3 | 4 | 5 | 6>(1);
}
