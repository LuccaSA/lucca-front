import { booleanAttribute, Component, computed, inject, input, LOCALE_ID, numberAttribute, OnChanges, ViewEncapsulation } from '@angular/core';
import { LuClass, Palette } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-gauge',
	standalone: true,
	templateUrl: './gauge.component.html',
	encapsulation: ViewEncapsulation.None,
	providers: [LuClass],
	host: {
		'[class.gauge]': '!circular()',
		'[attr.style]': '`--components-gauge-value: ${value()}%`',
		'[class.mod-thin]': 'thin()',
	},
})
export class GaugeComponent implements OnChanges {
	#luClass = inject(LuClass);
	#locale = inject(LOCALE_ID);

	value = input(0, { transform: numberAttribute });
	thin = input(false, { transform: booleanAttribute });
	circular = input(false, { transform: booleanAttribute });
	palette = input<Palette>('none');
	alt = input<string>('');

	defaultAlt = computed(() => new Intl.NumberFormat(this.#locale, { style: 'percent' }).format(this.value() / 100));

	ngOnChanges(): void {
		this.#luClass.setState({ [`palette-${this.palette()}`]: !!this.palette() });
	}
}
