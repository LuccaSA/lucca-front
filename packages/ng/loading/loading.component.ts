import { booleanAttribute, Component, effect, HostBinding, inject, input, ViewEncapsulation } from '@angular/core';
import { LuClass } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-loading',
	standalone: true,
	providers: [LuClass],
	styleUrls: ['./loading.component.scss'],
	template: `<ng-content />`,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'loading',
	},
})
export class LoadingComponent {
	#luClass = inject(LuClass);

	size = input<'L' | null>(null);
	invert = input(false, { transform: booleanAttribute });
	block = input(false, { transform: booleanAttribute });
	template = input<'popin' | 'drawer' | 'fullpage' | null>(null);

	@HostBinding('class.mod-L')
	get sizeInput(): boolean {
		return this.size() === 'L';
	}

	@HostBinding('class.mod-invert')
	get invertInput(): boolean {
		return this.invert();
	}

	@HostBinding('class.mod-block')
	get blockInput(): boolean {
		return this.block();
	}

	constructor() {
		effect(() => {
			this.#luClass.setState({
				[`mod-${this.template()}`]: !!this.template(),
			});
		});
	}
}
