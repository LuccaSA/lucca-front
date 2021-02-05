import { Component } from '@angular/core';
import { ILuEstablishment } from '@lucca-front/ng/establishment';

@Component({
	selector: 'lu-establishment-issue',
	templateUrl: './establishment.component.html'
})
export class EstablishmentComponent {
	collection = [];
	item;
	item2;

	customDisplayer = (ets: ILuEstablishment) => {
		return `${ets.name} (${ets.code})`
	}

	trackBy(idx, item): string {
		return item.code;
	}

	display(collection) {
		return collection.map(item => ({ id: item.id, name: item.name }));
	}
}
