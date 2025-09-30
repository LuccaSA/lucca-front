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
	animated = input(false, { transform: booleanAttribute });
	noAlt = input(false, { transform: booleanAttribute });
	palette = input<Palette>('none');
	alt = input<string>('');
	size = input(40, { transform: numberAttribute });

	thickness = computed(() => (this.thin() ? 4 : 8));

	perimeter = computed(() => (2 * Math.PI * (this.size() - this.thickness())) / 2);

	fullThreshold = computed(() => this.perimeter() - this.thickness());

	full = computed<boolean>(() => this.fullThreshold() < (this.perimeter() / 100) * this.value());

	fullThresholdValue = computed(() => Math.floor((this.fullThreshold() / this.perimeter()) * 100));

	displayValue = computed(() => {
		if (this.value() >= 100) {
			return this.value();
		}
		return this.full() ? this.fullThresholdValue() : this.value();
	});

	defaultAlt = computed(() => new Intl.NumberFormat(this.#locale, { style: 'percent' }).format(this.value() / 100));

	get paletteClass() {
		return {
			[`palette-${this.palette()}`]: !!this.palette(),
		};
	}
}
