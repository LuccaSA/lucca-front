import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, forwardRef, input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { Palette } from '@lucca-front/ng/core';

import { LuccaIcon } from '@lucca-front/icons';
import { LU_LISTING_INSTANCE } from './listing.token';

@Component({
	selector: 'lu-listing',
	standalone: true,
	templateUrl: './listing.component.html',
	styleUrl: './listing.component.scss',
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
	inline = input(false, { transform: booleanAttribute });
	start = input(1, { transform: numberAttribute });
	ordered = input(false, { transform: booleanAttribute });
	descriptionList = input(false, { transform: booleanAttribute });
	checklist = input(false, { transform: booleanAttribute });
	icons = input(false, { transform: booleanAttribute });
	defaultIcon = input<LuccaIcon>('signConfirm');
	palette = input<Palette>('none');
	divider = input(false, { transform: booleanAttribute });
	action = input<string | null>(null);

	get paletteClass() {
		return {
			[`palette-${this.palette()}`]: !!this.palette(),
		};
	}
}
