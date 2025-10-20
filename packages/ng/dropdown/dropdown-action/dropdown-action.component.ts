import { booleanAttribute, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: '[lu-dropdown-action]',
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dropdown-list-option-action',
		'[class.is-disabled]': 'disabled()',
	},
})
export class DropdownActionComponent {
	disabled = input(false, { transform: booleanAttribute });
}
