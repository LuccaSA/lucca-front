import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, forwardRef, input, ViewEncapsulation } from '@angular/core';
import { Palette } from '@lucca-front/ng/core';

import { LuccaIcon } from '@lucca-front/icons';
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
	readonly ordered = input(false, { transform: booleanAttribute });
	readonly checklist = input(false, { transform: booleanAttribute });
	readonly icons = input(false, { transform: booleanAttribute });
	readonly defaultIcon = input<LuccaIcon>('signConfirm');
	readonly palette = input<Palette>('none');

	readonly paletteClass = computed(() => {
		return {
			[`palette-${this.palette()}`]: !!this.palette(),
		};
	});
}
