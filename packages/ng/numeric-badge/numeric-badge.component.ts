import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute, LuClass, luNumberAttribute, Palette, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { NumericBadgeSize } from './numeric-badge.type';

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
	readonly size = input<NumericBadgeSize>();

	/**
	 * The palette to use for this badge. Defaults to 'none' (inherits parent palette)
	 */
	readonly palette = input<Palette>('none');

	/**
	 * Applies the loading state
	 */
	readonly loading = input(false, { transform: luBooleanAttribute });

	/**
	 * Indicates the maximum value of number for the numeric badge
	 */
	readonly maxValue = input(999, { transform: luNumberAttribute });

	/**
	 * Disabled tooltip on numeric badge
	 */
	readonly disableTooltip = input(false, { transform: luBooleanAttribute });

	readonly numericBadgeClasses = computed(() => {
		const palette = this.palette();
		const size = this.size();
		return { [`palette-${palette}`]: !!palette, [`mod-${size}`]: !!size };
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
