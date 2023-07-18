import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'lu-numeric-badge',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './numeric-badge.component.html',
	styleUrls: ['./numeric-badge.component.scss'],
})
export class NumericBadgeComponent {
	@Input({ required: true })
	/**
	 * The value to display, number only.
	 */
	value!: number;

	@Input()
	/**
	 * The size of the badge
	 * TODO: create core types and use them here instead of this handmade union.
	 * 	It would also be nice to use uppercase strings directly to match CSS classes
	 */
	size: 'xs' | 's' | 'm' = 'm';

	@Input()
	/**
	 * The palette to use for this badge. Defaults to 'none' (inherits parent palette)
	 *
	 * TODO: use a core "Palette" type instead of string, once callout has been merged
	 */
	palette: string = 'none';
}
