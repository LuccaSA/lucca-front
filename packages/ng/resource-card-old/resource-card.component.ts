import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { booleanAttribute, ChangeDetectionStrategy, Component, forwardRef, inject, input, ViewEncapsulation } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LU_RESOURCE_CARD_INSTANCE } from './resource-card.token';
import { LU_RESOURCE_CARD_WRAPPER_INSTANCE } from './wrapper/resource-card-wrapper.token';

@Component({
	selector: 'lu-resource-card',
	templateUrl: './resource-card.component.html',
	styleUrl: './resource-card.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, CdkDragHandle],
	host: {
		class: 'resourceCardContainer',
	},
	providers: [
		{
			provide: LU_RESOURCE_CARD_INSTANCE,
			useExisting: forwardRef(() => ResourceCardComponent),
		},
	],
})
export class ResourceCardComponent {
	wrapperRef = inject(LU_RESOURCE_CARD_WRAPPER_INSTANCE, { optional: true });

	draggable = input(false, { transform: booleanAttribute });
	disabled = input(false, { transform: booleanAttribute });
	headingLevel = input<'1' | '2' | '3' | '4' | '5' | '6'>('3');
	headingStyle = input<'3' | '4'>('3');

	// #tooltip = inject(LuTooltipTriggerDirective);

	constructor() {
		// this.#tooltip.luTooltipOnlyForDisplay = true;
		// this.#tooltip.luTooltipWhenEllipsis.set(true);
		// console.log(this.actionRef()?.contentRef());
	}
}
