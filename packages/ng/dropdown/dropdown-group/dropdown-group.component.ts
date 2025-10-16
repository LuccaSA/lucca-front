import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-dropdown-group',
	standalone: true,
	templateUrl: './dropdown-group.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dropdown-list-option',
		role: 'listitem',
	},
})
export class DropdownGroupComponent {
	label = input<string | null>(null);
}
