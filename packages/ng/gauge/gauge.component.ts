import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, LOCALE_ID, numberAttribute, ViewEncapsulation } from '@angular/core';
import { LuClass, Palette } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-gauge',
	templateUrl: './gauge.component.html',
	styleUrl: './gauge.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [LuClass],
})
export class GaugeComponent {
	#locale = inject(LOCALE_ID);

	readonly value = input(0, { transform: numberAttribute });
	readonly thin = input(false, { transform: booleanAttribute });
	readonly circular = input(false, { transform: booleanAttribute });
	readonly animated = input(false, { transform: booleanAttribute });
	readonly noAlt = input(false, { transform: booleanAttribute });
	readonly palette = input<Palette>('none');
	readonly alt = input<string>('');
	readonly size = input(40, { transform: numberAttribute });

	readonly thickness = computed(() => (this.thin() ? 4 : 8));

	readonly perimeter = computed(() => (2 * Math.PI * (this.size() - this.thickness())) / 2);

	readonly fullThreshold = computed(() => this.perimeter() - this.thickness());

	readonly full = computed<boolean>(() => this.fullThreshold() < (this.perimeter() / 100) * this.value());

	readonly fullThresholdValue = computed(() => Math.floor((this.fullThreshold() / this.perimeter()) * 100));

	readonly displayValue = computed(() => {
		if (this.value() >= 100) {
			return this.value();
		}
		return this.full() ? this.fullThresholdValue() : this.value();
	});

	readonly defaultAlt = computed(() => new Intl.NumberFormat(this.#locale, { style: 'percent' }).format(this.value() / 100));

	readonly paletteClass = computed(() => {
		return {
			[`palette-${this.palette()}`]: !!this.palette(),
		};
	});
}
