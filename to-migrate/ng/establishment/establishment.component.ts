import { Component } from '@angular/core';
import { Observable } from 'rxjs';

interface ICountry {
	id: number;
	name: string;
}

@Component({
	selector: 'lu-establishment-issue',
	templateUrl: './establishment.component.html'
})
export class EstablishmentComponent {
	collection = [];
	item;
	item2;

	countriesByLegalUnitId$: Observable<Map<number, ICountry>>;

	trackBy(idx, item): string {
		return item.code;
	}

	display(collection) {
		return (collection ?? []).map(item => ({ id: item.id, name: item.name }));
	}
}
