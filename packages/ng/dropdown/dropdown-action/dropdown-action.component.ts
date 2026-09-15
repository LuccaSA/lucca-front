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

	readonly disabled = input(false, { transform: luBooleanAttribute });
	readonly critical = input(false, { transform: luBooleanAttribute });

	closePanel() {
		if (this.#popoverContentRef) {
			this.#popoverContentRef.close();
		}
	}
}
