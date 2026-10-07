import { ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute } from '@lucca-front/ng/core';
import { PopoverContentComponent } from '@lucca-front/ng/popover2';

@Component({
	selector: '[lu-dropdown-action]',
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dropdown-list-option-action',
		'[class.is-disabled]': 'disabled()',
		'[class.mod-critical]': 'critical()',
		'[attr.disabled]': 'disabled() ? "disabled" : null',
		'(click)': 'closePanel()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownActionComponent {
	#popoverContentRef = inject(PopoverContentComponent, { optional: true });

	/**
	 * Disables the action: it can no longer be triggered and does not close the dropdown.
	 */
	readonly disabled = input(false, { transform: luBooleanAttribute });
	/**
	 * Applies a critical style to the action (e.g. delete).
	 */
	readonly critical = input(false, { transform: luBooleanAttribute });

	closePanel() {
		if (this.disabled()) {
			return;
		}
		if (this.#popoverContentRef) {
			this.#popoverContentRef.close();
		}
	}
}
