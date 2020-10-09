import { Component } from '@angular/core';

@Component({
	selector: 'lu-establishment-issue',
	templateUrl: './establishment.component.html'
})
export class EstablishmentComponent {
	collection = [];
	item;
	filters = ['limit=2'];
	trackBy(idx, item): string {
		return item.code;
	}
}
