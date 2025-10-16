import { booleanAttribute, Component, effect, inject, input, ViewEncapsulation } from '@angular/core';
import { LuClass } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-loading',
	standalone: true,
	providers: [LuClass],
	styleUrl: './loading.component.scss',
	template: `<ng-content />`,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'loading',
		'[class.mod-block]': 'block()',
		'[class.mod-invert]': 'invert()',
		'[class.mod-L]': 'size() === "L"',
	},
})
export class LoadingComponent {
	#luClass = inject(LuClass);

	size = input<'L' | null>(null);
	invert = input(false, { transform: booleanAttribute });
	block = input(false, { transform: booleanAttribute });
	template = input<'popin' | 'drawer' | 'fullpage' | null>(null);

	constructor() {
		effect(() => {
			this.#luClass.setState({
				[`mod-${this.template()}`]: !!this.template(),
			});
		});
	}
}
