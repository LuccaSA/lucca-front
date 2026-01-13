import { booleanAttribute, ChangeDetectionStrategy, Component, effect, inject, input, ViewEncapsulation } from '@angular/core';
import { LuClass } from '@lucca-front/ng/core';

type DisplayMode =
	| 'popin'
	| 'drawer'
	| 'fullPage'
	/** @deprecated use 'fullPage' instead */
	| 'fullpage';

@Component({
	selector: 'lu-loading',
	providers: [LuClass],
	styleUrl: './loading.component.scss',
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'loading',
		'[class.mod-block]': 'block()',
		'[class.mod-invert]': 'invert()',
		'[class.mod-L]': 'size() === "L"',
	},
})
export class LoadingComponent {
	#luClass = inject(LuClass);

	/**
	 * Changes the size of the loading (Medium by default or L)
	 */
	readonly size = input<'L' | null>(null);

	/**
	 * Adjusts the colors of the loading for use on a dark background
	 */
	readonly invert = input(false, { transform: booleanAttribute });

	/**
	 * Applies mod block on loading
	 */
	readonly block = input(false, { transform: booleanAttribute });

	/**
	 * Where the loading is diplayed
	 */
	readonly template = input<DisplayMode | null>(null);

	constructor() {
		effect(() => {
			this.#luClass.setState({
				[`mod-${this.template()}`]: !!this.template(),
			});
		});
	}
}
