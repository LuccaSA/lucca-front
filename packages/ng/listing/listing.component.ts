import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, forwardRef, input, ViewEncapsulation } from '@angular/core';
import { Palette } from '@lucca-front/ng/core';

import { LuccaIcon } from '@lucca-front/icons';
import { LU_LISTING_INSTANCE } from './listing.token';

@Component({
	selector: 'lu-listing',
	standalone: true,
	templateUrl: './listing.component.html',
	styleUrls: ['./listing.component.scss'],
	imports: [NgTemplateOutlet],
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: LU_LISTING_INSTANCE,
			useExisting: forwardRef(() => ListingComponent),
		},
	],
})
export class ListingComponent {
	ordered = input(false, { transform: booleanAttribute });
	checklist = input(false, { transform: booleanAttribute });
	icons = input(false, { transform: booleanAttribute });
	defaultIcon = input<LuccaIcon>(null);
	palette = input<Palette>('none');

	get paletteClass() {
		return {
			[`palette-${this.palette()}`]: !!this.palette(),
		};
	}
}
