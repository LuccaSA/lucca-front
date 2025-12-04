import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { LU_RESOURCE_CARD_INSTANCE } from '../resource-card.token';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'a[luResourceCardAfterAction], button[luResourceCardAfterAction]',
	template: '<ng-content />',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'resourceCard-content-after-action button',
		'[attr.disabled]': 'resourceCardRef.disabled() ? "disabled" : null',
	},
})
export class ResourceCardAfterActionComponent {
	resourceCardRef = inject(LU_RESOURCE_CARD_INSTANCE);
}
