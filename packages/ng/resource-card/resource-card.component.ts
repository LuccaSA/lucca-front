import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipModule } from '../tooltip/tooltip.module';
import { LU_RESOURCE_CARD_WRAPPER_INSTANCE } from './resource-card-wrapper.token';

@Component({
	selector: 'lu-resource-card',
	templateUrl: './resource-card.component.html',
	styleUrl: './resource-card.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, LuTooltipModule],
	host: {
		class: 'resourceCardContainer',
	},
	// hostDirectives: [LuTooltipTriggerDirective],
})
export class ResourceCardComponent {
	// #tooltip = inject(LuTooltipTriggerDirective);

	wrapperRef = inject(LU_RESOURCE_CARD_WRAPPER_INSTANCE, { optional: true });

	draggable = input(false, { transform: booleanAttribute });
	headingLevel = input<'1' | '2' | '3' | '4' | '5' | '6'>('3');
	headingStyle = input<'3' | '4'>('3');

	// constructor() {
	// 	this.#tooltip.luTooltip.set('Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet');
	// 	this.#tooltip.luTooltipOnlyForDisplay = true;
	// 	this.#tooltip.luTooltipWhenEllipsis.set(true);
	// }
}
