import { Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { IconComponent } from '@lucca-front/ng/icon';
import { ListingItemTermComponent } from '../listing-item-term/listing-item-term.component';
import { LU_LISTING_INSTANCE } from '../listing.token';

// @Directive({
// 	// eslint-disable-next-line @angular-eslint/directive-selector
// 	selector: 'lu-listing-item-term',
// 	standalone: true,
// 	host: {
// 		['role']: 'term()',
// 	},
// })
// export class ListingItemTermDirective {}
// @Directive({
// 	// eslint-disable-next-line @angular-eslint/directive-selector
// 	selector: 'lu-listing-item-definition',
// 	standalone: true,
// 	host: {
// 		'[role]': 'definition()',
// 	},
// })
// export class ListingItemDefinitionDirective {}

@Component({
	selector: 'lu-listing-item, [lu-listing-item]',
	standalone: true,
	templateUrl: './listing-item.component.html',
	imports: [IconComponent, ListingItemTermComponent],
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'listing-item',
		'[role]': 'description() ? "none" : "listitem"',
	},
})
export class ListingItemComponent {
	icon = input<LuccaIcon | null>(null);
	term = input<string | null>('term');

	protected listingRef = inject(LU_LISTING_INSTANCE);

	description = computed(() => this.listingRef.descriptionList());
}
