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
	readonly center = input(false, { transform: luBooleanAttribute });

	readonly overflow = input(false, { transform: luBooleanAttribute });

	readonly max = input<ContainerSize | null>(null);

	readonly classesConfig = computed(() => ({
		['mod-center']: this.center(),
		['mod-overflow']: this.overflow(),
		[`mod-max${this.max()}`]: !!this.max(),
	}));
}
