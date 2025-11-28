import { booleanAttribute, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { PopoverContentComponent } from '@lucca-front/ng/popover2';

@Component({
	selector: '[lu-dropdown-action]',
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dropdown-list-option-action',
		'[class.is-disabled]': 'disabled()',
		'[class.mod-critical]': 'critical()',
		'(click)': 'closePanel()',
	},
})
export class DropdownActionComponent {
	#popoverContentRef = inject(PopoverContentComponent, { optional: true });

	disabled = input(false, { transform: booleanAttribute });
	critical = input(false, { transform: booleanAttribute });

	closePanel() {
		if (this.#popoverContentRef) {
			this.#popoverContentRef.close();
		}
	}
}
