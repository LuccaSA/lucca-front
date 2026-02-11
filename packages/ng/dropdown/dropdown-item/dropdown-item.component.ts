import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-dropdown-item',
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dropdown-list-option',
		role: 'listitem',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownItemComponent {}
