import { Component } from '@angular/core';

@Component({
	selector: 'lu-establishment-issue',
	templateUrl: './establishment.component.html'
})
export class EstablishmentComponent {
	collection = [];
	item;
	trackBy(idx, item): string {
		return item.code;
	}

	display(collection) {
		return collection.map(item => ({ id: item.id, name: item.name }));
	}
}
