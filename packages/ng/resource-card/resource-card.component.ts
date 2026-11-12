import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute, luNumberAttribute } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { ReorderDirective, ReorderHandleComponent } from '@lucca-front/ng/reorder';
import { ResourceCardSize } from './resource-card.type';
import { LU_RESOURCE_CARD_WRAPPER_INSTANCE } from './wrapper/resource-card-wrapper.token';

@Component({
	selector: 'lu-resource-card',
	templateUrl: './resource-card.component.html',
	styleUrl: './resource-card.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, CdkDragHandle, ReorderHandleComponent],
	host: {
		class: 'resourceCard',
		role: 'region',
		'[class.mod-S]': 'size() === "S"  || wrapperRef?.size() === "S"',
		'[class.mod-grid]': 'grid() || wrapperRef?.grid()',
	},
})
export class ResourceCardComponent {
	readonly wrapperRef = inject(LU_RESOURCE_CARD_WRAPPER_INSTANCE, { optional: true });

	protected readonly reorder = inject(ReorderDirective, { optional: true });

	readonly draggable = input(false, { transform: luBooleanAttribute });

	readonly grid = input(false, { transform: luBooleanAttribute });

	/**
	 * Aria level of the title. Defaults to 3.
	 */
	readonly headingLevel = input(3, { transform: luNumberAttribute<1 | 2 | 3 | 4 | 5 | 6> });

	readonly size = input<ResourceCardSize | null>(null);
}
