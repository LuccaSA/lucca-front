import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'a[luResourceCardAction]',
	template: '<ng-content />',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'resourceCard-layout-header-title-action',
		'[class.is-disabled]': 'disabled()',
		'[attr.role]': 'disabled() ? "presentation" : null',
	},
})
export class ResourceCardLinkComponent {
	/**
	 * Disabled the resource card link
	 */
	readonly disabled = input(false, { transform: booleanAttribute });
}
