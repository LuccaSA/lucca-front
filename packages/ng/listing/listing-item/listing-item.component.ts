import { Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LU_LISTING_INSTANCE } from '../listing.token';

@Component({
	selector: 'lu-listing-item, [lu-listing-item]',
	standalone: true,
	templateUrl: './listing-item.component.html',
	imports: [IconComponent, PortalDirective],
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'listing-item',
		'[role]': "this.description() ? null : 'listitem'",
	},
})
export class ListingItemComponent {
	icon = input<LuccaIcon | null>(null);
	term = input<string | null>('term');

	heading = input.required<PortalContent>();
	value = input.required<PortalContent>();

	protected listingRef = inject(LU_LISTING_INSTANCE);

	description = computed(() => this.listingRef.descriptionList());
}
