import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-listing-item-term',
	imports: [],
	templateUrl: './listing-item-term.component.html',
	styleUrl: './listing-item-term.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		role: 'term',
	},
})
export class ListingItemTermComponent {}
