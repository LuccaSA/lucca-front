import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { LU_RESOURCE_CARD_INSTANCE } from './resource-card.token';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'a[luResourceCardAction], button[luResourceCardAction]',
	template: `<ng-content />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'resourceCard-content-header-title-action',
		'[attr.role]': 'resourceCardRef.disabled() ? "presentation" : null',
		'[attr.disabled]': 'resourceCardRef.disabled() ? "disabled" : null',
	},
	hostDirectives: [LuTooltipTriggerDirective],
})
export class ResourceCardActionComponent {
	resourceCardRef = inject(LU_RESOURCE_CARD_INSTANCE, { optional: true });
}

// luTooltip luTooltipOnlyForDisplay luTooltipWhenEllipsis
