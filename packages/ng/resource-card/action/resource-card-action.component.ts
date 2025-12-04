import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { LU_RESOURCE_CARD_INSTANCE } from '../resource-card.token';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'a[luResourceCardAction], button[luResourceCardAction]',
	templateUrl: './resource-card-action.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'resourceCard-content-header-title-action',
		'[attr.role]': 'resourceCardRef.disabled() ? "presentation" : null',
		'[attr.disabled]': 'resourceCardRef.disabled() ? "disabled" : null',
	},
	hostDirectives: [LuTooltipTriggerDirective],
	imports: [NgTemplateOutlet],
})
export class ResourceCardActionComponent implements OnInit {
	resourceCardRef = inject(LU_RESOURCE_CARD_INSTANCE);
	contentRef = viewChild<TemplateRef<unknown>>('content');

	ngOnInit(): void {
		this.resourceCardRef.actionRef.set(this);
	}
}

// luTooltip luTooltipOnlyForDisplay luTooltipWhenEllipsis
