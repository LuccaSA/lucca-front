import { Directive } from '@angular/core';

@Directive({
	selector: 'a[luCardAction], button[luCardAction]',
	host: {
		class: 'card2-heading-action',
	},
})
export class CardActionDirective {}
