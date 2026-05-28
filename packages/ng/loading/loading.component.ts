import { booleanAttribute, ChangeDetectionStrategy, Component, effect, inject, input, ViewEncapsulation } from '@angular/core';
import { LuClass } from '@lucca-front/ng/core';
import { LoadingSize } from './loading.type';

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
	template: '<span class="loading-label"><ng-content /></span>',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'loading',
		'[class.mod-block]': 'block()',
		'[class.mod-invert]': 'invert()',
		'[class.mod-L]': 'size() === "L"',
		'[class.mod-hiddenLabel]': 'hiddenLabel()',
	},
})
export class LoadingComponent {
	#luClass = inject(LuClass);

	readonly size = input<LoadingSize | null>(null);

	readonly invert = input(false, { transform: booleanAttribute });

	readonly block = input(false, { transform: booleanAttribute });

	readonly hiddenLabel = input(false, { transform: booleanAttribute });

	readonly template = input<DisplayMode | null>(null);

	constructor() {
		effect(() => {
			this.#luClass.setState({
				[`mod-${this.template()}`]: !!this.template(),
			});
		});
	}
}
