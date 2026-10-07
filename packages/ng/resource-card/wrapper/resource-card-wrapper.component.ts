import { ChangeDetectionStrategy, Component, forwardRef, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute } from '@lucca-front/ng/core';
import { ResourceCardSize } from '../resource-card.type';
import { LU_RESOURCE_CARD_WRAPPER_INSTANCE } from './resource-card-wrapper.token';

@Component({
	selector: 'lu-resource-card-wrapper',
	template: '<ng-content />',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'resourceCardWrapper',
		'[class.mod-grid]': 'grid()',
		'[class.mod-S]': 'size() === "S"',
	},
	providers: [
		{
			provide: LU_RESOURCE_CARD_WRAPPER_INSTANCE,
			useExisting: forwardRef(() => ResourceCardWrapperComponent),
		},
	],
})
export class ResourceCardWrapperComponent {
	/**
	 * Display the cards of the wrapper in a grid
	 */
	readonly grid = input(false, { transform: luBooleanAttribute });

	/**
	 * Display the cards of the wrapper as draggable
	 */
	readonly draggable = input(false, { transform: luBooleanAttribute });

	/**
	 * Size of the cards of the wrapper
	 */
	readonly size = input<ResourceCardSize | null>(null);
}
