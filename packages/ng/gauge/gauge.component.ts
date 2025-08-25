import { booleanAttribute, Component, inject, input, numberAttribute, OnChanges, ViewEncapsulation } from '@angular/core';
import { LuClass, Palette } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-gauge',
	standalone: true,
	template: ``,
	encapsulation: ViewEncapsulation.None,
	providers: [LuClass],
	host: {
		class: 'gauge',
		'[attr.style]': '`--components-gauge-value: ${value()}%`',
		'[class.mod-thin]': 'thin()',
	},
})
export class GaugeComponent implements OnChanges {
	#luClass = inject(LuClass);

	value = input(0, { transform: numberAttribute });
	thin = input(false, { transform: booleanAttribute });
	palette = input<Palette>('none');

	ngOnChanges(): void {
		this.#luClass.setState({ [`palette-${this.palette()}`]: !!this.palette() });
	}
}
