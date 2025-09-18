import { Component, ViewEncapsulation } from '@angular/core';
import { DividerComponent } from '@lucca-front/ng/divider';

@Component({
	selector: 'lu-dropdown-divider',
	standalone: true,
	template: '<lu-divider class="dropdown-list-option-divider" />',
	encapsulation: ViewEncapsulation.None,
	imports: [DividerComponent],
	host: {
		class: 'dropdown-list-option',
		role: 'listitem',
		'[attr.aria-hidden]': 'true',
	},
})
export class DropdownDividerComponent {}
