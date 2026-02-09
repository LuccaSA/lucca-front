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

	/**
	 * The progress of the gauge from 0 to 100
	 */
	readonly value = input(0, { transform: numberAttribute });

	/**
	 * Make the gauge finer
	 */
	readonly thin = input(false, { transform: booleanAttribute });

	/**
	 * Display gaugue in circular
	 */
	readonly circular = input(false, { transform: booleanAttribute });

	/**
	 * Animate the gauge component
	 */
	readonly animated = input(false, { transform: booleanAttribute });

	/**
	 * Disabled alt display (overrides alt value)
	 */
	readonly noAlt = input(false, { transform: booleanAttribute });

	/**
	 * Which palette should be used for the entire gauge.
	 * Defaults to none (inherits parent palette)
	 */
	readonly palette = input<Palette>('none');

	/**
	 * Defines the text alt attribute used for accessibility
	 */
	readonly alt = input<string>('');

	/**
	 * Which size should the gauge be? widht & height
	 */
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

	readonly paletteClass = computed(() => ({
		[`palette-${this.palette()}`]: !!this.palette(),
	}));
}
