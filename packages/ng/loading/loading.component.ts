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

	readonly size = input<'L' | null>(null);
	readonly invert = input(false, { transform: booleanAttribute });
	readonly block = input(false, { transform: booleanAttribute });
	readonly template = input<DisplayMode | null>(null);

	constructor() {
		effect(() => {
			this.#luClass.setState({
				[`mod-${this.template()}`]: !!this.template(),
			});
		});
	}
}
