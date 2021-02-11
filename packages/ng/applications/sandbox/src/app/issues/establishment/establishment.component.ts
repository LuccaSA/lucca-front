import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ILuEstablishment } from '@lucca-front/ng/establishment';
import { ILuLegalUnit } from 'libraries/establishment/src';
import { Observable, zip } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';

interface ICountry {
	id: number;
	name: string;
}

@Component({
	selector: 'lu-establishment-issue',
	templateUrl: './establishment.component.html'
})
export class EstablishmentComponent implements OnInit {
	collection = [];
	item;
	item2;

	countriesByLegalUnitId$: Observable<Map<number, ICountry>>;

	constructor(private readonly httpClient: HttpClient) { }

	ngOnInit() {
		this.countriesByLegalUnitId$ = zip(
			this.httpClient.get<{ items: ICountry[] }>('/organization/structure/api/countries'),
			this.httpClient.get<{ items: ILuLegalUnit[] }>('/organization/structure/api/legal-units')
		).pipe(
			map(([countriesResponse, legalUnitsResponse]) => {
				const result = new Map<number, ICountry>();
				legalUnitsResponse.items.forEach(legalUnit => {
					result.set(legalUnit.id, countriesResponse.items.find(e => e.id === legalUnit.countryId))
				});
				return result;
			}),
			publishReplay(1),
			refCount()
		);
		this.countriesByLegalUnitId$.subscribe();
	}

	customDisplayer = (ets: ILuEstablishment): Observable<string> => {
		return this.countriesByLegalUnitId$.pipe(
			map(countriesByLegalUnitId => {
				const country = countriesByLegalUnitId.get(ets.legalUnitId);
				return country ?
					`${ets.name} (<i>${country.name}</i>)` :
					ets.name;
			})
		);
	}

	trackBy(idx, item): string {
		return item.code;
	}

	display(collection) {
		return collection.map(item => ({ id: item.id, name: item.name }));
	}
}
