import { booleanAttribute, Component, computed, inject, input, LOCALE_ID, numberAttribute, ViewEncapsulation } from '@angular/core';
import { LuClass, Palette } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-gauge',
	standalone: true,
	templateUrl: './gauge.component.html',
	encapsulation: ViewEncapsulation.None,
	providers: [LuClass],
	host: {
		class: 'u-displayContents',
	},
})
export class GaugeComponent {
	#locale = inject(LOCALE_ID);

	value = input(0, { transform: numberAttribute });
	thin = input(false, { transform: booleanAttribute });
	circular = input(false, { transform: booleanAttribute });
	palette = input<Palette>('none');
	alt = input<string>('');
	size = input(80, { transform: numberAttribute });

	thickness = computed(() => (this.thin() ? 4 : 8));

	defaultAlt = computed(() => new Intl.NumberFormat(this.#locale, { style: 'percent' }).format(this.value() / 100));

	get paletteClass() {
		return {
			[`palette-${this.palette()}`]: !!this.palette(),
		};
	}
}
