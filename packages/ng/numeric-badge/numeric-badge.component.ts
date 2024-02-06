import { ChangeDetectionStrategy, Component, inject, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { NgClazz, Palette } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-numeric-badge',
	standalone: true,
	templateUrl: './numeric-badge.component.html',
	styleUrls: ['./numeric-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [NgClazz],
	host: {
		class: 'numericBadge',
	},
	encapsulation: ViewEncapsulation.None,
})
export class NumericBadgeComponent implements OnChanges {
	#ngClass = inject(NgClazz);

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

	@Input()
	/**
	 * The palette to use for this badge. Defaults to 'none' (inherits parent palette)
	 */
	palette: Palette = 'none';

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['palette']?.currentValue || changes['size']?.currentValue) {
			this.#ngClass.ngClass = [`palette-${this.palette}`, `mod-${this.size}`];
		}
	}
}
