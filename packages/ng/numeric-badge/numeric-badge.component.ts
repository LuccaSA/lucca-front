import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { LuClass, Palette } from '@lucca-front/ng/core';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';

@Component({
	selector: 'lu-numeric-badge',
	standalone: true,
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
export class NumericBadgeComponent implements OnChanges {
	#luClass = inject(LuClass);

	@Input({ required: true })
	/**
	 * The value to display, number or string contains number only.
	 */
	value!: number | string;

	@Input()
	/**
	 * The size of the badge
	 */
	size: 'XS' | 'S' | 'M';

	loading = input(false, { transform: booleanAttribute });

	@Input()
	maxValue: number = 999;

	disableTooltip = input(false, { transform: booleanAttribute });

	@Input()
	/**
	 * The palette to use for this badge. Defaults to 'none' (inherits parent palette)
	 */
	palette: Palette = 'none';

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['palette']?.currentValue || changes['size']?.currentValue) {
			this.#luClass.setState({ [`palette-${this.palette}`]: !!this.palette, [`mod-${this.size}`]: !!this.size });
		}
	}

	displayValue = () => {
		if (typeof this.value === 'number') {
			return +this.value > this.maxValue ? `${this.maxValue}+` : this.value;
		} else {
			return this.value;
		}
	};
}
