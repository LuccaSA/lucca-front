import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

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
	 * Place the content in the center
	 */
	readonly center = input(false, { transform: booleanAttribute });

	/**
	 * The content can overflow the maximum size set
	 */
	readonly overflow = input(false, { transform: booleanAttribute });

	/**
	 * Set the maximum size of the content
	 */
	readonly max = input<null | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'>(null);

	readonly classesConfig = computed(() => ({
		['mod-center']: this.center(),
		['mod-overflow']: this.overflow(),
		[`mod-max${this.max()}`]: !!this.max(),
	}));
}
