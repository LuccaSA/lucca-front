import { Attribute, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { IconComponent } from '@lucca-front/ng/icon';
import { LU_LISTING_INSTANCE } from '../listing.token';

@Component({
	selector: 'lu-listing-item, [lu-listing-item]',
	standalone: true,
	templateUrl: './listing-item.component.html',
	imports: [IconComponent],
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'listing-item',
		'[role]': 'getRole()',
	},
})
export class ListingItemComponent {
	icon = input<LuccaIcon | null>(null);
	term = input<string | null>('term');

	protected listingRef = inject(LU_LISTING_INSTANCE);

	description = computed(() => this.listingRef.descriptionList());
	public getRole() {
		if (this.description()) {
			return this.role;
		} else {
			return 'listitem';
		}
	}

	public role: string;

	constructor(@Attribute('role') role: string) {
		this.role = role;
	}
}
