import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute } from '@lucca-front/ng/core';
import { ContainerSize } from './container.type';

@Component({
	selector: 'lu-container',
	styleUrl: './container.component.scss',
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'container',
		'[class]': 'classesConfig()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerComponent {
	/**
	 * Centers the container horizontally
	 */
	readonly center = input(false, { transform: luBooleanAttribute });

	/**
	 * Lets the container grow with its content (minimum inline size set to `fit-content`) instead of shrinking to the available space
	 */
	readonly overflow = input(false, { transform: luBooleanAttribute });

	/**
	 * Sets the maximum inline size of the container
	 */
	readonly max = input<ContainerSize | null>(null);

	readonly classesConfig = computed(() => ({
		['mod-center']: this.center(),
		['mod-overflow']: this.overflow(),
		[`mod-max${this.max()}`]: !!this.max(),
	}));
}
