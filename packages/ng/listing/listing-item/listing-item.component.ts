import { ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { IconComponent } from '@lucca-front/ng/icon';
import { LU_LISTING_INSTANCE } from '../listing.token';

@Component({
	selector: 'lu-listing-item',
	templateUrl: './listing-item.component.html',
	imports: [IconComponent],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'listing-item',
		role: 'listitem',
	},
})
export class ListingItemComponent {
	protected listingRef = inject(LU_LISTING_INSTANCE);

	/**
	 * Adds an icon to the listing item
	 */
	readonly icon = input<LuccaIcon | null>(null);
}
