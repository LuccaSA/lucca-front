import { Component, Input, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Palette } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-numeric-badge',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './numeric-badge.component.html',
	styleUrls: ['./numeric-badge.component.scss'],
})
export class NumericBadgeComponent {
	@Input({ required: true, transform: numberAttribute })
	/**
	 * The value to display, number only.
	 */
	value!: number;

	@Input()
	/**
	 * The size of the badge
	 */
	size: 'XS' | 'S' | 'M' = 'M';

	@Input()
	/**
	 * The palette to use for this badge. Defaults to 'none' (inherits parent palette)
	 */
	palette: Palette = 'none';
}
