import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

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
	disabled = input(false, { transform: booleanAttribute });
}
