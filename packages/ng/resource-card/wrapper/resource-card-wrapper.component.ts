import { booleanAttribute, ChangeDetectionStrategy, Component, forwardRef, input, ViewEncapsulation } from '@angular/core';
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
	readonly grid = input(false, { transform: booleanAttribute });

	readonly draggable = input(false, { transform: booleanAttribute });

	readonly size = input<'S' | null>(null);
}
