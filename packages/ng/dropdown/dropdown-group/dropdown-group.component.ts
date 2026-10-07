import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-dropdown-group',
	templateUrl: './dropdown-group.component.html',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dropdown-list-option',
		role: 'listitem',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownGroupComponent {
	/**
	 * Label of the group of actions.
	 */
	readonly label = input<string | null>(null);
}
