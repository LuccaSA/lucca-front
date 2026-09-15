import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute } from '@lucca-front/ng/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'button[luResourceCardAction]',
	template: '<ng-content />',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'resourceCard-layout-header-title-action',
		'[attr.disabled]': 'disabled() ? "disabled" : null',
	},
})
export class ResourceCardButtonComponent {
	/**
	 * Disabled the resource card button
	 */
	readonly disabled = input(false, { transform: luBooleanAttribute });
}
