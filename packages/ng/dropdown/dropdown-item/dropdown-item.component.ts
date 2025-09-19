import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-dropdown-item',
	standalone: true,
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dropdown-list-option',
		role: 'listitem',
	},
})
export class DropdownItemComponent {}
