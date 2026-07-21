import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, forwardRef, input, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { luBooleanAttribute, luNumberAttribute, Palette } from '@lucca-front/ng/core';
import { LU_LISTING_INSTANCE } from './listing.token';

@Component({
	selector: 'lu-listing',
	templateUrl: './listing.component.html',
	styleUrl: './listing.component.scss',
	imports: [NgTemplateOutlet],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: LU_LISTING_INSTANCE,
			useExisting: forwardRef(() => ListingComponent),
		},
	],
})
export class ListingComponent {
	/**
	 * Create HTMLOListElement
	 */
	readonly ordered = input(false, { transform: luBooleanAttribute });

	/**
	 * Create HTMLOListElement with fancy numbers
	 */
	readonly orderedFancy = input(false, { transform: luBooleanAttribute });

	/**
	 * Applies checklist mod to the listing
	 */
	readonly checklist = input(false, { transform: luBooleanAttribute });

	/**
	 * Adds an icon to the listing
	 */
	readonly icons = input(false, { transform: luBooleanAttribute });

	/**
	 * Gives the desired icon.
	 * If the icon input is not enabled it will not be displayed (signConfirm by default)
	 */
	readonly defaultIcon = input<LuccaIcon>('signConfirm');

	/**
	 * Applies a color palette to the listing
	 */
	readonly palette = input<Palette>('none');

	/**
	 * Allows you to start a list at a value other than 1
	 */
	readonly start = input(1, { transform: luNumberAttribute });

	/**
	 * Applies inline mod to the listing
	 */
	readonly inline = input(false, { transform: luBooleanAttribute });

	/**
	 * Applies divider between list item
	 */
	readonly divider = input(false, { transform: luBooleanAttribute });

	/**
	 * Reversed the listing
	 */
	readonly reversed = input(false, { transform: luBooleanAttribute });

	readonly paletteClass = computed(() => ({
		[`palette-${this.palette()}`]: !!this.palette(),
	}));
}
