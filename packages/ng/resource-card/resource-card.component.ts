import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LU_RESOURCE_CARD_WRAPPER_INSTANCE } from './wrapper/resource-card-wrapper.token';

@Component({
	selector: 'lu-resource-card',
	templateUrl: './resource-card.component.html',
	styleUrl: './resource-card.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, CdkDragHandle],
	host: {
		class: 'resourceCard',
		role: 'region',
		'[class.mod-S]': 'size() === "S"  || wrapperRef?.size() === "S"',
		'[class.mod-grid]': 'grid() || wrapperRef?.grid()',
	},
})
export class ResourceCardComponent {
	readonly wrapperRef = inject(LU_RESOURCE_CARD_WRAPPER_INSTANCE, { optional: true });

	/**
	 * Card can be draggable
	 */
	readonly draggable = input(false, { transform: booleanAttribute });

	/**
	 * Applies grid class to resource card
	 */
	readonly grid = input(false, { transform: booleanAttribute });

	/**
	 * Defines heading level for title
	 */
	readonly headingLevel = input<'1' | '2' | '3' | '4' | '5' | '6'>('3');

	/**
	 * 	hanges the size of the resource card
	 */
	readonly size = input<'S' | null>(null);
}
