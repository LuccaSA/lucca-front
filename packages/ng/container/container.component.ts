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
	center = input(false, { transform: booleanAttribute });
	overflow = input(false, { transform: booleanAttribute });
	max = input<null | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'>(null);

	classesConfig = computed(() => {
		return {
			['mod-center']: this.center(),
			['mod-overflow']: this.overflow(),
			[`mod-max${this.max()}`]: !!this.max(),
		};
	});
}
