import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { LuClass, Palette, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';

@Component({
	selector: 'lu-numeric-badge',
	templateUrl: './numeric-badge.component.html',
	styleUrl: './numeric-badge.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [LuTooltipModule],
	providers: [LuClass],
	host: {
		class: 'numericBadge',
		'[class.is-loading]': 'loading()',
		'[attr.aria-hidden]': 'loading()',
	},
	encapsulation: ViewEncapsulation.None,
})
export class NumericBadgeComponent {
	#luClass = inject(LuClass);

	/**
	 * The value to display, number or string contains number only.
	 */
	readonly value = input.required<number | string>();

	/**
	 * The size of the badge
	 */
	readonly size = input<'XS' | 'S' | 'M'>();

	/**
	 * The palette to use for this badge. Defaults to 'none' (inherits parent palette)
	 */
	readonly palette = input<Palette>('none');

	readonly loading = input(false, { transform: booleanAttribute });

	readonly maxValue = input<number>(999);

	readonly disableTooltip = input(false, { transform: booleanAttribute });

	readonly numericBadgeClasses = computed(() => {
		const palette = this.palette();
		const size = this.size();
		return { [`palette-${palette}`]: !!this.palette, [`mod-${size}`]: !!this.size };
	});

	readonly displayValue = computed(() => {
		const value = this.value();
		const maxValue = this.maxValue();
		if (typeof value === 'number') {
			return +value > maxValue ? `${maxValue}+` : value;
		} else {
			return value;
		}
	});

	readonly isDisabled = computed<boolean>(() => {
		const value = this.value();
		return this.disableTooltip() || typeof value !== 'number' || this.loading() || this.maxValue() >= +value;
	});

	constructor() {
		ɵeffectWithDeps([this.numericBadgeClasses], (numericBadgeClasses) => {
			if (numericBadgeClasses) {
				this.#luClass.setState(numericBadgeClasses);
			}
		});
	}
}
